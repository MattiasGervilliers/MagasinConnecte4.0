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
      v-if="item.currentWeekNumber === week"
    >
      <li
        v-for="(week, index) in item.currentWeek"
        :class="{ 'flex gap-2 font-bold relative': currentDay - 1 === index }"
      >
        <SolidaryGroceryShopDay :day="week" :index="index" />
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
