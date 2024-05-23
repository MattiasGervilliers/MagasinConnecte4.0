import { fetchEnergy } from "~/composables/queries/solarPanel/fetchEnergy";

type Query = {
  timeUnit: string;
  startDate: string;
  endDate: string;
};

export default defineEventHandler(async (event) => {
  const { timeUnit, startDate, endDate } = getQuery<Query>(event);

  return {
    content: await fetchEnergy(timeUnit, startDate, endDate),
  };
});