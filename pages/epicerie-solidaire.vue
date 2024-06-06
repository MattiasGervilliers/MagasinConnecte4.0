<script setup lang="ts">
import { definePageMeta } from "#imports";
import type { Shop } from "~/models/shop";

definePageMeta({
  auth: false,
});

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
  <GlobalWrapper class="shop-wrapper">
    <MainTitle text="Epicerie solidaire" />

    <p class="introduction">
      La Fédération Aix-Marseille Interasso (FAMI) a été créée en 2012 pour défendre les droits des étudiants et
      améliorer leurs conditions de vie. Face à une précarité étudiante croissante révélée par une enquête, la FAMI a
      ouvert des épiceries solidaires AGORAé sur les campus d'Aix-Marseille, proposant des produits à bas prix et
      diverses activités. Un nouveau projet d'épicerie solidaire ouvrira fin 2023 au campus aixois, soutenu par des
      associations étudiantes et le réseau Alumni.
    </p>

    <SolidaryGroceryTabs :items="items" />
  </GlobalWrapper>
</template>

<style>
@import url("~/assets/css/solidaryGrocery.css");
</style>
