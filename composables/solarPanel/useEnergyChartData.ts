import type { SolarPanelTheoreticalProduction } from "~/models/weatherReport";
import moment from "moment/moment";
import type { Filters } from "~/models/chart/filters";

export function useEnergyChartData() {
  async function formatWeatherValue(filters: Filters) {
    let frequency, startDate, endDate;
    let solarPanelTheoreticalValue: SolarPanelTheoreticalProduction[];
    switch (filters.timeUnit) {
      case "QUARTER_OF_AN_HOUR":
        frequency = "hourly";
        startDate = moment(filters.startDate).add(1, "h").toDate();
        endDate = moment(filters.endDate).toDate();
        solarPanelTheoreticalValue = quarterHour(await callWeatherApi(startDate, endDate, frequency, 6.6, 1));
        break;
      case "HOUR":
        frequency = "hourly";
        startDate = filters.startDate;
        endDate = moment(filters.endDate).add(1, "h").toDate();
        solarPanelTheoreticalValue = await callWeatherApi(startDate, endDate, frequency, 6.6, 1);
        break;
      case "DAY":
        frequency = "daily";
        startDate = filters.startDate;
        endDate = moment(filters.endDate).add(1, "day").toDate();
        solarPanelTheoreticalValue = await callWeatherApi(startDate, endDate, frequency, 6.6, 1);
        break;
      case "WEEK":
        frequency = "daily";
        startDate = moment(filters.startDate).startOf("isoWeek").toDate();
        endDate = moment(filters.endDate).add(1, "week").startOf("isoWeek").toDate();
        solarPanelTheoreticalValue = groupByDate(7, await callWeatherApi(startDate, endDate, frequency, 6.6, 1));
        break;
      case "MONTH":
        frequency = "daily";
        startDate = moment(filters.startDate).startOf("month").toDate();
        endDate = moment(filters.endDate).add(1, "month").startOf("month").toDate();
        solarPanelTheoreticalValue = groupByDate(31, await callWeatherApi(startDate, endDate, frequency, 6.6, 1));
        break;
      case "YEAR":
        frequency = "daily";
        startDate = moment(filters.startDate).startOf("year").toDate();
        endDate = moment(filters.endDate).add(1, "year").startOf("year").toDate();
        solarPanelTheoreticalValue = groupByDate(365, await callWeatherApi(startDate, endDate, frequency, 6.6, 1));
        break;
      default:
        frequency = "hourly";
        startDate = filters.startDate;
        endDate = moment(filters.endDate).add(1, "h").toDate();
        solarPanelTheoreticalValue = await callWeatherApi(startDate, endDate, frequency, 6.6, 1);
        break;
    }
    return solarPanelTheoreticalValue;
  }


  //api only return per hour, so we divide by 4 to get the quarter-hour value
  function quarterHour(value: SolarPanelTheoreticalProduction[]): SolarPanelTheoreticalProduction[] {
    let quarterHourValue: SolarPanelTheoreticalProduction[] = [];
    for (let i = 0; i < value.length; i++) {
      quarterHourValue.push({ date: value[i].date, production: value[i].production / 4 });
    }
    return quarterHourValue;
  }

  async function callWeatherApi(startDate: Date, endDate: Date, frequency: string, nominalPower: number, performanceRatio: number): Promise<SolarPanelTheoreticalProduction[]> {
    return await $fetch<SolarPanelTheoreticalProduction[]>(`/api/weatherReport?beginningDate=${formatDateTimeWeather(startDate)}&endDate=${formatDateTimeWeather(endDate)}&frequency=${frequency}&nominalPower=${nominalPower}&performanceRatio=${performanceRatio}`, {
      method: "GET",
    });
  }


// api only return per day, so we group for weeks, months or years
  function groupByDate(numberDays: number, value: SolarPanelTheoreticalProduction[]): SolarPanelTheoreticalProduction[] {
    let averageValue: SolarPanelTheoreticalProduction[] = [];
    let counter = 0;
    let sum;
    let date;
    while (counter < value.length) {
      sum = 0;
      date = formatDateTime(moment(value[counter].date).toDate());
      if (counter + numberDays > value.length) {
        numberDays = value.length - counter;
      }
      for (let i = 0; i < numberDays; i++) {
        sum += value[counter].production;
        counter++;
      }
      averageValue.push({ date: date, production: sum });
    }
    return averageValue;
  }

  function formatDateTime(date: Date): string {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
  }

  function formatDateTimeWeather(date: Date): string {
    return moment(date).format("YYYY-MM-DD:HH");
  }

  return {
    formatDateTime,
    formatWeatherValue
  };
}