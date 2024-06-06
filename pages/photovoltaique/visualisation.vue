<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  auth: false,
});
</script>

<template>
  <GlobalWrapper>
    <div class="overview">
      <SolarPanelOverview />
    </div>
  </GlobalWrapper>
  <div class="greenwashing-wrapper">
    <SolarPanelGreenwashing />
  </div>
  <GlobalWrapper>
    <div class="chart mt-5">
      <SolarPanelEnergyChart />
    </div>
  </GlobalWrapper>
</template>

<style scoped>
.chart {
  padding: 24px;
}
</style>