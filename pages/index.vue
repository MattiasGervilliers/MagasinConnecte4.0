<script setup lang="ts">
</script>

<template>
  <NuxtImg class="background" src="background.jpg" />

  <Card />
  <Card is-reversed />

</template>

<style>
.background {
  width: 100%;
  height: calc(100vh - 70px);
  object-fit: cover;
}
</style>