<script setup lang="ts">

import "chartjs-adapter-moment";
import { ref, watch } from "vue";

const props = defineProps<{
  chartContext: object;
  title: string
}>();
const chartContext = ref(props.chartContext);

const chartKey = ref(0);

const options = {
  plugins: {
    title: {
      display: true,
      text: props.title,
      font: {
        size: 20,
        weight: "bold",
      },
      color: '#000'
    },
  },
  scales: {
    x: {
      type: "time",
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        major: {
          enabled: true,
        },
        font: (context: { tick: { major: any; }; }) => {
          if (context.tick && context.tick.major) {
            return {
              weight: "bold",
            };
          }
        },
      },
    },
  },
};

watch(() => props, () => {
  chartContext.value = props.chartContext;
  chartKey.value++;
  isDarkMode = document.documentElement.classList.contains("dark");
}, { deep: true });

onMounted(() => {
  window.addEventListener("resize", () => {
    chartKey.value++;
  });

  options.plugins.title.color = document.documentElement.classList.contains("dark") ? "#FFF" : "#000";
});
</script>

<template>
  <div class="chart-wrap mb-10">
    <ChartsLineChart :data="chartContext" :options="options" :key="chartKey" />
  </div>
</template>

<style scoped>
.chart-wrap {
  height: 75vh;
}
</style>