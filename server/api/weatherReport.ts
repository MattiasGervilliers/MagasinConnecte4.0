import { useFetchWeatherReport } from "~/composables/useFetchWeatherReport";

type Query = {
  departmentId: string;
  beginningDate: string;
  endDate: string;
};

export default defineEventHandler(async (event) => {
  const { departmentId, beginningDate, endDate} = getQuery<Query>(event);

  const config = useRuntimeConfig();

  const apiKey = config.apiKey;
  return await useFetchWeatherReport({queryParams: {departmentId, beginningDate, endDate}, apiKey});
});
