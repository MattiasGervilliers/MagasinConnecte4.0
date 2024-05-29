<script setup lang="ts">
import moment from "moment";
import type { Item } from "~/pages/epicerie-solidaire.vue";

const { items } = defineProps<{
  items: Item[];
}>();

const currentWeekNumber: number = moment(new Date()).isoWeek();

const getStartAndEndOfWeek = (weekNumber: number, year: number) => {
  const startOfWeek = moment().year(year).week(weekNumber).startOf("week");
  const endOfWeek = moment().year(year).week(weekNumber).endOf("week");

  return {
    start: startOfWeek.format("MM-DD"),
    end: endOfWeek.format("MM-DD"),
  };
};

const weeks = [
  {
    name: `${getStartAndEndOfWeek(currentWeekNumber, new Date().getFullYear()).start} au ${getStartAndEndOfWeek(currentWeekNumber, new Date().getFullYear()).end}`,
    value: currentWeekNumber,
  },
  {
    name: `${getStartAndEndOfWeek(currentWeekNumber + 1, new Date().getFullYear()).start} au ${getStartAndEndOfWeek(currentWeekNumber + 1, new Date().getFullYear()).end}`,
    value: currentWeekNumber + 1,
  },
];

const week = ref(weeks[0].value);
</script>

<template>
  <UTabs
    :items="items"
    orientation="vertical"
    :ui="{ wrapper: 'flex items-start gap-10', list: { width: 'w-48' } }"
  >
    <template #item="{ item }">
      <div class="shop">
        <SolidaryGroceryShopImages :item="item" />

        <h3 class="font-bold">{{ item.name }}</h3>
        <p>{{ item.description }}</p>

        <p class="shop__select">
          Semaine :
          <USelect
            color="primary"
            v-model="week"
            :options="weeks"
            option-attribute="name"
            value-attribute="value"
            icon="i-heroicons-calendar-days"
            @change="(e) => (week = ~~e)"
          />
        </p>

        <SolidaryGroceryShopHours :item="item" :week="week" />

        <SolidaryGroceryShopAddress :item="item" />
      </div>
    </template>
  </UTabs>
</template>

<style>
@import url("~/assets/css/solidaryGrocery/tabs.css");
</style>
