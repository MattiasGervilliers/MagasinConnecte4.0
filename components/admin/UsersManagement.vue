<script setup lang="ts">
import type { User } from "~/models/user";
import UserManager from "~/components/admin/UserManager.vue";

type UserWithConfirmPassword = User & {
  confirmPassword: string;
};

const { users } = defineProps<{ users: User[] }>();
const isLoading = ref<boolean>(false);

const indexUserSelected = ref<number>(0);

const addUser = (user: User) => {
  managedUsers.value.push({
    ...user,
    confirmPassword: "",
  });
};

const managedUsers = ref<UserWithConfirmPassword[]>([
  {
    email: "Nouvel utilisateur",
    role: "seller",
    password: "",
    confirmPassword: "",
  },
]);

managedUsers.value.push(
  ...users.map((user) => {
    return {
      ...user,
      confirmPassword: "",
    };
  }),
);

const email = ref<string>(managedUsers.value[0].email);
</script>

<template>
  <div class="container">
    <h3>Gestion des utilisateurs</h3>

    <USelect
      v-model="email"
      @change="
        (e) => {
          indexUserSelected = managedUsers.findIndex((user) => user.email == e);
        }
      "
      :options="managedUsers"
      option-attribute="email"
      class="w-fit"
    />

    <UserManager
      :user="managedUsers[indexUserSelected]"
      :isNew="indexUserSelected == 0"
      :addUser="addUser"
    />
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
