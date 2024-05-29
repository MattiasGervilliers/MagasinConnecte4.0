<script lang="ts" setup>
import { z } from 'zod'
import { definePageMeta, useAuth } from '#imports'
import { UButton } from "#components";

const { signIn, token, data, status, lastRefreshedAt } = useAuth()
const toast = useToast()

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/'
  }
})

const schema = z.object({
  email: z.string().email('L\'adresse mail est invalide').min(1, 'Requis'),
  password: z.string().min(1, 'Requis')
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined
});

const onSubmit = () => {
  signIn({ username: state.email, password: state.password }, { callbackUrl: '/' }).catch((error) => {
    toast.add({ title: 'L\'e-mail ou le mot de passe est incorrect' , color: 'red'});
  });
}

</script>

<template>
  <div class="blur-sm">
  <DefaultBackground :hide-title='true'/>
  </div>
  <div class="login bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
    <h1 class="text-2xl font-bold mb-6 text-center">Connexion</h1>
    <UForm :state="state" :schema="schema" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="E-mail" name="email" v-model="state.email" class="space-y-2">
        <UInput id="email" v-model="state.email" class="w-full shadow-sm focus:outline-none" />
      </UFormGroup>
      <UFormGroup label="Mot de passe" name="password" v-model="state.password" class="space-y-2">
        <UInput id="password" v-model="state.password" type="password" class="w-full shadow-sm focus:outline-none" />
      </UFormGroup>
      <UButton type="submit" class="w-full py-2 px-4 text-white font-semibold rounded-md shadow">Connexion</UButton>
    </UForm>
  </div>
</template>

<style scoped>
.login {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 50%);
}
</style>