export type WeatherDataRaw = {
  data: WeatherDataDto[];
};

export type WeatherDataDto = {
  datetime: string;
  t_solar_rad: number;
  solar_rad: number;
};

export type WeatherData = {
  date: string;
  solarRadiation: number;
};

export type SolarPanelTheoreticalProduction = {
  date: string;
  production: number;
}

export function parseWeatherData(weatherDataDto: WeatherDataDto[]): WeatherData[] {
  return weatherDataDto.map((data) => {
    return {
      date: data.datetime,
      solarRadiation: data.t_solar_rad ?? data.solar_rad,
    };
  });
}