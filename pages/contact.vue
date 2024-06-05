<script setup lang="ts">
import { definePageMeta } from "#imports";
import { z } from "zod";

const IDENTITIES = ["student", "teacher", "company", "other"] as const;
const IDENTITIES_SELECT = [
  {
    label: "Étudiant",
    value: IDENTITIES[0],
  },
  {
    label: "Enseignant",
    value: IDENTITIES[1],
  },
  {
    label: "Entreprise",
    value: IDENTITIES[2],
  },
  {
    label: "Autre",
    value: IDENTITIES[3],
  },
]

definePageMeta({
  auth: false
});

const schema = z.object({
  identity : z.enum(IDENTITIES),
  subject: z.string().min(1, "Requis"),
  message: z.string().min(1, "Requis"),
})

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  identity: "student",
  subject: "",
  message: "",
})

const onSubmit = () => {
  window.location.href = "mailto:email@example.com?subject=[" + IDENTITIES_SELECT.find(identity => identity.value === state.identity)?.label + "] " + state.subject + "&body=" + state.message;
}
</script>

<template>
  <BlurBackground title="Contact">
    <div class="space-y-4">
      <UForm :state="state" :schema="schema" class="space-y-4" @submit="onSubmit">
        <div class="flex space-x-4">
          <UFormGroup label="Identité" name="identity" class="flex-1">
            <USelect v-model="state.identity" :options="IDENTITIES_SELECT" option-attribute="label" />
          </UFormGroup>
          <UFormGroup label="Sujet" name="subject" class="flex-1">
            <UInput v-model="state.subject" />
          </UFormGroup>
        </div>
        <UFormGroup label="Message" name="message">
          <UTextarea v-model="state.message" />
        </UFormGroup>
        <UButton class="w-full" type="submit">Envoyer</UButton>
      </UForm>
    </div>
  </BlurBackground>
</template>

<style scoped>

</style>
