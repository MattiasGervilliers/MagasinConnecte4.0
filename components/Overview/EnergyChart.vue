<template>
  <div class="chart-wrap mb-10">
    <ChartsLineChart :chart-data="data" :chart-options="options" />
  </div>
</template>

<script>

import tailwindConfig from "~/tailwind.config.ts";

export default {
  data() {
    return {
      data: {
        title: "Production de l'énergie",
        labels: this.energyData.values.map((v) => v.date),
        datasets: [
          {
            label: `Production de l'énergie par ${this.getStringByTimeUnit(this.energyData.timeUnit)} (${this.energyData.unit})`,
            backgroundColor: "#000000",
            borderColor: tailwindConfig.theme.extend.colors._primary[700],
            data: this.energyData.values.map((v) => v.value ?? 0),
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Production de l'énergie",
          },
        },
      },
    };
  },
  props: {
    energyData: {
      type: Object,
      required: true,
    }
  },
  methods: {
    getStringByTimeUnit(timeUnit) {
      switch (timeUnit) {
        case "QUARTER_OF_AN_HOUR":
          return "15 mn";
        case "HOUR":
          return "heure";
        case "DAY":
          return "jour";
        case "WEEK":
          return "semaine";
        case "MONTH":
          return "mois";
        case "YEAR":
          return "année";
        default:
          return "temps";
      }
    },
  },
};
</script>

<style scoped>
.chart-wrap {
  height: 75vh;
}
</style>