<script setup lang="ts">
import MainTitle from "~/components/MainTitle.vue";
import type { Overview } from "~/models/solarPanel/overview";

const overviewData: Overview = await $fetch<Overview>('/api/solarPanel/v1/overview')
</script>

<template>
  <MainTitle text="Vue Générale"/>
  <div class="overview-container">
    <p class="overview-container-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <CardValueWUnit title="Courant acutel" :value='overviewData.currentPower' unit="Watt"/>
  </div>

  <div class="overview-container-details">
    <CardValueWUnit title="Energie produite au total" :value="overviewData.lifeTimeDataEnergy" unit="Wh"/>
    <CardValueWUnit title="Energie produite l'année dernière" :value="overviewData.lastYearDataEnergy" unit="Wh"/>
    <CardValueWUnit title="Energie produite le mois dernier" :value="overviewData.lastMonthDataEnergy" unit="Wh"/>
    <CardValueWUnit title="Energie produite hier" :value="overviewData.lastDayDataEnergy" unit="Wh"/>
  </div>
</template>

<style scoped>
  .overview-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    text-align: center;
    width: 60%;
    margin: 0 auto;
  }

  .overview-container-details {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    flex-wrap: wrap;
  }

  .overview-container-text {
    display: flex;
    flex: 1;
  }
</style>