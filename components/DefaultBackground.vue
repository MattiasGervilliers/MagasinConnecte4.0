<script setup lang="ts">
const props = defineProps<{
  hideTitle?: boolean;
}>();
</script>

<template>
  <div class="background">
    <h1 v-if="!hideTitle" class="text-white text-4xl font-bold text-center">
      Bienvenue dans le <br />
      magasin connectée 4.0
    </h1>
  </div>
</template>

<style>
@import url("~/assets/css/defaultBackground.css");
</style>
