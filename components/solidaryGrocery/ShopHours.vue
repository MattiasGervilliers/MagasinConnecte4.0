<script setup lang="ts">
import moment from "moment";
import type { Item } from "~/pages/epicerie-solidaire.vue";

const { item } = defineProps<{ item: Item; week: number }>();

const currentDay: number = new Date().getDay();
const currentHour: string = moment(new Date()).format("HH:mm");
const isOpen = item.currentWeek.some((week) => {
  return (
    (week.morningStart <= currentHour && week.morningEnd >= currentHour) ||
    (week.afternoonStart <= currentHour && week.afternoonEnd >= currentHour)
  );
});

console.log("isOpen", isOpen);
</script>

<template>
  <div class="shop__hours">
    <p class="font-bold">
      <Icon name="i-heroicons-clock-16-solid" /> Horaires :
    </p>

    <ul
      class="pl-10 animate__animated animate__fadeIn"
      v-if="item.currentWeekNumber === week"
    >
      <li
        v-for="(week, index) in item.currentWeek"
        :class="{ 'flex gap-2 font-bold relative': currentDay - 1 === index }"
      >
        {{ week.day }} {{ week.morningStart }} - {{ week.morningEnd }}
        et
        {{ week.afternoonStart }} - {{ week.afternoonEnd }}
        <span
          :class="!isOpen ? 'text-red-500' : 'text-green-500'"
          v-if="currentDay - 1 === index"
          >{{ isOpen ? "ouvert" : "fermé" }}</span
        >
        <span
          v-if="currentDay - 1 === index"
          class="ping absolute top-0 left-0 flex h-3 w-3"
        >
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"
          ></span>
        </span>
      </li>
    </ul>

    <ul
      class="pl-10 animate__animated animate__fadeIn"
      v-else-if="item.nextWeekNumber === week"
    >
      <li v-for="week in item.nextWeek">
        {{ week.day }} {{ week.morningStart }} - {{ week.morningEnd }} et
        {{ week.afternoonStart }} -
        {{ week.afternoonEnd }}
      </li>
    </ul>

    <p v-else>Aucun horaire disponible</p>
  </div>
</template>

<style>
@import url("~/assets/css/solidaryGrocery/shopHours.css");
</style>
