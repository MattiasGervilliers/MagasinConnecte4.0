<script setup lang="ts">
import { Chart as ChartJS } from "chart.js";
import { Line } from "vue-chartjs";
import { defaultChartOptions } from "~/components/charts/defaultChartOptions.js";
import { registerables } from "chart.js";

ChartJS.register(...registerables);

let { data, options } = defineProps({
  data: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
  },
});

options = {
  ...defaultChartOptions,
  ...options,
};

</script>

<template>
  <Line
    chart-id="test-chart"
    :data="data"
    :options="options"
    style="height: 100%; width: 100%"
  />
</template>