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

async function formatWeatherValue(): Promise<SolarPanelTheoreticalProduction[]> {
  let frequency;
  let startDate = new Date();
  let endDate = new Date();
  let solarPanelTheoreticalValue: SolarPanelTheoreticalProduction[] = [];
  switch (filters.value.timeUnit) {
    case "QUARTER_OF_AN_HOUR":
      frequency = "hourly";
      startDate = moment(filters.value.startDate).add(1, 'h').toDate();
      endDate = moment(filters.value.endDate).toDate();
      solarPanelTheoreticalValue = await $fetch<SolarPanelTheoreticalProduction[]>(`/api/weatherReport?beginningDate=${formatDateTimeWeather(startDate)}&endDate=${formatDateTimeWeather(endDate)}&frequency=${frequency}&nominalPower=${6.6}&performanceRatio=${1}`, {
        method: "GET",
      });
      solarPanelTheoreticalValue = quarterHour(solarPanelTheoreticalValue);
      break
    case "HOUR":
      frequency = "hourly";
      endDate = moment(filters.value.endDate).add(1, 'h').toDate();
      solarPanelTheoreticalValue = await $fetch<SolarPanelTheoreticalProduction[]>(`/api/weatherReport?beginningDate=${formatDateTimeWeather(filters.value.startDate)}&endDate=${formatDateTimeWeather(endDate)}&frequency=${frequency}&nominalPower=${6.6}&performanceRatio=${1}`, {
        method: "GET",
      });
      break
    case "DAY":
      frequency = "daily";
      endDate = moment(filters.value.endDate).add(1, 'day').toDate();
      solarPanelTheoreticalValue = await $fetch<SolarPanelTheoreticalProduction[]>(`/api/weatherReport?beginningDate=${formatDateTimeWeather(filters.value.startDate)}&endDate=${formatDateTimeWeather(endDate)}&frequency=${frequency}&nominalPower=${6.6}&performanceRatio=${1}`, {
        method: "GET",
      });
      break
    case "WEEK":
      frequency = "daily";
      startDate = moment(filters.value.startDate).startOf("isoWeek").toDate();
      endDate = moment(filters.value.endDate).add(1, 'week').startOf("isoWeek").toDate();
      solarPanelTheoreticalValue = await $fetch<SolarPanelTheoreticalProduction[]>(`/api/weatherReport?beginningDate=${formatDateTimeWeather(startDate)}&endDate=${formatDateTimeWeather(endDate)}&frequency=${frequency}&nominalPower=${6.6}&performanceRatio=${1}`, {
        method: "GET",
      });
      solarPanelTheoreticalValue = averageByDate(7, solarPanelTheoreticalValue);
      break
    case "MONTH":
      frequency = "daily";
      startDate = moment(filters.value.startDate).startOf("month").toDate();
      endDate = moment(filters.value.endDate).add(1, 'month').startOf("month").toDate();
      solarPanelTheoreticalValue = await $fetch<SolarPanelTheoreticalProduction[]>(`/api/weatherReport?beginningDate=${formatDateTimeWeather(startDate)}&endDate=${formatDateTimeWeather(endDate)}&frequency=${frequency}&nominalPower=${6.6}&performanceRatio=${1}`, {
        method: "GET",
      });
      solarPanelTheoreticalValue = averageByDate(31, solarPanelTheoreticalValue);
      break
    case "YEAR":
      frequency = "daily";
      startDate = moment(filters.value.startDate).startOf("year").toDate();
      endDate = moment(filters.value.endDate).add(1, 'year').startOf("year").toDate();
      solarPanelTheoreticalValue = await $fetch<SolarPanelTheoreticalProduction[]>(`/api/weatherReport?beginningDate=${formatDateTimeWeather(startDate)}&endDate=${formatDateTimeWeather(endDate)}&frequency=${frequency}&nominalPower=${6.6}&performanceRatio=${1}`, {
        method: "GET",
      });
      solarPanelTheoreticalValue = averageByDate(365, solarPanelTheoreticalValue);
      break
  }
  return solarPanelTheoreticalValue;
}

function quarterHour(value: SolarPanelTheoreticalProduction[]): SolarPanelTheoreticalProduction[] {
  let quarterHourValue: SolarPanelTheoreticalProduction[] = [];
  for (let i = 0; i < value.length; i++) {
    quarterHourValue.push({date: value[i].date, production: value[i].production/4});
  }
  return quarterHourValue;

}

function averageByDate(numberDays: number, value: SolarPanelTheoreticalProduction[]): SolarPanelTheoreticalProduction[] {
  let averageValue: SolarPanelTheoreticalProduction[] = [];
  let counter = 0;
  while (counter < value.length) {
    let sum = 0;
    let date = formatDateTime(moment(value[counter].date).toDate());
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