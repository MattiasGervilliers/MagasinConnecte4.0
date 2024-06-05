<script setup lang="ts">
export type CardInfosTechno = {
  title: string;
  image: string;
  description: string;
  link: string;
};

const { cardInfosTechno } = defineProps<{
  cardInfosTechno: CardInfosTechno;
}>();

console.log(cardInfosTechno);
</script>

<template>
  <div class="cardTechno">
    <NuxtImg class="cardImageTechno" :src="cardInfosTechno.image?? ''"  />
    <div class="cardTextTechno">
      <h3 class="text-xl font-bold text-primary-500">{{ cardInfosTechno.title }}</h3>
      <p>
        {{ cardInfosTechno.description }}
      </p>
    </div>
    <UButton class="cardButtonTechno" variant="link" :to="`#${cardInfosTechno.link}`">Voir plus</UButton>  </div>
</template>

<style>
@import url("~/assets/css/cardInfosTechno.css");
</style>
