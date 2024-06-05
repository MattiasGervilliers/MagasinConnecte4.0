<script setup lang="ts">
import type { Item } from "~/pages/epicerie-solidaire.vue";

const { item } = defineProps<{ item: Item }>();
</script>

<template>
  <div class="shop__images">
    <NuxtImg class="shop__image" :src="item.images[0]" />
    <NuxtImg class="shop__image" :src="item.images[1] ?? ''"  />
  </div>
</template>

<style>
@import url("~/assets/css/solidaryGrocery/shopImages.css");
</style>
