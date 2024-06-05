<script setup lang="ts">
import { definePageMeta } from "#imports";

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
  <h1>test</h1>
  <UBreadcrumb :links="links">
    <template #divider>
      <span class="w-8 h-1 rounded-full bg-neutral-700 dark:bg-neutral-300" />
    </template>
  </UBreadcrumb>

  <SolarPanelEnergyChart />

</template>

<style scoped>
h1 {
  margin-top: 70px;
}
</style>