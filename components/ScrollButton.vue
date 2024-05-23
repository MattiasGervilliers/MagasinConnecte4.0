<script setup lang="ts">
const { hash } = defineProps<{
  hash: string;
}>();
</script>

<template>
  <div class="scroll-button">
    <UButton
      class="animate-bounce hover:animate-none rounded-full"
      :to="{ hash: hash }"
      icon="i-heroicons-arrow-down-16-solid"
      size="xl"
    ></UButton>
  </div>
</template>

<style>
@import url("~/assets/css/scrollButton.css");
</style>
