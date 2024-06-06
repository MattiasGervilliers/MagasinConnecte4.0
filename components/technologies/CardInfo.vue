<script setup lang="ts">
import type { TechnoInfos } from "~/pages/technologies.vue";

const { technoInfos } = defineProps<{
  technoInfos: TechnoInfos;
}>();
</script>

<template>
  <div class="cardTechno">
    <div>
      <NuxtImg class="cardImageTechno" :src="technoInfos.image ?? ''" />

      <div class="cardTextTechno">
        <h3 class="text-xl font-bold text-primary-500">
          {{ technoInfos.title }}
        </h3>
        <p>
          {{ technoInfos.shortDescription }}
        </p>
      </div>
    </div>

    <UButton
      class="cardButtonTechno"
      variant="link"
      :to="`#${technoInfos.link}`"
      >Voir plus</UButton
    >
  </div>
</template>

<style>
@import url("~/assets/css/technologies/cardInfo.css");
</style>
