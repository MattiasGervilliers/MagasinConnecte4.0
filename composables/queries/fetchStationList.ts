import type { Station, StationDto } from "~/models/weatherReport";
import { parseStation } from "~/models/parser";
import { $fetch } from "ofetch";

// TODO: manage headers
export const fetchStationList = async (params: {
  departmentId: number
}): Promise<Station[]> => {
  const { departmentId } = params;

  const stationsDto: StationDto[] = await $fetch(`https://public-api.meteofrance.fr/public/DPClim/v1/liste-stations/quotidienne?id-departement=${departmentId}`, {
    method: 'GET',
  });

  return stationsDto.map(parseStation);
};
