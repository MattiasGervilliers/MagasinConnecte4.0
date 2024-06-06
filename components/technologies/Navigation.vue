<script setup lang="ts">
import type { TechnoInfos } from "~/pages/technologies.vue";

const { technoInfos } = defineProps<{ technoInfos: TechnoInfos[] }>();
const route = useRoute();

const hash = ref("#lifi");

watch(
  () => route.hash,
  () => {
    hash.value = route.hash;
  },
);
</script>

<template>
  <ul class="navigation bg-white dark:bg-black">
    <li
      v-for="technoInfo in technoInfos"
      :key="technoInfo.title"
      :class="hash === `#${technoInfo.link}` ? 'is-selected ' : 'not-selected'"
    >
      <UTooltip :text="technoInfo.title">
        <UButton
          :to="`#${technoInfo.link}`"
          variant="link"
          :icon="technoInfo.icon"
          color="white"
        />
      </UTooltip>
    </li>
  </ul>
</template>

<style>
.navigation {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  box-shadow: 0px 0px 15px -7px #000000;
  border-radius: 50px;
  padding: 10px 20px;
  gap: 10px;
}

.navigation li {
  padding: 5px;
  transition: 0.3s ease-in-out;
  border-radius: 25px;
  box-shadow: 0px 0px 15px -7px #000000;
}

.is-selected {
  background-color: theme("colors.primary.500");
}
</style>
