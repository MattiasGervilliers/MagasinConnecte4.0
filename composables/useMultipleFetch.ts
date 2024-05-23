import type { CommandNumberDto, StationDto, Station, CommandNumber } from "~/models/weatherReport";
import { parseCommandNumber, parseStation } from "~/models/parser";
import { findClosestStation } from "~/utils/distanceCalculator";

/*
export const useMultipleFetch = (apiKey: string) => {
  return useAsyncData(async () => {
    const stationsDto = await $fetch<StationDto[]>('https://public-api.meteofrance.fr/public/DPClim/v1/liste-stations/quotidienne?id-departement=13', {
      method: 'GET',
      headers: {
        accept: "*!/!*",
        apikey: apiKey,
      }
    });

    const stations: Station[] = stationsDto.map(parseStation)
    const stationId = findClosestStation(stations).id

    const commandNumberDto = await $fetch<CommandNumberDto>(`https://public-api.meteofrance.fr/public/DPClim/v1/commande-station/quotidienne?id-station=${stationId}&date-deb-periode=2024-03-04T00%3A00%3A00Z&date-fin-periode=2024-03-04T23%3A59%3A59Z`, {
      method: 'GET',
      headers: {
        accept: "*!/!*",
        apikey: apiKey,
      }
    });

    const commandNumber: CommandNumber = parseCommandNumber(commandNumberDto);

    const commandId = commandNumber.value;

    //wait 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const weatherReport = await $fetch(`https://public-api.meteofrance.fr/public/DPClim/v1/commande/fichier?id-cmde=${commandId}`, {
      method: 'GET',
      headers: {
        accept: "*!/!*",
        apikey: apiKey,
      }
    });

    console.log('data3', weatherReport);

    return {
      weatherReport,
    }
  }, {
    server: false,
  })
}*/

export const useMultipleFetch = async (apiKey: string) => {

    const stationsDto = await $fetch<StationDto[]>('https://public-api.meteofrance.fr/public/DPClim/v1/liste-stations/quotidienne?id-departement=13', {
      method: 'GET',
      headers: {
        accept: "*/*",
        apikey: apiKey,
      }
    });

    const stations: Station[] = stationsDto.map(parseStation)
    const stationId = findClosestStation(stations).id

    console.log('stationId', stationId)

    const commandNumberDto = await $fetch<CommandNumberDto>(`https://public-api.meteofrance.fr/public/DPClim/v1/commande-station/quotidienne?id-station=${stationId}&date-deb-periode=2024-03-04T00%3A00%3A00Z&date-fin-periode=2024-03-04T23%3A59%3A59Z`, {
      method: 'GET',
      headers: {
        accept: "*/*",
        apikey: apiKey,
      }
    });

    const commandNumber: CommandNumber = parseCommandNumber(commandNumberDto);

    const commandId = commandNumber.value;
    console.log('commandId', commandId)

    //wait 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const weatherReport = await fetch(`https://public-api.meteofrance.fr/public/DPClim/v1/commande/fichier?id-cmde=${commandId}`, {
      method: 'GET',
      headers: {
        accept: "*/*",
        apikey: apiKey,
      }
    });

    const data3 = await weatherReport.text();

    return {
      'weatherReport': data3,
    }
}
