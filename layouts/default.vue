<script setup lang="ts">
import "animate.css";

const { checkIfPWAIsUsed } = usePWA();

onMounted(() => {
  if (checkIfPWAIsUsed()) {
    navigateTo("/photovoltaique/visualisation");
  }
});
</script>

<template>
  <Navbar />
  <slot />
  <Footer />
</template>

<style>
@import url("~/assets/css/global.css");
</style>
