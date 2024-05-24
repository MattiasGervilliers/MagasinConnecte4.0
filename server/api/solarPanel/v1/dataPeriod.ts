import { fetchDataPeriod } from "~/composables/queries/solarPanel/fetchDataPeriod";

export default defineEventHandler(async (event) => {
  return {
    content: await fetchDataPeriod(),
  };
});