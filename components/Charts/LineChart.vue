<script setup lang="ts">
import { Chart as ChartJS } from "chart.js";
import { Line } from "vue-chartjs";
import { defaultChartOptions, defaultRegister } from "~/components/Charts/defaultChart.js";

ChartJS.register(...defaultRegister);

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