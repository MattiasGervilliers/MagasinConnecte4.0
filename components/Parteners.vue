<script setup lang="ts">
const PARTENERS_IMAGES_LINK: string[] = [
  "parteners/ikea.svg.webp",
  "parteners/lucibel.webp",
  "parteners/murati.webp",
  "parteners/stid.webp",
  "parteners/auchan.webp",
  "parteners/connectwave.webp",
  "parteners/insiteo.webp",
  "parteners/dracula.webp",
  "parteners/lopcommerce.webp",
  "parteners/eurofins.webp",
] as const;
</script>

<template>
  <div class="parteners__container">
    <div class="parteners__description">
      <h2 class="text-xl font-bold text-primary-500 text-left md:text-right">
        Nos partenaires
      </h2>
      <h3 class="italic text-left md:text-right">
        lorem ipsum lorem ipsum lorem
      </h3>
      <UDivider size="sm" class="hidden md:flex" />
      <p class="text-left md:text-right">
        lorem ipsum lorem ipum lorem ipsumlorem ipsum lorem ipsum lorem ipsum
        lorem ipsumlorem ipsum
      </p>
    </div>

    <UDivider
      class="hidden md:flex"
      size="sm"
      orientation="vertical"
      icon="i-heroicons-chevron-right-16-solid"
    />

    <UDivider
      class="md:hidden"
      size="sm"
      orientation="horizontal"
      icon="i-heroicons-chevron-down-16-solid"
    />

    <div class="parteners__images">
      <div class="image" v-for="(image, index) in PARTENERS_IMAGES_LINK">
        <NuxtImg
          :key="index"
          :src="image"
          :alt="`logo ${image.split('.')[0]}`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("~/assets/css/parteners.css");
</style>
