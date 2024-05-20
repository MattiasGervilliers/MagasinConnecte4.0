import type { Station } from "~/models/weatherReport";
import { fetchStationList } from "~/composables/queries/fetchStationList";
import { fetchCommandNumber } from "~/composables/queries/fetchCommandNumber";
import { fetchWeatherData } from "~/composables/queries/fetchWeatherData";
import { findClosestStation } from "~/utils/distanceCalculator";

export const useFetchWeatherReport = () => {
  return useAsyncData(async () => {
    try {
      const stations: Station[] = await fetchStationList({ departmentId: 13 });
      const stationId = findClosestStation(stations ?? []).id;

      const commandNumber = await fetchCommandNumber({
        stationId,
        beginningDate: '2024-03-01T00:00:00Z',
        endDate: '2024-03-02T00:00:00Z'
      });

      const weatherData = await fetchWeatherData({commandId: commandNumber.value})

      return {
        value: weatherData
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  })
}