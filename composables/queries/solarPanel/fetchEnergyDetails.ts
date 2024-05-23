import type { EnergyDetails } from "~/models/solarPanel/energyDetails";

export const fetchEnergyDetails = async (
  timeUnit: string,
  startTime: string,
  endTime: string,
): Promise<EnergyDetails> => {
  const config = useRuntimeConfig();
  const apiUrl = config.solarPanelApiUrl;
  const apiKey = config.solarPanelApiKey;
  const siteId = config.solarPanelSiteId;

  const response = await fetch(
    `${apiUrl}/site/${siteId}/energyDetails?meters=PRODUCTION,CONSUMPTION&timeUnit=${timeUnit}&startTime=${startTime}&endTime=${endTime}&api_key=${apiKey}`,
    {
      method: "GET",
      headers: {},
    },
  );

  const data: { energyDetails: EnergyDetails } = await response.json();

  return data.energyDetails;
}