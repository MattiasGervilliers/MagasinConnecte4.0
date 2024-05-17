<script setup>
import {getWeatherReportData} from "~/service/weatherReport/getWeatherReportData";

function onButtonClick() {
  getWeatherReportData(13, '2024-03-01T00:00:00Z', '2024-03-02T00:00:00Z')
}

</script>

<template>
  <button @click="onButtonClick">get Station data</button>
</template>