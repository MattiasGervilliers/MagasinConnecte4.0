<script setup lang="ts">
import moment from "moment";
import type { Day } from "~/models/shop";

const { day, index, weekNumber } = defineProps<{
  day: Day;
  index: number;
  weekNumber: number;
}>();

const { currentHour, currentWeek, currentDayIndex } = useDate();

// check if the shop is currently open with the current time and the current day
const isCurrentlyOpen = () => {
  if (currentWeek !== weekNumber || currentDayIndex !== index) {
    return false;
  }

  return (
    moment(currentHour, "HH:mm").isBetween(
      moment(day.morningStart, "HH:mm"),
      moment(day.morningEnd, "HH:mm"),
      undefined,
      "[]",
    ) ||
    moment(currentHour, "HH:mm").isBetween(
      moment(day.afternoonStart, "HH:mm"),
      moment(day.afternoonEnd, "HH:mm"),
      undefined,
      "[]",
    )
  );
};
</script>

<template>
  <p>
    <span v-if="day.isOpen">
      {{ day.day }} {{ day.morningStart }} - {{ day.morningEnd }}
      <span v-if="day.withBreak">
        et {{ day.afternoonStart }} - {{ day.afternoonEnd }}</span
      >
    </span>

    <span v-else> {{ day.day }} <span class="text-red-500">fermé</span> </span>

    <span
      :class="isCurrentlyOpen() ? 'text-green-500' : 'text-red-500'"
      v-if="currentWeek === weekNumber && currentDayIndex === index"
    >
      {{ isCurrentlyOpen() ? " ouvert" : " fermé" }}</span
    >

    <span
      v-if="index === currentDayIndex && weekNumber === currentWeek"
      class="ping absolute top-0 left-0 flex h-3 w-3"
    >
      <span
        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
      ></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
    </span>
  </p>
</template>
