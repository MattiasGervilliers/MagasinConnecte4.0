import type { Benefit } from "~/models/solarPanel/benefit";

export const fetchBenefit = async (): Promise<Benefit> => {
  const config = useRuntimeConfig();
  const apiUrl = config.solarPanelApiUrl;
  const apiKey = config.solarPanelApiKey;
  const siteId = config.solarPanelSiteId;

  return await $fetch<Benefit>(
    `${apiUrl}/site/${siteId}/envBenefits?systemUnits=Metrics&api_key=${apiKey}`,
    {
      method: "GET",
    },
  );
}