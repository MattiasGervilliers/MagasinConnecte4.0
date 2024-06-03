<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  chartContext: object;
}>();
const chartContext = ref(props.chartContext);

const chartKey = ref(0);

const options = {
  plugins: {
    title: {
      display: true,
      text: "Production de l'énergie",
    },
  },
  /*scales: {
    x: {
      type: "time",
      time: {
        unit: "hour",
        parser: "YYYY-MM-DD HH:mm:ss",
      },
    },
  },*/
};

watch(props, () => {
  chartContext.value = props.chartContext;
  chartKey.value++;
}, { deep: true });

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