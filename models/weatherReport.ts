import {TArray} from "ts-interface-checker";

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