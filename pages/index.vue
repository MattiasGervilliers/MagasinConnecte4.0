<script setup lang="ts">
import type { CardInfos } from "~/components/card/Presentation.vue";
import type { CardNavigationInfos } from "~/components/card/Navigation.vue";
import { definePageMeta } from "#imports";

definePageMeta({
  auth: false,
});

const cardsNavigationInfos: CardNavigationInfos[] = [
  {
    title: "Technologies",
    description: "Découvrez les dernières technologies",
    path: "/technologies",
    iconUrl: "i-heroicons-cpu-chip",
  },
  {
    title: "Photovoltaïque",
    description: "Découvrez les panneaux solaires",
    path: "/photovoltaique",
    iconUrl: "i-heroicons-table-cells",
  },
  {
    title: "Epicerie solidaire",
    description: "Découvrez notre épicerie solidaire",
    path: "/epicerie-solidaire",
    iconUrl: "i-heroicons-shopping-cart",
  },
];

const cardsInfos: CardInfos[] = [
  {
    title: "Par les étudiants pour les étudiants !",
    subTitle: "",
    description:
      '"Nous proposons à ces étudiants des produits à 10% des prix du marchés, comme des paquets de pâtes à 7 centimes' +
      "\" - Alexandre Siméoni, président de la fédération Aix-Marseille Interasso.\n Depuis l'inoguration du magasin" +
      " connecté en 2019 plus de 650 étudiants ont bénéficié de ces tarifs préférentiels.",
    publicImage: "mainPage_store.jpg",
    isReversed: false,
  },

  {
    title: "Un magasin a la pointe de la technologies",
    subTitle: "Vivez l'experience du client de demain",
    description:
      "Le magasin connecter a pour but de regroupé les technologies du futur et de les integré dans un contexte reel. " +
      "On y retrouve des technologies comme le LiFi, le recyclage de la lumière ambiante, l'eclairage circadien, " +
      "des drones, le RFID, l'IOT et la VLC",
    publicImage: "mainPage_tech_img.png",
    isReversed: true,
  },
];
</script>

<template>
  <DefaultBackground />

  <ScrollButton hash="#content" />

  <GlobalWrapper id="content" class="content" with-fullscreen>
    <div class="card-default-container">
      <CardPresentation
        v-for="cardInfos in cardsInfos"
        :card-infos="cardInfos"
      />
    </div>

    <div class="card-navigation-container">
      <CardNavigation
        v-for="cardNavigationInfos in cardsNavigationInfos"
        :card-navigation-infos="cardNavigationInfos"
      />
    </div>

    <Parteners />
  </GlobalWrapper>
</template>

<style>
@import url("~/assets/css/homepage.css");
</style>
