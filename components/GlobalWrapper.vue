<script setup lang="ts">
const { withFullscreen } = defineProps<{ withFullscreen?: boolean }>();
</script>

<template>
  <div
    :class="{
      'global-wrapper': true,
      fullscreen: withFullscreen,
    }"
  >
    <slot></slot>
  </div>
</template>

<style>
@import url("~/assets/css/globalWrapper.css");
</style>
