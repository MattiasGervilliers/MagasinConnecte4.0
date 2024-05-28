import {TArray} from "ts-interface-checker";

export type WeatherDataRaw = {
  data: WeatherDataDto[];
};

export type WeatherDataDto = {
  datetime: string;
  t_solar_rad: number;
};

export type WeatherData = {
  date: string;
  solar_radiation: number;
};