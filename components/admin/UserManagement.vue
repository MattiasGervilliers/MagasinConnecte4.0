<script setup lang="ts">
import type { User } from "~/models/user";
import type { FormSubmitEvent } from "#ui/types";
import z from "zod";
import sha256 from "crypto-js/sha256";

const { users } = defineProps<{ users: User[] }>();
const email = ref<string>(users[0].email);
const isLoading = ref<boolean>(false);

const schema = z
  .object({
    password: z.string().min(1, "Le mot de passe est requis"),
    confirmPassword: z.string().min(1, "Le mot de passe est requis"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  password: "",
  confirmPassword: "",
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { password } = event.data;

  try {
    await useFetch(`/api/users`, {
      method: "PUT",
      body: JSON.stringify({
        email: email.value,
        password: sha256(password).toString(),
      }),
    });
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <USelect v-model="email" :options="users" option-attribute="email" />

  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <p>Utilisateur: {{ email }}</p>
    <UFormGroup label="Nouveau mot de passe" name="password">
      <UInput type="password" v-model="state.password" />
    </UFormGroup>

    <UFormGroup label="Confirmer le mot de passe" name="confirmPassword">
      <UInput type="password" v-model="state.confirmPassword" />
    </UFormGroup>
    <UButton type="submit">Changer le mot de passe</UButton>
  </UForm>
</template>
