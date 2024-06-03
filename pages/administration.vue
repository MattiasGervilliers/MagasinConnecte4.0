<script lang="ts" setup>
import type { Shop } from "~/models/shop";

const { data: shops } = await useFetch<Shop[]>("/api/shops", {
  method: "GET",
});
</script>

<template>
  <div class="wrapper">
    <div>
      <h3>Gestion de la clé api</h3>
    </div>

    <div>
      <h3>Gestion du mot de passe</h3>
    </div>

    <div>
      <h3>Gestion des horaires de l'épicerie solidaire</h3>

      <SolidaryGroceryAdminShopManagement v-if="shops" :shops="shops" />

      <p v-else>pas de shops</p>
    </div>
  </div>
</template>

<style>
.wrapper {
  margin: 70px 15%;
}
</style>
