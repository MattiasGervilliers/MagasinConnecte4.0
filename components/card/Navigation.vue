<script setup lang="ts">
export type CardNavigationInfos = {
  title: string;
  description: string;
  path: string;
  iconUrl: string;
};

const { cardNavigationInfos } = defineProps<{
  cardNavigationInfos: CardNavigationInfos;
}>();

const isHovered = ref(false);

const handleMouseEnter = () => {
  isHovered.value = true;
};

const handleMouseLeave = () => {
  isHovered.value = false;
};

const handleClick = async () => {
  await navigateTo(cardNavigationInfos.path);
};
</script>

<template>
  <div
    class="card-navigation"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <UIcon
      v-if="!isHovered"
      :name="cardNavigationInfos.iconUrl"
      class="text-3xl animate__animated animate__fadeInDown animate__faster"
    />
    <h3
      v-if="!isHovered"
      class="font-bold text-lg animate__animated animate__fadeInDown animate__faster"
    >
      {{ cardNavigationInfos.title }}
    </h3>
    <p
      v-if="isHovered"
      class="text-center text-sm animate__animated animate__fadeInUp animate__faster"
    >
      {{ cardNavigationInfos.description }}
    </p>
  </div>
</template>

<style>
@import url("~/assets/css/card/navigation.css");
</style>
