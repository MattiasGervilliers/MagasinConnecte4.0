<script setup lang="ts">
import type { TechnoInfos } from "~/pages/technologies.vue";

const { technoInfo } = defineProps<{
  technoInfo: TechnoInfos;
}>();
</script>

<template>
  <div class="description__container" :id="technoInfo.link">
    <PageHeader
      :title="technoInfo.title"
      :image="technoInfo.image ?? ''"
      :image-alt="technoInfo.title"
      is-small
    />

    <p>{{ technoInfo.shortDescription }}</p>

    <CardPresentation
      :card-infos="{
        title: 'Le fonctionnement',
        description: technoInfo.functioningDescription,
        publicImage: technoInfo.functioningImage,
      }"
    />

    <CardPresentation
      :card-infos="{
        title: 'Installation',
        description: technoInfo.installDescription,
        publicImage: technoInfo.installImage,
        isReversed: true,
      }"
    />
  </div>
</template>

<style>
.description__container {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
</style>
