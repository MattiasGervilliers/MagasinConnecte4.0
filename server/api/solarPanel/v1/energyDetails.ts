import { fetchEnergyDetails } from "~/composables/queries/solarPanel/fetchEnergyDetails";

type Query = {
  timeUnit: string;
  startTime: string;
  endTime: string;
};

export default defineEventHandler(async (event) => {
  const { timeUnit, startTime, endTime } = getQuery<Query>(event);

  return await fetchEnergyDetails(timeUnit, startTime, endTime);
});