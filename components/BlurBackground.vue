<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="blur-sm">
    <DefaultBackground :is-hide-title="true" />
  </div>
  <div class="blur-bg bg-white dark:bg-black p-8 rounded-lg shadow-lg max-w-md w-full">
    <h2 class="text-2xl font-bold mb-6 text-center">{{ props.title }}</h2>
    <slot />
  </div>
</template>

<style scoped>
.blur-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>