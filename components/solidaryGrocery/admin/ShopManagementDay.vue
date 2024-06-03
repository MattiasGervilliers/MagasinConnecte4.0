<script setup lang="ts">
import type { Day } from "~/models/shop";

// use props instead of descrupturing because we need to watch the week and day props inside the component
const props = defineProps<{
  dayName: string;
  day: Day;
}>();

// we descructure the props that are not watching inside the component
const { dayName } = props;

const toggleClose = (isOpen: boolean): void => {
  if (!isOpen) {
    props.day.morningStart = "";
    props.day.morningEnd = "";
    props.day.afternoonStart = "";
    props.day.afternoonEnd = "";
  }
};

const toggleBreak = (withBreak: boolean): void => {
  if (!withBreak) {
    props.day.afternoonStart = "";
    props.day.afternoonEnd = "";
  }
};
</script>

<template>
  <label>{{ dayName }}</label>
  <UInput
    type="time"
    v-model="props.day.morningStart"
    :disabled="!props.day.isOpen"
  />
  <UInput
    type="time"
    v-model="props.day.morningEnd"
    :disabled="!props.day.isOpen"
  />

  <span v-if="props.day.withBreak">et</span>

  <UInput
    v-if="props.day.withBreak"
    type="time"
    v-model="props.day.afternoonStart"
    :disabled="!props.day.isOpen"
  />
  <UInput
    v-if="props.day.withBreak"
    type="time"
    v-model="props.day.afternoonEnd"
    :disabled="!props.day.isOpen"
  />

  <label>Pause déjeuner</label>
  <UToggle v-model="props.day.withBreak" @change="toggleBreak" />

  <label>Ouvert</label>
  <UToggle v-model="props.day.isOpen" @change="toggleClose" />
</template>
