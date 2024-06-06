<script setup lang="ts">

</script>

<template>
  <GlobalWrapper>
    <div class="visualization">
      <div class="overview">
        <SolarPanelOverview/>
      </div>
      <div class="chart mt-5">
        <SolarPanelEnergyChart />
      </div>
    </div>
  </GlobalWrapper>
</template>

<style scoped>
.chart {
  padding: 24px;
}
</style>