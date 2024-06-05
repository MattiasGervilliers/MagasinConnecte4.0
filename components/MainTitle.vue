<script setup lang="ts">
const { text } = defineProps<{
  text: string;
}>();
</script>

<template>
  <h1 class="text-4xl text-primary font-bold">{{ text }}</h1>
</template>

<style scoped>
h1 {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>