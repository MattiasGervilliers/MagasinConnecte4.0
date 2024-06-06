<script lang="ts" setup>
import { z } from "zod";
import { definePageMeta, useAuth } from "#imports";
import { UButton } from "#components";
import sha256 from "crypto-js/sha256";

const { signIn, token, data, status, lastRefreshedAt } = useAuth();
const toast = useToast();
const isLoading = ref<boolean>(false);

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/"
  }
});

const schema = z.object({
  email: z.string().email("L'adresse mail est invalide").min(1, "Requis"),
  password: z.string().min(1, "Requis")
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined
});

const onSubmit = () => {
  isLoading.value = true;
  signIn(
    {
      username: state.email,
      password: sha256(state.password || "").toString()
    },
    { callbackUrl: "/administration" }
  )
    .then(() => {
      toast.add({
        title: "Connexion",
        description: "Vous êtes connecté avec succès"
      });
    })
    .catch((error) => {
      toast.add({
        title: "L'e-mail ou le mot de passe est incorrect",
        color: "red"
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<template>
  <BlurBackground title="Connexion">
    <UForm :state="state" :schema="schema" class="space-y-4" @submit="onSubmit">
      <UFormGroup
        label="E-mail"
        name="email"
        v-model="state.email"
        class="space-y-2"
      >
        <UInput
          id="email"
          v-model="state.email"
          class="w-full shadow-sm focus:outline-none"
          type="email"
        />
      </UFormGroup>
      <UFormGroup
        label="Mot de passe"
        name="password"
        v-model="state.password"
        class="space-y-2"
      >
        <UInput
          id="password"
          v-model="state.password"
          type="password"
          class="w-full shadow-sm focus:outline-none"
        />
      </UFormGroup>
      <UButton
        type="submit"
        class="w-full py-2 px-4 text-white font-semibold rounded-md shadow"
        :loading="isLoading"
      >
        Connexion
      </UButton>
    </UForm>
  </BlurBackground>
</template>

<style scoped>

</style>
