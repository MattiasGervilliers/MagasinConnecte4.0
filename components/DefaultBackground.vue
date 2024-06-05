<script setup lang="ts">
const props = defineProps<{
  isHideTitle?: boolean;
}>();
</script>

<template>
  <div class="background">
    <h1 v-if="!isHideTitle" class="text-white text-4xl font-bold text-center">
      Bienvenue dans le <br />
      magasin connecté 4.0
    </h1>
  </div>
</template>

<style>
@import url("~/assets/css/defaultBackground.css");
</style>
