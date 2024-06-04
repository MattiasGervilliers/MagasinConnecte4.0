<script setup lang="ts">
import colors from 'tailwindcss/colors';
import tailwindConfig from '~/tailwind.config';
import type {EnergyDetails, EnergyDetailsData, EnergyDetailsMeter} from "~/models/solarPanel/energyDetails";
import {ref, watch} from "vue";
import type {SolarPanelTheoreticalProduction} from "~/models/weatherReport";

const props = defineProps<{
  energyDetails: EnergyDetails;
  theoreticalProduction: SolarPanelTheoreticalProduction[];
}>();
const energyDetails = ref(props.energyDetails);
const theoreticalProduction = ref(props.theoreticalProduction);

const chartKey = ref(0);

function updateChart() {
  const productionData = energyDetails.value.meters.find((meter: EnergyDetailsMeter) => meter.type === "Production")?.values.map((v: EnergyDetailsData) => ({ x: v.date, y: v.value ?? 0 })) || [];
  const consumptionData = energyDetails.value.meters.find((meter: EnergyDetailsMeter) => meter.type === "Consumption")?.values.map((v: EnergyDetailsData) => ({ x: v.date, y: v.value ?? 0 })) || [];
  const differenceData = productionData.map((v, i) => ({ x: v.x, y: (v.y ?? 0) - (consumptionData[i]?.y ?? 0) }));
  const theoreticalData = theoreticalProduction.value.map((v: SolarPanelTheoreticalProduction) => ({ x: v.date, y: v.production }));
  data.datasets[0].data = productionData;
  data.datasets[1].data = theoreticalData;
  data.datasets[2].data = consumptionData;
  data.datasets[3].data = differenceData;
  chartKey.value++;
}

const data = {
  title: "Production de l'énergie",
  datasets: [
    {
      label: `Production de l'énergie par ${getStringByTimeUnit(energyDetails.value.timeUnit)} (${energyDetails.value.unit})`,
      backgroundColor: colors.black,
      borderColor: tailwindConfig?.theme?.extend?.colors?._primary[700],
      data: energyDetails.value.meters.find(meter => meter.type === "Production")?.values.map(v => {
        return { x: v.date, y: v.value ?? 0 };
      }),
    },
    {
      label: `Production théorique de l'énergie par ${getStringByTimeUnit(energyDetails.value.timeUnit)} (${energyDetails.value.unit})`,
      backgroundColor: colors.black,
      borderColor: tailwindConfig?.theme?.extend?.colors?._primary[200],
      data: theoreticalProduction.value.map((v: SolarPanelTheoreticalProduction) => ({ x: v.date, y: v.production }))
    },
    {
      label: `Consommation de l'énergie par ${getStringByTimeUnit(energyDetails.value.timeUnit)} (${energyDetails.value.unit})`,
      backgroundColor: colors.black,
      borderColor: tailwindConfig?.theme?.extend?.colors?._secondary[700],
      data: energyDetails.value.meters.find(meter => meter.type === "Consumption")?.values.map(v => {
        return { x: v.date, y: v.value ?? 0 };
      }),
    }, // Create a dataset for production minus consumption
    {
      label: `Différence entre la production et la consommation de l'énergie par ${getStringByTimeUnit(energyDetails.value.timeUnit)} (${energyDetails.value.unit})`,
      backgroundColor: colors.black,
      borderColor: tailwindConfig?.theme?.extend?.colors?._secondary[200],
      data: energyDetails.value.meters.find(meter => meter.type === "Production")?.values.map((v, i) => {
        return { x: v.date, y: (v.value ?? 0) - (energyDetails.value.meters.find(meter => meter.type === "Consumption")?.values[i].value ?? 0) };
      }),
      hidden: true,
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

function getStringByTimeUnit(timeUnit: string) {
  switch (timeUnit) {
    case "QUARTER_OF_AN_HOUR":
      return "15 min";
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

watch(props, () => {
  energyDetails.value = props.energyDetails;
  theoreticalProduction.value = props.theoreticalProduction;
  updateChart();
}, { deep: true });

</script>

<template>
  <div class="chart-wrap mb-10">
    <ChartsLineChart :data="data" :options="options" :key="chartKey" />
  </div>
</template>

<style scoped>
.chart-wrap {
  height: 75vh;
}
</style>