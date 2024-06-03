<script lang="ts" setup>
import type { Shop } from "~/models/shop";
import type { User } from "~/models/user";
import { useAuth } from "#imports";

const { data: shops } = await useFetch<Shop[]>("/api/shops", {
  method: "GET",
});

const { data: users } = await useFetch<User[]>("/api/users", {
  method: "GET",
});

const { data } = useAuth();
</script>

<template>
  <div class="wrapper">
    <div>
      <h3>Gestion des horaires de l'épicerie solidaire</h3>

      <SolidaryGroceryAdminShopManagement v-if="shops" :shops="shops" />

      <p v-else>pas de shops</p>
    </div>
  </div>

  <div v-if="data.role == 'admin'">
    <h3>Gestion du mot de passe</h3>
    <AdminUserManagement v-if="users" :users="users" />
  </div>
</template>

<style>
.wrapper {
  margin: 70px 15%;
}
</style>
