import type { Station } from "~/models/weatherReport";
import { fetchStationList } from "~/composables/queries/fetchStationList";
import { fetchCommandNumber } from "~/composables/queries/fetchCommandNumber";
import { fetchWeatherData } from "~/composables/queries/fetchWeatherData";
import { findClosestStation } from "~/utils/distanceCalculator";
import { generateHeader } from "~/utils/generateHeader";

type FetchWeatherReportProps = {
  apiKey: string;
  queriesParams: {
    departmentId: number;
    beginningDate: string;
    endDate: string;
  };
};

export const fetchWeatherReport = async ({
  apiKey,
  queriesParams,
}: FetchWeatherReportProps) => {
  try {
    const stations: Station[] = await fetchStationList(
      {
        departmentId: queriesParams.departmentId,
      },
      generateHeader({ apiKey: apiKey }),
    );
    const stationId = findClosestStation(stations ?? []).id;

    const commandNumber = await fetchCommandNumber(
      {
        stationId,
        beginningDate: queriesParams.beginningDate,
        endDate: queriesParams.endDate,
      },
      generateHeader({ apiKey: apiKey }),
    );

    const weatherData = await fetchWeatherData(
      {
        commandId: commandNumber.value,
      },
      generateHeader({ apiKey: apiKey }),
    );

    return weatherData;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
