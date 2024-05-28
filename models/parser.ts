import type { WeatherData, WeatherDataDto} from "~/models/weatherReport";


export function parseWeatherData(weatherDataDto: WeatherDataDto[]): WeatherData[] {
  return weatherDataDto.map((data) => {
    return {
      date: data.datetime,
      solarRadiation: data.t_solar_rad ?? data.solar_rad,
    };
  });
}