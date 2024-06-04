<script lang="ts" setup>
import type { Shop } from "~/models/shop";
import type { User } from "~/models/user";
import { useAuth } from "#imports";

const { data: shops } = await useFetch<Shop[]>("/api/shops", {
  method: "GET",
});

const { data: users } = await useFetch<User[]>("/api/users?safe=true", {
  method: "GET",
});

const { data } = useAuth();
</script>

<template>
  <div class="wrapper">
    <div>
      <h3>Gestion des horaires de l'épicerie solidaire</h3>

      <AdminShopManagement v-if="shops" :shops="shops" />

      <p v-else>pas de shops</p>
    </div>
  </div>

  <div v-if="data.role == 'admin'">
    <AdminUsersManagement v-if="users" :users="users" />
  </div>
</template>

<style>
.wrapper {
  margin: 70px 15%;
}
</style>
