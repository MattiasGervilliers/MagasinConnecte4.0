<script setup lang="ts">
import type { Item } from "~/pages/epicerie-solidaire.vue";

const { item } = defineProps<{ item: Item; week: number }>();

const currentDay: number = new Date().getDay();
</script>

<template>
  <div class="shop__hours">
    <p class="font-bold">
      <Icon name="i-heroicons-clock-16-solid" /> Horaires :
    </p>

    <ul
      class="pl-10 animate__animated animate__fadeIn"
      v-if="item.currentWeekNumber == week"
    >
      <li
        v-for="(week, index) in item.currentWeek"
        :class="{ 'font-bold relative': currentDay - 1 === index }"
      >
        {{ week.day }} {{ week.morningStart }} - {{ week.morningEnd }}
        et
        {{ week.afternoonStart }} - {{ week.afternoonEnd }}
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
      v-else-if="item.nextWeekNumber == week"
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
