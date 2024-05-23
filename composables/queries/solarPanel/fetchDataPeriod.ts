import type { DataPeriod } from "~/models/solarPanel/dataPeriod";
import { parseDataPeriod } from "~/models/solarPanel/dataPeriod";

export const fetchDataPeriod = async (): Promise<DataPeriod> => {
  const config = useRuntimeConfig();
  const apiUrl = config.solarPanelApiUrl;
  const apiKey = config.solarPanelApiKey;
  const siteId = config.solarPanelSiteId;

  const response = await fetch(
    `${apiUrl}/site/${siteId}/dataPeriod?api_key=${apiKey}`,
    {
      method: "GET",
      headers: {},
    },
  );

  const data = await response.json();

  return parseDataPeriod(data);
}