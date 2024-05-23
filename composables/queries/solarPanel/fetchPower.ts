import type { Power } from '~/models/solarPanel/power';

export const fetchPower = async (
  startTime: string,
  endTime: string,
): Promise<Power> => {
  const config = useRuntimeConfig();
  const apiUrl = config.solarPanelApiUrl;
  const apiKey = config.solarPanelApiKey;
  const siteId = config.solarPanelSiteId;

  const response = await fetch(
    `${apiUrl}/site/${siteId}/power?startTime=${startTime}&endTime=${endTime}&api_key=${apiKey}`,
    {
      method: 'GET',
      headers: {},
    },
  );

  const data: {power: Power} = await response.json();

  return data.power;
}