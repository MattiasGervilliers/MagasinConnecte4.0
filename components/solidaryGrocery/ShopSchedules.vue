<script setup lang="ts">
import type { Item } from "~/pages/epicerie-solidaire.vue";

const { item } = defineProps<{ item: Item; week: number }>();

const { currentDay } = useDate();
</script>

<template>
  <div class="shop__hours">
    <p class="font-bold">
      <Icon name="i-heroicons-clock-16-solid" /> Horaires :
    </p>

    <ul
      class="pl-10 animate__animated animate__fadeIn"
      v-if="item.currentWeek.number === week"
    >
      <li
        v-for="(week, index) in item.currentWeek.days"
        :class="{ 'flex gap-2 font-bold relative': currentDay - 1 === index }"
      >
        <SolidaryGroceryShopDay
          :day="week"
          :index="index"
          :week-number="item.currentWeek.number"
        />
      </li>
    </ul>

    <ul
      class="pl-10 animate__animated animate__fadeIn"
      v-else-if="item.nextWeek.number === week"
    >
      <li
        v-for="(week, index) in item.nextWeek.days"
        :class="{ 'flex gap-2 relative': currentDay - 1 === index }"
      >
        <SolidaryGroceryShopDay
          :day="week"
          :index="index"
          :week-number="item.nextWeek.number"
        />
      </li>
    </ul>

    <p v-else>Aucun horaire disponible</p>
  </div>
</template>

<style>
@import url("~/assets/css/solidaryGrocery/shopHours.css");
</style>
