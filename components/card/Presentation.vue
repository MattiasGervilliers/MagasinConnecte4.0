<script setup lang="ts">
export type CardInfos = {
  title: string;
  subTitle?: string;
  description: string;
  publicImage?: string;
  isReversed?: boolean;
};

const { cardInfos } = defineProps<{
  cardInfos: CardInfos;
}>();
</script>

<template>
  <div class="card">
    <NuxtImg
      v-if="!cardInfos.isReversed && cardInfos.publicImage"
      class="card-image"
      :src="cardInfos.publicImage ?? ''"
    />

    <div
      :class="
        cardInfos.publicImage
          ? 'card-description'
          : 'card-description-fullwidth'
      "
    >
      <h2 class="text-xl font-bold text-primary-500">{{ cardInfos.title }}</h2>

      <h3 class="italic">
        {{ cardInfos.subTitle ?? "" }}
      </h3>

      <UDivider size="sm" />

      <p>
        {{ cardInfos.description }}
      </p>
    </div>

    <NuxtImg
      v-if="cardInfos.isReversed && cardInfos.publicImage"
      class="card-image"
      :src="cardInfos.publicImage ?? ''"
    />
  </div>
</template>

<style>
@import url("~/assets/css/card/presentation.css");
</style>
