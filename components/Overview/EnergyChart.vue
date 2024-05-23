<script setup>

import tailwindConfig from "~/tailwind.config";

const { energyData } = defineProps({
  energyData: {
    type: Object,
    required: true,
  },
}); // TODO utiliser le bon objet

const data = {
  title: "Production de l'énergie",
  labels: energyData.values.map(v => v.date), // TODO utiliser le bon objet
  datasets: [
    {
      label: `Production de l'énergie par ${getStringByTimeUnit(energyData.timeUnit)} (${energyData.unit})`,
      backgroundColor: "#000000",
      borderColor: tailwindConfig.theme.extend.colors._primary[700],
      data: energyData.values.map(v => v.value ?? 0),
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: true,
      text: "Production de l'énergie",
    },
  },
};

function getStringByTimeUnit(timeUnit) {
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
}
</script>

<template>
  <div class="chart-wrap mb-10">
    <ChartsLineChart :data="data" :options="options" />
  </div>
</template>

<style scoped>
.chart-wrap {
  height: 75vh;
}
</style>