import { useFetchWeatherReport } from "~/composables/useFetchWeatherReport";

type Query = {
  frequency: string;
  beginningDate: string;
  endDate: string;
  nominalPower: string;
  performanceRatio: string;
};

export default defineEventHandler(async (event) => {
  const { frequency, beginningDate, endDate, nominalPower, performanceRatio} = getQuery<Query>(event);
  const config = useRuntimeConfig();

  const apiKey = config.apiKey;
  return await useFetchWeatherReport({queryParams: {frequency, beginningDate, endDate}, apiKey, solarPanelInfo: {nominalPower, performanceRatio}});
});
