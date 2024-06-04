import { fetchOverview } from "~/composables/queries/solarPanel/fetchOverview";

export default defineEventHandler(async (event) => {
  return await fetchOverview();
});