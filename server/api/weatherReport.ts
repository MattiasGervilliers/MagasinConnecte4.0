import { useMultipleFetch } from "~/composables/useMultipleFetch";

type Query = {
  departmentId: string;
  beginningDate: string;
  endDate: string;
};

export default defineEventHandler(async (event) => {
  const { departmentId, beginningDate, endDate } = getQuery<Query>(event);

  const config = useRuntimeConfig();

  const apiKey = config.apiKey;
  console.log('apiKey', apiKey);
  return await useMultipleFetch(apiKey);
});
