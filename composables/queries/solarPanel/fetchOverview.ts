import type { Overview } from '~/models/solarPanel/overview';
import { parseOverview } from "~/models/solarPanel/overview";

export const fetchOverview = async (): Promise<Overview> => {

  const config = useRuntimeConfig();
  const apiUrl = config.solarPanelApiUrl;
  const apiKey = config.solarPanelApiKey;
  const siteId = config.solarPanelSiteId;

  const response = await fetch(
    `${apiUrl}/site/${siteId}/overview?api_key=${apiKey}`,
    {
      method: 'GET',
      headers: {},
    },
  );

  const data = await response.json();

  return parseOverview(data);
}