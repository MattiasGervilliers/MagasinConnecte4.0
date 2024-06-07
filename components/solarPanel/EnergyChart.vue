<script setup lang="ts">

import type { EnergyDetails, EnergyDetailsData, EnergyDetailsMeter } from "~/models/solarPanel/energyDetails";
import type { Filters } from "~/models/chart/filters";
import type { SolarPanelTheoreticalProduction } from "~/models/weatherReport";
import moment from "moment";
import colors from "tailwindcss/colors";
import tailwindConfig from "~/tailwind.config";
const isMobile = navigator?.maxTouchPoints > 0;
const filters = ref<Filters>({
  // use moment to get the current date minus 7 days
  startDate: isMobile ? moment().subtract(1, 'days').toDate() : moment().subtract(7, "days").toDate(),
  // today date
  endDate: new Date(),
  timeUnit: "HOUR",
});

const { formatDateTime, formatWeatherValue } = useEnergyChartData();
const toast = useToast();

let energyDetails: EnergyDetails = {
  timeUnit: "HOUR",
  unit: "kWh",
  meters: [],
};

const theoreticalProduction = ref<SolarPanelTheoreticalProduction[]>([{
  date: "0000-00-00 00:00:00",
  production: 0,
}]);

async function getData() {
  let energyDetailsResponse: EnergyDetails = {
    timeUnit: "HOUR",
    unit: "kWh",
    meters: [],
  };
  let theoreticalProductionResponse: SolarPanelTheoreticalProduction[] = [{
    date: "0000-00-00 00:00:00",
    production: 0,
  }];

  try {
    const results = await Promise.allSettled([
      $fetch<EnergyDetails>(`/api/solarPanel/v1/energyDetails?timeUnit=${filters.value.timeUnit}&startTime=${formatDateTime(filters.value.startDate)}&endTime=${formatDateTime(filters.value.endDate)}`, {
        method: "GET",
      }),
      formatWeatherValue(filters.value),
    ]);

    if (results[0].status === "fulfilled") {
      energyDetailsResponse = results[0].value as EnergyDetails;
    } else {
      console.error("Failed to fetch energy details:", results[0].reason);
      toast.add({
        title: "Une erreur est survenue lors de la récupération des détails énergétiques",
        icon: "i-heroicons-exclamation-circle",
        color: "red",
      });
    }

    if (results[1].status === "fulfilled") {
      theoreticalProductionResponse = results[1].value as SolarPanelTheoreticalProduction[];
    } else {
      console.error("Failed to fetch theoretical production:", results[1].reason);
      toast.add({
        title: "Une erreur est survenue lors de la récupération de la production théorique",
        icon: "i-heroicons-exclamation-circle",
        color: "red",
      });
    }
  } catch (error) {
    toast.add({
      title: "Une erreur générale est survenue lors de la récupération des données",
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
  }

  energyDetails = energyDetailsResponse;
  theoreticalProduction.value = theoreticalProductionResponse;
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
  const productionData = energyDetails.meters.find((meter: EnergyDetailsMeter) => meter.type === "Production")?.values.map((v: EnergyDetailsData) => ({
    x: v.date,
    y: v.value ?? 0,
  })) || [];
  const consumptionData = energyDetails.meters.find((meter: EnergyDetailsMeter) => meter.type === "Consumption")?.values.map((v: EnergyDetailsData) => ({
    x: v.date,
    y: v.value ?? 0,
  })) || [];
  const differenceData = productionData.map((v, i) => ({ x: v.x, y: (v.y ?? 0) - (consumptionData[i]?.y ?? 0) }));
  const theoreticalData = theoreticalProduction.value.map((v: SolarPanelTheoreticalProduction) => ({
    x: v.date,
    y: v.production,
  }));

  chartContext.value.datasets[0].data = productionData;
  chartContext.value.datasets[1].data = theoreticalData;
  chartContext.value.datasets[2].data = consumptionData;
  chartContext.value.datasets[3].data = differenceData;
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
      label: `Production théorique de l'énergie par ${getStringByTimeUnit(energyDetails.timeUnit)} (${energyDetails.unit})`,
      backgroundColor: colors.black,
      borderColor: tailwindConfig?.theme?.extend?.colors?._primary[200],
      data: theoreticalProduction.value.map((v: SolarPanelTheoreticalProduction) => ({ x: v.date, y: v.production })),
    },
    {
      label: `Consommation de l'énergie par ${getStringByTimeUnit(energyDetails.timeUnit)} (${energyDetails.unit})`,
      backgroundColor: colors.black,
      borderColor: tailwindConfig?.theme?.extend?.colors?._tertiary[700],
      data: energyDetails.meters.find(meter => meter.type === "Consumption")?.values.map(v => {
        return { x: v.date, y: v.value ?? 0 };
      }),
    }, // Create a dataset for production minus consumption
    {
      label: `Différence entre la production et la consommation de l'énergie par ${getStringByTimeUnit(energyDetails.timeUnit)} (${energyDetails.unit})`,
      backgroundColor: colors.black,
      borderColor: tailwindConfig?.theme?.extend?.colors?._tertiary[200],
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
    <SolarPanelChartView :chart-context="chartContext" title="Production de l'énergie" />
    <div class="filters-wrap">
      <SolarPanelChartFilters :filters="filters" />
    </div>

    <div class="refresh-wrap">
      <UTooltip text="Rafraîchit les données">
        <UButton @click="getData" variant="link" size="xl"><UIcon name="i-heroicons-arrow-path" /></UButton>
      </UTooltip>
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
  right: 75px;
  z-index: 9;
}

@media screen and (max-width: 768px) {
  .filters-wrap {
    top: -50px;
    right: 0;
  }
}

.refresh-wrap {
  position: absolute;
  top: 0;
  right: 25px;
  z-index: 9;

  button {
    padding: 12px;
    font-size: 1.2em;
  }
}

@media screen and (max-width: 768px) {
  .refresh-wrap {
    top: -50px;
    right: 50px;
  }
}

</style>