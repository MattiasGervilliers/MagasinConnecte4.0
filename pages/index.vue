<script setup lang="ts">
const departmentId = 13;
const begginingDate = "2021-10-01";
const endDate = "2021-10-31";

const { data } = await useFetch(
  `api/weatherReport?departmentId=${departmentId}&begginingDate=${begginingDate}&endDate=${endDate}`,
);
</script>

<template>
  <div>
    <h1>Magasin connecté 4d.0</h1>
    <Weather />
  </div>
</template>
