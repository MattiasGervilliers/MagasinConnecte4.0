import { fetchWeatherReport } from "~/composables";

type Query = {
  departmentId: string;
  beginningDate: string;
  endDate: string;
};

export default defineEventHandler((event) => {
  const { departmentId, beginningDate, endDate } = getQuery<Query>(event);

  const config = useRuntimeConfig();

  const apiKey = config.apiKey;

  const weatherReport = fetchWeatherReport({
    apiKey: apiKey,
    queriesParams: {
      departmentId: ~~departmentId,
      beginningDate: beginningDate,
      endDate: endDate,
    },
  });

  return {
    hello: weatherReport,
  };
});
