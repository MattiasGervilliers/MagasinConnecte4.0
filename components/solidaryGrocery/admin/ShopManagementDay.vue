<script setup lang="ts">
import type { Day, Shop } from "~/models/shop";

// use props instead of descrupturing because we need to watch the week and day props inside the component
const props = defineProps<{
  day: string;
  shop: Shop;
  index: number;
  week: number;
}>();

// we descructure the props that are not watching inside the component
const { index, day } = props;

const selectedWeek = ref<Day[]>(
  props.shop.currentWeekNumber === props.week
    ? props.shop.currentWeek
    : props.shop.nextWeek,
);

watch(
  () => [props.week, props.shop],
  () => {
    selectedWeek.value =
      props.shop.currentWeekNumber === props.week
        ? props.shop.currentWeek
        : props.shop.nextWeek;
  },
);

const toggleClose = (isOpen: boolean): void => {
  if (!isOpen) {
    selectedWeek.value[index].morningStart = "";
    selectedWeek.value[index].morningEnd = "";
    selectedWeek.value[index].afternoonStart = "";
    selectedWeek.value[index].afternoonEnd = "";
  }
};

const toggleBreak = (withBreak: boolean): void => {
  if (!withBreak) {
    selectedWeek.value[index].afternoonStart = "";
    selectedWeek.value[index].afternoonEnd = "";
  }
};
</script>

<template>
  <label>{{ day }}</label>
  <UInput
    type="time"
    v-model="selectedWeek[index].morningStart"
    :disabled="!selectedWeek[index].isOpen"
  />
  <UInput
    type="time"
    v-model="selectedWeek[index].morningEnd"
    :disabled="!selectedWeek[index].isOpen"
  />

  <span v-if="selectedWeek[index].withBreak">et</span>

  <UInput
    v-if="selectedWeek[index].withBreak"
    type="time"
    v-model="selectedWeek[index].afternoonStart"
    :disabled="!selectedWeek[index].isOpen"
  />
  <UInput
    v-if="selectedWeek[index].withBreak"
    type="time"
    v-model="selectedWeek[index].afternoonEnd"
    :disabled="!selectedWeek[index].isOpen"
  />

  <label>Pause déjeuner</label>
  <UToggle v-model="selectedWeek[index].withBreak" @change="toggleBreak" />

  <label>Ouvert</label>
  <UToggle v-model="selectedWeek[index].isOpen" @change="toggleClose" />
</template>
