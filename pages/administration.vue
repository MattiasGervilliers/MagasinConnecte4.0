<script lang="ts" setup>
import type { Shop } from "~/models/shop";
import type { User } from "~/models/user";

const { data: shops } = await useFetch<Shop[]>("/api/shops", {
  method: "GET",
});

const { data: users } = await useFetch<User[]>("/api/users?safe=true", {
  method: "GET",
});

const items = [
  {
    label: "Horaires",
  },
  {
    label: "Utilisateurs",
  },
];
</script>

<template>
  <GlobalWrapper>
    <h2>Administration</h2>
    <UTabs :items="items">
      <template #item="{ item }">
        <AdminShopsManagement
          v-if="shops && item.label === 'Horaires'"
          :shops="shops"
          class="animate__animated animate__fadeIn"
        />

        <AdminUsersManagement
          v-if="users && item.label === 'Utilisateurs'"
          :users="users"
          class="animate__animated animate__fadeIn"
        />
      </template>
    </UTabs>
  </GlobalWrapper>
</template>

<style></style>
