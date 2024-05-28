import type {WeatherData, WeatherDataRaw, SolarPanelTheoreticalProduction} from "~/models/weatherReport";
import {parseWeatherData} from "~/models/parser";

export type SolarPanelInfo = {
    nominalPower: string;
    performanceRatio: string;
}

type UseFetchWeatherReport = {
    queryParams: {
        frequency: string;
        beginningDate: string;
        endDate: string;
    }
    apiKey: string;
    solarPanelInfo: SolarPanelInfo;
}
export const useFetchWeatherReport = async ({queryParams, apiKey, solarPanelInfo}: UseFetchWeatherReport) => {

    const weatherDataRaw = await $fetch<WeatherDataRaw>(`https://api.weatherbit.io/v2.0/history/${queryParams.frequency}?lat=43.3186&lon=5.4084&start_date=${queryParams.beginningDate}&end_date=${queryParams.endDate}&key=${apiKey}`, {
      method: 'GET',
      headers: {
        accept: "*/*",
      }
    });
    const weatherData: WeatherData[] = parseWeatherData(weatherDataRaw.data);

    const solarPanelTheoreticalProduction: SolarPanelTheoreticalProduction[] = weatherData.map((data) => {
        return {
            date: data.date,
            production: data.solarRadiation * parseFloat(solarPanelInfo.nominalPower) * parseFloat(solarPanelInfo.performanceRatio),
        };
    });
    return solarPanelTheoreticalProduction;
}
