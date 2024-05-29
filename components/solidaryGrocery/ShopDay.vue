<script setup lang="ts">
import moment from "moment";
import type { Day } from "~/models/shop";

const { day, index } = defineProps<{ day: Day; index: number }>();

const currentDay: number = new Date().getDay();
const currentHour: string = moment(new Date()).format("HH:mm");

const isCurrentlyOpen =
  (day.morningStart! <= currentHour && day.morningEnd! >= currentHour) ||
  (day.afternoonStart! <= currentHour && day.afternoonEnd! >= currentHour);
</script>

<template>
  <p>
    <span v-if="day.isOpen">
      {{ day.day }} {{ day.morningStart }} - {{ day.morningEnd }}
      et
      {{ day.afternoonStart }} - {{ day.afternoonEnd }}
    </span>

    <span v-else> {{ day.day }} <span class="text-red-500">fermé</span> </span>

    <span
      :class="isCurrentlyOpen ? 'text-green-500' : 'text-red-500'"
      v-if="currentDay - 1 === index"
      >{{ isCurrentlyOpen ? "ouvert" : "fermé" }}</span
    >

    <span
      v-if="currentDay - 1 === index"
      class="ping absolute top-0 left-0 flex h-3 w-3"
    >
      <span
        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
      ></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
    </span>
  </p>
</template>
