<script setup lang="ts">

import type { EnergyDetails } from "~/models/solarPanel/energyDetails";
import type { Filters } from "~/models/chart/filters";
import type { SolarPanelTheoreticalProduction } from "~/models/weatherReport";
import moment from "moment";

const filters = ref<Filters>({
  // use moment to get the current date minus 7 days
  startDate: moment().subtract(7, 'days').toDate(),
  // today date
  endDate: new Date(),
  timeUnit: "HOUR",
});

const energyDetails = ref<EnergyDetails>({
  timeUnit: "HOUR",
  unit: "kWh",
  meters: [],
});

const theoreticalProduction = ref<SolarPanelTheoreticalProduction[]>([{
  date: '0000-00-00 00:00:00',
  production: 0,
}]);

function formatDateTime(date: Date): string {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function formatDateTimeWeather(date: Date): string {
  return moment(date).format("YYYY-MM-DD:HH");
}

const callWeatherApi = async (startDate: Date, endDate: Date, frequency: string, nominalPower:number, performanceRatio: number): Promise<SolarPanelTheoreticalProduction[]> => {
  return await $fetch<SolarPanelTheoreticalProduction[]>(`/api/weatherReport?beginningDate=${formatDateTimeWeather(startDate)}&endDate=${formatDateTimeWeather(endDate)}&frequency=${frequency}&nominalPower=${nominalPower}&performanceRatio=${performanceRatio}`, {
    method: "GET",
  });
}

const formatWeatherValue= async() => {
  let frequency, startDate, endDate;
  let solarPanelTheoreticalValue: SolarPanelTheoreticalProduction[];
  switch (filters.value.timeUnit) {
    case "QUARTER_OF_AN_HOUR":
      frequency = "hourly";
      startDate = moment(filters.value.startDate).add(1, 'h').toDate();
      endDate = moment(filters.value.endDate).toDate();
      solarPanelTheoreticalValue = quarterHour(await callWeatherApi(startDate, endDate, frequency, 6.6, 1));
      break
    case "HOUR":
      frequency = "hourly";
      startDate = filters.value.startDate;
      endDate = moment(filters.value.endDate).add(1, 'h').toDate();
      solarPanelTheoreticalValue = await callWeatherApi(startDate, endDate, frequency, 6.6, 1);
      break
    case "DAY":
      frequency = "daily";
      startDate = filters.value.startDate;
      endDate = moment(filters.value.endDate).add(1, 'day').toDate();
      solarPanelTheoreticalValue = await callWeatherApi(startDate, endDate, frequency, 6.6, 1);
      break
    case "WEEK":
      frequency = "daily";
      startDate = moment(filters.value.startDate).startOf("isoWeek").toDate();
      endDate = moment(filters.value.endDate).add(1, 'week').startOf("isoWeek").toDate();
      solarPanelTheoreticalValue = groupByDate(7, await callWeatherApi(startDate, endDate, frequency, 6.6, 1));
      break
    case "MONTH":
      frequency = "daily";
      startDate = moment(filters.value.startDate).startOf("month").toDate();
      endDate = moment(filters.value.endDate).add(1, 'month').startOf("month").toDate();
      solarPanelTheoreticalValue = groupByDate(31, await callWeatherApi(startDate, endDate, frequency, 6.6, 1));
      break
    case "YEAR":
      frequency = "daily";
      startDate = moment(filters.value.startDate).startOf("year").toDate();
      endDate = moment(filters.value.endDate).add(1, 'year').startOf("year").toDate();
      solarPanelTheoreticalValue = groupByDate(365, await callWeatherApi(startDate, endDate, frequency, 6.6, 1));
      break
    default:
      frequency = "hourly";
      startDate = filters.value.startDate;
      endDate = moment(filters.value.endDate).add(1, 'h').toDate();
      solarPanelTheoreticalValue = await callWeatherApi(startDate, endDate, frequency, 6.6, 1);
      break
  }
  return solarPanelTheoreticalValue;
}

//api only return per hour, so we divide by 4 to get the quarter-hour value
const quarterHour = (value: SolarPanelTheoreticalProduction[]): SolarPanelTheoreticalProduction[] => {
  let quarterHourValue: SolarPanelTheoreticalProduction[] = [];
  for (let i = 0; i < value.length; i++) {
    quarterHourValue.push({date: value[i].date, production: value[i].production/4});
  }
  return quarterHourValue;

}

// api only return per day, so we group for weeks, months or years
const groupByDate = (numberDays: number, value: SolarPanelTheoreticalProduction[]): SolarPanelTheoreticalProduction[] => {
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
    averageValue.push({date: date, production: sum});
  }
  return averageValue;
}

async function getData() {
  energyDetails.value = await $fetch<EnergyDetails>(`/api/solarPanel/v1/energyDetails?timeUnit=${filters.value.timeUnit}&startTime=${formatDateTime(filters.value.startDate)}&endTime=${formatDateTime(filters.value.endDate)}`, {
    method: "GET",
  });
  theoreticalProduction.value = await formatWeatherValue();
}

await getData();

watch(filters, () => {
  getData();
}, { deep: true });

</script>

<template>
  <SolarPanelChartView :energy-details="energyDetails" :theoretical-production="theoreticalProduction" />
  <SolarPanelChartFilters :filters="filters" />
</template>

<style scoped>

</style>