import type { CommandNumberDto, StationDto, Station, CommandNumber } from "~/models/weatherReport";
import {parseCommandNumber, parseStation, parseWeatherData} from "~/models/parser";
import { findClosestStation } from "~/utils/distanceCalculator";

type UseFetchWeatherReport = {
    queryParams: {
        departmentId: string;
        beginningDate: string;
        endDate: string;
    }
    apiKey: string;
}

export const useFetchWeatherReport = async ({queryParams, apiKey}: UseFetchWeatherReport) => {

    const stationsDto = await $fetch<StationDto[]>(`https://public-api.meteofrance.fr/public/DPClim/v1/liste-stations/quotidienne?id-departement=${queryParams.departmentId}`, {
      method: 'GET',
      headers: {
        accept: "*/*",
        apikey: apiKey,
      }
    });

    const stations: Station[] = stationsDto.map(parseStation)
    const stationId = findClosestStation(stations).id


    const commandNumberDto = await $fetch<CommandNumberDto>(`https://public-api.meteofrance.fr/public/DPClim/v1/commande-station/quotidienne?id-station=${stationId}&date-deb-periode=${queryParams.beginningDate}&date-fin-periode=${queryParams.endDate}`, {
      method: 'GET',
      headers: {
        accept: "*/*",
        apikey: apiKey,
      }
    });

    const commandNumber: CommandNumber = parseCommandNumber(commandNumberDto);

    const commandId = commandNumber.value;

    for (let i = 0; i < 3; i++) {
        const weatherReport = await fetch(`https://public-api.meteofrance.fr/public/DPClim/v1/commande/fichier?id-cmde=${commandId}`, {
            method: 'GET',
            headers: {
                accept: "*/*",
                apikey: apiKey,
            }
        });
        if (weatherReport.status !== 204) {
            const data3 = parseWeatherData(await weatherReport.text());

            return {
                'weatherReport': data3,
            }
        }
        console.log('retrying in 1 second')
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
