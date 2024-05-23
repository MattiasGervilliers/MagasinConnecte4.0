import type { Energy } from "~/models/solarPanel/energy";

export const fetchEnergy = async (
  timeUnit: string,
  startDate: string,
  endDate: string,
): Promise<Energy> => {
  const config = useRuntimeConfig();
  const apiUrl = config.solarPanelApiUrl;
  const apiKey = config.solarPanelApiKey;
  const siteId = config.solarPanelSiteId;

  const response = await fetch(
    `${apiUrl}/site/${siteId}/energy?timeUnit=${timeUnit}&startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`,
    {
      method: "GET",
      headers: {},
    },
  );

  const data: { energy: Energy } = await response.json();

  return data.energy;
}