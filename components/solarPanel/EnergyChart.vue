<script setup lang="ts">

import type { EnergyDetails } from "~/models/solarPanel/energyDetails";
import type { Filters } from "~/models/chart/filters";
import moment from "moment";

const filters = ref<Filters>({
  // today at 00:00
  //use moment to get the current date minus 7 days
  startDate: moment().subtract(7, 'days').toDate(),
  // today at 23:59
  endDate: new Date(),
  timeUnit: "HOUR",
});

let energyDetails = ref<EnergyDetails>({
  timeUnit: "HOUR",
  unit: "kWh",
  meters: [],
});

function formatDateTime(date: Date): string {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

async function getData() {
  energyDetails.value = await $fetch<EnergyDetails>(`/api/solarPanel/v1/energyDetails?timeUnit=${filters.value.timeUnit}&startTime=${formatDateTime(filters.value.startDate)}&endTime=${formatDateTime(filters.value.endDate)}`, {
    method: "GET",
  });
}

await getData();

watch(filters, () => {
  getData();
}, { deep: true });

</script>

<template>
  <SolarPanelChartView :energy-details="energyDetails" />
  <SolarPanelChartFilters :filters="filters" />
</template>

<style scoped>

</style>