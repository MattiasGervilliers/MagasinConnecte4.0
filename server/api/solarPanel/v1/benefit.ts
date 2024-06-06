import { fetchBenefit } from "~/composables/queries/solarPanel/fetchBenefit";

export default defineEventHandler(async (event) => {
  return await fetchBenefit();
});