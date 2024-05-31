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

let theoreticalProduction = ref<SolarPanelTheoreticalProduction[]>([{
  date: '0000-00-00 00:00:00',
  production: 0,
}]);

function formatDateTime(date: Date): string {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function formatDateTimeWeather(date: Date): string {
  return moment(date).format("YYYY-MM-DD:HH");
}

function formatWeatherValue(){
  let frequency;
  let endDate;
  console.log("filters", filters.value.timeUnit)
  switch (filters.value.timeUnit) {
    case "QUARTER_OF_AN_HOUR":
      frequency = "hourly";
      //endDate = moment(filters.value.endDate).add(3, 'h');
      break
    case "HOUR":
      frequency = "hourly";
      //endDate = moment(filters.value.endDate).add(3, 'h');
      break
    case "DAY":
      frequency = "daily";
      //endDate = moment(formatDateTimeWeather(filters.value.endDate)).add(1, 'day');
      break
    case "WEEK":
      frequency = "daily";
      //endDate = moment(filters.value.endDate).add(3, 'h');
      break
    case "MONTH":
      frequency = "daily";
      //endDate = moment(filters.value.endDate).add(3, 'h');
      break
    case "YEAR":
      frequency = "daily";
      //endDate = moment(filters.value.endDate).add(3, 'h');
      break
    default:
      frequency = "daily";
      //endDate = moment(filters.value.endDate).add(3, 'h');
      break
  }
  console.log("formatWeatherValue", filters.value.endDate, endDate)
  console.log("formatted", formatDateTimeWeather(filters.value.endDate))
  return {frequency: frequency, endDate: formatDateTimeWeather(filters.value.endDate)};
}

async function getData() {
  console.log("getData", filters.value);
  console.log("getData", formatDateTimeWeather(filters.value.startDate));
  energyDetails.value = await $fetch<EnergyDetails>(`/api/solarPanel/v1/energyDetails?timeUnit=${filters.value.timeUnit}&startTime=${formatDateTime(filters.value.startDate)}&endTime=${formatDateTime(filters.value.endDate)}`, {
    method: "GET",
  });
  const {frequency, endDate} = formatWeatherValue();
  theoreticalProduction.value = await $fetch<SolarPanelTheoreticalProduction[]>(`/api/weatherReport?beginningDate=${formatDateTimeWeather(filters.value.startDate)}&endDate=${endDate}&frequency=${frequency}&nominalPower=${15.66}&performanceRatio=${0.6}`, {
    method: "GET",
  });
  console.log("theoreticalProduction", theoreticalProduction.value);
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