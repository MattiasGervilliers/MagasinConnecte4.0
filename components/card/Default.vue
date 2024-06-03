<script setup lang="ts">
export type CardInfos = {
  title: string;
  subTitle: string;
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
      v-if="!cardInfos.isReversed"
      class="card-image"
      :src="cardInfos.publicImage ?? ''"
    />

    <div class="card-description">
      <h2 class="text-xl font-bold text-primary-500">{{ cardInfos.title }}</h2>

      <h3 class="italic">
        {{ cardInfos.subTitle }}
      </h3>

      <UDivider size="sm" />

      <p>
        {{ cardInfos.description }}
      </p>
    </div>

    <NuxtImg
      v-if="cardInfos.isReversed"
      class="card-image"
      :src="cardInfos.publicImage ?? ''"
    />
  </div>
</template>

<style>
@import url("~/assets/css/card/default.css");
</style>
