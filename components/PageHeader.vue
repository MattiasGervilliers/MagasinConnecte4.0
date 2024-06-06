<script setup lang="ts">
const props = defineProps<{
  image: string;
  imageAlt: string;
  title: string;
  isSmall?: boolean;
}>();
</script>

<template>
  <header :class="isSmall ? 'relative small-height' : 'relative height'">
    <NuxtImg :src="props.image" :alt="props.imageAlt" />
    <h1 class="text-white font-black text-5xl">{{ title }}</h1>
  </header>
</template>

<style scoped>
.height {
  height: 500px;
}

.small-height {
  height: 200px;
}

header {
  border-radius: 25px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}
</style>
