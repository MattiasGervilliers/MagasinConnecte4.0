import { fetchOverview } from "~/composables/queries/solarPanel/fetchOverview";

export default defineEventHandler(async (event) => {
  return {
    content: await fetchOverview(),
  };
});