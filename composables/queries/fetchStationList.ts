import type { Station, StationDto } from "~/models/weatherReport";
import { parseStation } from "~/models/parser";
import { $fetch } from "ofetch";

export const fetchStationList = async (
  params: {
    departmentId: number;
  },
  headers?: HeadersInit,
): Promise<Station[]> => {
  const { departmentId } = params;

  const response = await fetch(
    `https://public-api.meteofrance.fr/public/DPClim/v1/liste-stations/quotidienne?id-departement=${departmentId}`,
    {
      method: "GET",
      headers: headers ?? {},
    },
  );

  const stationsDto: StationDto[] = await response.json();
  return stationsDto.map(parseStation);
};
