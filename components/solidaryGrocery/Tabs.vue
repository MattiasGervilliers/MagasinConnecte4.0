<script setup lang="ts">
import type { Item } from "~/pages/epicerie-solidaire.vue";

const { items } = defineProps<{
  items: Item[];
}>();

const { weeks } = useWeek();

const week = ref(weeks[0].value);
</script>

<template>
  <UTabs
    :items="items"
    class="shop__tabs"
    orientation="vertical"
    :ui="{ wrapper: 'flex items-start gap-10', list: { width: 'w-48' } }"
  >
    <template #item="{ item }">
      <div class="shop">
        <SolidaryGroceryShopImages :item="item" />

        <h3 class="font-bold">{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <UButton variant="link" :to=item.social target="_blank" style="width: fit-content">⸱ Instagram</UButton>
        <UButton variant="link" :to=item.linkTree target="_blank" style="width: fit-content">⸱ Autres liens</UButton>

        <p class="shop__select">
          Semaine :
          <USelect
            v-model="week"
            :options="weeks"
            option-attribute="name"
            value-attribute="value"
            icon="i-heroicons-calendar-days"
            @change="(e) => (week = ~~e)"
          />
        </p>

        <SolidaryGroceryShopSchedules :item="item" :week="week" />

        <SolidaryGroceryShopAddress :item="item" />
      </div>
    </template>
  </UTabs>
</template>

<style>
@import url("~/assets/css/solidaryGrocery/tabs.css");
</style>
