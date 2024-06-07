<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import type { Shop } from "~/models/shop";

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
    await useFetchWithToast(
      "api/shops",
      {
        successMessage: {
          description: "Les horaires ont bien été enregistrés",
          title: "Succès",
        },
        errorMessage: {
          description:
            "Une erreur est survenue lors de l'enregistrement des horaires",
          title: "Erreur",
        },
      },
      {
        method: "PUT",
        body: JSON.stringify(shopsCopy),
      },
    );
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <h3>Gestion des horaires de l'épicerie solidaire</h3>

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

    <UTabs
      :items="items"
      orientation="vertical"
      :ui="{
        wrapper: 'flex items-start gap-4 flex-wrap',
        list: { width: 'w-48' },
      }"
      @change="(e) => (shopNumber = ~~e)"
    >
      <template #item="{ item }">
        <UForm :state="state" @submit="onSubmit">
          <UButton type="submit" :loading="isLoading">Enregistrer</UButton>

          <ul class="shop__ul">
            <li v-for="(dayName, index) in days" :key="index">
              <AdminShopManagementDay
                :day-name="dayName"
                :day="
                  week === state[shopNumber].currentWeek.number
                    ? state[shopNumber].currentWeek.days[index]
                    : state[shopNumber].nextWeek.days[index]
                "
              />
            </li>
          </ul>
        </UForm>
      </template>
    </UTabs>
  </div>
</template>

<style>
@import url("~/assets/css/admin/shopsManagement.css");
</style>
