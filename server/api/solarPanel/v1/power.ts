import { fetchPower } from "~/composables/queries/solarPanel/fetchPower";

type Query = {
  timeUnit: string;
  startTime: string;
  endTime: string;
};

export default defineEventHandler(async (event) => {
  const { startTime, endTime } = getQuery<Query>(event);

  return {
    content: await fetchPower(startTime, endTime),
  };
});