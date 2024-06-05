<script setup lang="ts">
const props = defineProps<{
  title?: string;
  value: number;
  unit: string;
}>();
</script>

<template>
<div class="card-value-w-unit rounded-3xl">
  <p v-if="title" class="text-white">{{ title }}</p>
  <p class="font-bold text-white text-4xl">{{ value }}</p>
  <p class="font-bold text-gray-500 text-2xl">{{ unit }}</p>
</div>
</template>

<style scoped>
.card-value-w-unit {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: theme('colors.primary.800');
  width: 250px;
  height: 250px;
  padding: 10px;
}
</style>