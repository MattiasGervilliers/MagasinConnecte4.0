import type { CommandNumber, CommandNumberDto } from "~/models/weatherReport";
import { parseCommandNumber } from "~/models/parser";

export const fetchCommandNumber = async (
  params: {
    stationId: string;
    beginningDate: string;
    endDate: string;
  },
  headers?: HeadersInit,
): Promise<CommandNumber> => {
  const { stationId, beginningDate, endDate } = params;

  const response = await fetch(
    `https://public-api.meteofrance.fr/public/DPClim/v1/commande-station/quotidienne?id-station=${stationId}&date-deb-periode=${beginningDate}&date-fin-periode=${endDate}`,
    {
      method: "GET",
      headers: headers ?? {},
    },
  );

  const data = await response.json();

  return parseCommandNumber(data);
};
