<template>
  <Line
    chart-id="test-chart"
    :data="data"
    :options="options"
    style="height: 100%"
  />
</template>

<script>
import { Line } from "vue-chartjs";
import { defaultChartOptions, defaultRegister } from "~/components/Charts/defaultChart.js";
import { Chart as ChartJS } from "chart.js";

ChartJS.register(...defaultRegister);

export default {
  components: {
    Line,
  },
  data() {
    return {
      data: this.chartData,
    };
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
    },
  },
  computed: {
    options() {
      return {
        ...defaultChartOptions,
        ...this.chartOptions
      };
    },
  },
};
</script>