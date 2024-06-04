<script setup lang="ts">

import type { EnergyDetails, EnergyDetailsData, EnergyDetailsMeter } from "~/models/solarPanel/energyDetails";
import type { Filters } from "~/models/chart/filters";
import moment from "moment";
import colors from "tailwindcss/colors";
import tailwindConfig from "~/tailwind.config";

const filters = ref<Filters>({
  // use moment to get the current date minus 7 days
  startDate: moment().subtract(7, "days").toDate(),
  // today date
  endDate: new Date(),
  timeUnit: "HOUR",
});

let energyDetails: EnergyDetails = {
  timeUnit: "HOUR",
  unit: "kWh",
  meters: [],
};

function formatDateTime(date: Date): string {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

async function getData() {
  energyDetails = await $fetch<EnergyDetails>(`/api/solarPanel/v1/energyDetails?timeUnit=${filters.value.timeUnit}&startTime=${formatDateTime(filters.value.startDate)}&endTime=${formatDateTime(filters.value.endDate)}`, {
    method: "GET",
  });
}

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

function updateChartContext() {
  const productionData = energyDetails.meters.find((meter: EnergyDetailsMeter) => meter.type === "Production")?.values.map((v: EnergyDetailsData) => ({ x: v.date, y: v.value ?? 0 })) || [];
  const consumptionData = energyDetails.meters.find((meter: EnergyDetailsMeter) => meter.type === "Consumption")?.values.map((v: EnergyDetailsData) => ({ x: v.date, y: v.value ?? 0 })) || [];
  const differenceData = productionData.map((v, i) => ({ x: v.x, y: (v.y ?? 0) - (consumptionData[i]?.y ?? 0) }));

  chartContext.value.datasets[0].data = productionData;
  chartContext.value.datasets[1].data = consumptionData;
  chartContext.value.datasets[2].data = differenceData;
}

await getData();

const chartContext = ref({
  title: "Production de l'énergie",
  datasets: [
    {
      label: `Production de l'énergie par ${getStringByTimeUnit(energyDetails.timeUnit)} (${energyDetails.unit})`,
      backgroundColor: colors.black,
      borderColor: tailwindConfig?.theme?.extend?.colors?._primary[700],
      data: energyDetails.meters.find(meter => meter.type === "Production")?.values.map(v => {
        return { x: v.date, y: v.value ?? 0 };
      }),
    },
    {
      label: `Consommation de l'énergie par ${getStringByTimeUnit(energyDetails.timeUnit)} (${energyDetails.unit})`,
      backgroundColor: colors.black,
      borderColor: tailwindConfig?.theme?.extend?.colors?._secondary[700],
      data: energyDetails.meters.find(meter => meter.type === "Consumption")?.values.map(v => {
        return { x: v.date, y: v.value ?? 0 };
      }),
    }, // Create a dataset for production minus consumption
    {
      label: `Différence entre la production et la consommation de l'énergie par ${getStringByTimeUnit(energyDetails.timeUnit)} (${energyDetails.unit})`,
      backgroundColor: colors.black,
      borderColor: tailwindConfig?.theme?.extend?.colors?._secondary[200],
      data: energyDetails.meters.find(meter => meter.type === "Production")?.values.map((v, i) => {
        return {
          x: v.date,
          y: (v.value ?? 0) - (energyDetails.meters.find(meter => meter.type === "Consumption")?.values[i].value ?? 0),
        };
      }),
      hidden: true,
    },
  ],
});

watch(filters, () => {
  getData().then(() => {
    updateChartContext();
  });
}, { deep: true });

</script>

<template>
  <div class="energy-chart">
    <SolarPanelChartView :chart-context="chartContext" />
    <div class="filters-wrap">
      <SolarPanelChartFilters :filters="filters" />
    </div>
  </div>
</template>

<style scoped>
.energy-chart {
  position: relative;
}

.filters-wrap {
  position: absolute;
  top: 0;
  right: 25px;
  z-index: 11;
}
</style>