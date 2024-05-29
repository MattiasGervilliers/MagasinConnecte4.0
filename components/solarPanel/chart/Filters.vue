<script setup lang="ts">

import type { Filters } from "~/models/chart/filters";
import moment from "moment";

const { filters } = defineProps<{
  filters: Filters;
}>();


let startDateISO = computed({
  get: () => moment(filters.startDate).format("YYYY-MM-DDTHH:mm:ss"),
  set: (value) => {
    filters.startDate = new Date(value);
  },
});

let endDateISO = computed({
  get: () => moment(filters.endDate).format("YYYY-MM-DDTHH:mm:ss"),
  set: (value) => {
    filters.endDate = new Date(value);
  },
});
</script>

<template>
  <select v-model="filters.timeUnit">
    <option value="QUARTER_OF_AN_HOUR">15 min</option>
    <option value="HOUR">heure</option>
    <option value="DAY">jour</option>
    <option value="WEEK">semaine</option>
    <option value="MONTH">mois</option>
    <option value="YEAR">année</option>
  </select>

  <input type="datetime-local" v-model="startDateISO">
  <input type="datetime-local" v-model="endDateISO">
</template>

<style scoped>

</style>