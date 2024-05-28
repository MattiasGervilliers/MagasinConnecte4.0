import type {WeatherData, WeatherDataDto, WeatherDataRaw} from "~/models/weatherReport";
import {parseWeatherData} from "~/models/parser";

type UseFetchWeatherReport = {
    queryParams: {
        frequency: string;
        beginningDate: string;
        endDate: string;
    }
    apiKey: string;
}

export const useFetchWeatherReport = async ({queryParams, apiKey}: UseFetchWeatherReport) => {

    const weatherDataRaw = await $fetch<WeatherDataRaw>(`https://api.weatherbit.io/v2.0/history/${queryParams.frequency}?lat=43.3186&lon=5.4084&start_date=${queryParams.beginningDate}&end_date=${queryParams.endDate}&key=${apiKey}`, {
      method: 'GET',
      headers: {
        accept: "*/*",
      }
    });
    console.log("weatherDataRaw", weatherDataRaw)
    const weatherData: WeatherData[] = parseWeatherData(weatherDataRaw.data);
    console.log("weatherData", weatherData)
    return weatherData;
}
