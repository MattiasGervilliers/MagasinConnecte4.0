import type { CommandNumber, CommandNumberDto } from "~/models/weatherReport";
import { parseCommandNumber } from "~/models/parser";

// TODO: manage headers
export const fetchCommandNumber = async (params: {
  stationId: string,
  beginningDate: string,
  endDate: string
}): Promise<CommandNumber> => {
  const { stationId, beginningDate, endDate } = params;

  const commandNumberDto: CommandNumberDto = await $fetch(`https://public-api.meteofrance.fr/public/DPClim/v1/commande-station/quotidienne?id-station=${stationId}&date-deb-periode=${beginningDate}&date-fin-periode=${endDate}`, {
    method: 'GET',
  });

  return parseCommandNumber(commandNumberDto);
};