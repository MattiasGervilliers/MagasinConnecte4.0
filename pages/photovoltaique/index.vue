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
  },
];
</script>

<template>
  <h1>Photovoltaïque</h1>
  <UBreadcrumb :links="links">
    <template #divider>
      <span class="w-8 h-1 rounded-full bg-neutral-700 dark:bg-neutral-300" />
    </template>
  </UBreadcrumb>

  <NuxtLink to="/photovoltaique/visualisation">Visualisation</NuxtLink>
</template>

<style scoped>
h1 {
  margin-top: 70px;
}
</style>