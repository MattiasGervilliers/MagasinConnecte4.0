<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import moment from "moment";
import type { Day, Shop } from "~/models/shop";

export type Item = {
  label: string;
} & Shop;

const { shops } = defineProps<{
  shops: Shop[];
}>();

const { weeks } = useWeek();
const { loadState } = useShopManagement();
const week = ref(weeks[0].value);
const isLoading = ref<boolean>(false);
const shopNumber = ref<number>(0);
const state = reactive<Shop[]>(loadState(shops || []));

const createItems = (shops: Shop[]): Item[] => {
  return shops.map((shop: Shop) => ({
    label: shop.name,
    ...shop,
  }));
};

const items = ref<Item[]>(createItems(shops || []));

const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

//TODO: manage error
const onSubmit = async (event: FormSubmitEvent<Shop[]>) => {
  const shopsCopy = [...event.data];

  try {
    isLoading.value = true;
    await $fetch("api/shops", {
      method: "PUT",
      body: JSON.stringify(shopsCopy),
    });

    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
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

    <p>Shop numéro : {{ shopNumber + 1 }}</p>

    <UTabs
      :items="items"
      orientation="vertical"
      :ui="{ wrapper: 'flex items-start gap-10', list: { width: 'w-48' } }"
      @change="(e) => (shopNumber = ~~e)"
    >
      <template #item="{ item }">
        <UForm :state="state" @submit="onSubmit">
          <ul>
            <li v-for="(dayName, index) in days" :key="index">
              <SolidaryGroceryAdminShopManagementDay
                :day-name="dayName"
                :day="
                  week === state[shopNumber].currentWeek.number
                    ? state[shopNumber].currentWeek.days[index]
                    : state[shopNumber].nextWeek.days[index]
                "
              />
            </li>
            <UButton type="submit" :loading="isLoading">Enregistrer</UButton>
          </ul>
        </UForm>
      </template>
    </UTabs>
  </div>
</template>

<style>
.shop__select {
  display: flex;
  gap: 10px;
  width: fit-content;
}
</style>
