<script setup lang="ts">
import type { CardInfos } from "~/components/card/Default.vue";
import type { CardNavigationInfos } from "~/components/card/Navigation.vue";
import { definePageMeta } from "#imports";

definePageMeta({
  auth: false
});

const cardsNavigationInfos: CardNavigationInfos[] = [
  {
    title: "Technologies",
    description: "Découvrez les dernières technologies",
    path: "/technologies",
    iconUrl: "i-heroicons-camera-solid",
  },
  {
    title: "Photovoltaïque",
    description: "Découvrez les panneaux solaires",
    path: "/photovoltaique",
    iconUrl: "i-heroicons-camera-solid",
  },
  {
    title: "Epicerie-solidaire",
    description: "Découvrez notre épicerie solidaire",
    path: "/epicerie-solidaire",
    iconUrl: "i-heroicons-camera-solid",
  },
];

const cardsInfos: CardInfos[] = [
  {
    title: "Lorem ipsum dolor sit amet",
    subTitle: "Hic nisi repellat sed voluptatem consequatur",
    description:
      "Qui temporibus rerum et cumque quod et iure officia est doloribus aspernatur sit nihil quia. In eius cumque et consequatur exercitationem qui pariatur Quis! Est placeat consequatur ut animi sapiente aut voluptatem molestias sed dolorem fugit et sunt maiores aut quia tempore.",
    publicImage: "test.jpg",
    isReversed: false,
  },

  {
    title: "Lorem ipsum dolor sit amet",
    subTitle: "Hic nisi repellat sed voluptatem consequatur",
    description:
      "Qui temporibus rerum et cumque quod et iure officia est doloribus aspernatur sit nihil quia. In eius cumque et consequatur exercitationem qui pariatur Quis! Est placeat consequatur ut animi sapiente aut voluptatem molestias sed dolorem fugit et sunt maiores aut quia tempore.",
    publicImage: "test.jpg",
    isReversed: true,
  },
];
</script>

<template>
  <DefaultBackground />

  <ScrollButton hash="#content" />

  <div id="content" class="content">
    <CardDefault v-for="cardInfos in cardsInfos" :card-infos="cardInfos" />

    <div class="card-navigation-container">
      <CardNavigation
        v-for="cardNavigationInfos in cardsNavigationInfos"
        :card-navigation-infos="cardNavigationInfos"
      />
    </div>
  </div>
</template>

<style>
@import url("~/assets/css/homepage.css");
</style>
