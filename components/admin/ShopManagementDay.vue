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
  <label class="font-bold">{{ dayName }}</label>
  <div class="form-container">
    <div class="flex gap-4">
      <UInput
        class="w-fit"
        type="time"
        v-model="props.day.morningStart"
        :disabled="!props.day.isOpen"
      />
      <UInput
        class="w-fit"
        type="time"
        v-model="props.day.morningEnd"
        :disabled="!props.day.isOpen"
      />

      <span v-if="props.day.withBreak">et</span>

      <UInput
        class="w-fit"
        v-if="props.day.withBreak"
        type="time"
        v-model="props.day.afternoonStart"
        :disabled="!props.day.isOpen"
      />
      <UInput
        class="w-fit"
        v-if="props.day.withBreak"
        type="time"
        v-model="props.day.afternoonEnd"
        :disabled="!props.day.isOpen"
      />
    </div>

    <div class="flex gap-3">
      <div class="flex flex-col">
        <label>Pause déjeuner</label>
        <UToggle v-model="props.day.withBreak" @change="toggleBreak" />
      </div>

      <div class="flex flex-col">
        <label>Ouvert</label>
        <UToggle v-model="props.day.isOpen" @change="toggleClose" />
      </div>
    </div>
  </div>

  <UDivider
    orientation="horizontal"
    class="mt-2"
    icon="i-heroicons-calendar-days"
  />
</template>

<style>
.form-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
