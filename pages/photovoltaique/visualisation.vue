<script setup lang="ts">
import { definePageMeta } from "#imports";
import Overview from "~/components/solarPanel/Overview.vue";

definePageMeta({
  auth: false
});

const links = [
  {
    label: "Magasin Connecté 4.0",
    to: "/",
  },
  {
    label: "Photovoltaïque",
    to: "/photovoltaique",
  },
  {
    label: "Visualisation",
  },
];
</script>

<template>
  <div class="visualization">
    <div class="overview">
      <Overview/>
    </div>
    <div class="chart mt-5">
      <SolarPanelEnergyChart />
    </div>
  </div>
</template>

<style scoped>
  .visualization {
    margin-top: 70px;
    padding: 0 10%;
  }
</style>