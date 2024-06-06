<script setup lang="ts">
import type { User } from "~/models/user";
import { z } from "zod";
import { useFetchWithToast } from "~/composables/useFetchWithToast";
import sha256 from "crypto-js/sha256";

const ROLE_ENUM = ["admin", "seller"] as const;

const ROLE_RADIO = [
  {
    label: "Administrateur",
    value: ROLE_ENUM[0],
  },
  {
    label: "Vendeur",
    value: ROLE_ENUM[1],
  },
];

const props = defineProps<{ user: User; isNew?: boolean; addUser: (user: User) => void }>();

watch(
  () => props.user,
  (user) => {
    state.email = user.email;
    state.role = user.role;
    state.password = "";
    state.confirmPassword = "";
  },
);

watch(
  () => props.isNew,
  (isNew) => {
    if (isNew) {
      state.email = "";
    }
  },
);

const schema = z
  .object({
    email: z.string().email(),
    role: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  email: props.user.email,
  role: props.user.role,
  password: "",
  confirmPassword: "",
});

const onSubmit = async () => {
  if (props.isNew) {
    await useFetchWithToast<User>(
      "/api/users",
      {
        successMessage: {
          title: "Utilisateur ajouté",
          description: "L'utilisateur a bien été ajouté"
        },
        errorMessage: {
          title: "Erreur",
          description: "Impossible d'ajouter l'utilisateur",
        },
      },
      {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          role: state.role,
          password: sha256(state.password).toString(),
        }),
      },
    ).then((data: User|void) => {
      props.addUser((data) as User);
      state.email = "";
      state.role = ROLE_ENUM[0];
      state.password = "";
      state.confirmPassword = "";
    });
  } else {
    await useFetchWithToast(
      "/api/users",
      {
        successMessage: {
          title: "Utilisateur mis à jour",
          description: "L'utilisateur a bien été mis à jour",
        },
        errorMessage: {
          title: "Erreur",
          description: "Impossible de mettre à jour l'utilisateur",
        },
      },
      {
        method: "PUT",
        body: JSON.stringify({
          email: state.email,
          role: state.role,
          password: sha256(state.password).toString(),
        }),
      },
    );
  }
};

if (props.isNew) {
  state.email = "";
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    @submit="onSubmit"
    class="user-management-container"
  >
    <UFormGroup v-if="props.isNew" label="E-mail" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Rôle" name="role">
      <URadioGroup v-model="state.role" :options="ROLE_RADIO" />
    </UFormGroup>
    <UFormGroup :label="props.isNew ? 'Mot de passe' : 'Nouveau mot de passe'" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    <UFormGroup :label="props.isNew ? 'Confirmer le mot de passe' : 'Confirmer le nouveau mot de passe'" name="confirmPassword">
      <UInput v-model="state.confirmPassword" type="password" />
    </UFormGroup>

    <UButton type="submit">{{
      props.isNew ? "Ajouter" : "Mettre à jour"
    }}</UButton>
  </UForm>
</template>

<style scoped>
.user-management-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: start;
}
</style>
