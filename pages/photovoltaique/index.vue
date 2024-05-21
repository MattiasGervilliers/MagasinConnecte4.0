<script setup lang="ts">
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
</template>
