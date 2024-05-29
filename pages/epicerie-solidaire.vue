<script setup lang="ts">

import { definePageMeta } from "#imports";
import type { Shop } from "~/models/shop";

definePageMeta({
  auth: false,
})

export type Item = {
  label: string;
} & Shop;

const { data: shops } = await useFetch<Shop[]>("/api/shops", {
  method: "GET",
});

const createItems = (shops: Shop[]): Item[] => {
  return shops.map((shop: Shop) => ({
    label: shop.name,
    ...shop,
  }));
};

const items = ref<Item[]>(createItems(shops.value || []));
</script>

<template>
  <div class="shop-wrapper">
    <!-- ADD MAIN TITLE -->

    <p class="introduction">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat facilis
      doloribus illo impedit harum laudantium blanditiis quaerat, ab enim?
      Molestiae cum aspernatur ab ipsa exercitationem architecto itaque vitae
      doloremque debitis. Voluptates, quod ad ipsa inventore molestias, sint et
      architecto doloremque neque quidem perferendis, quia quas possimus itaque
      ullam consectetur! Optio illum atque unde numquam voluptas in ut beatae,
      dolores ipsam?
    </p>

    <SolidaryGroceryTabs :items="items" />
  </div>
</template>

<style>
@import url("~/assets/css/solidaryGrocery.css");
</style>
