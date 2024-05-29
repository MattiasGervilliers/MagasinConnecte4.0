<script setup lang="ts">
import type { CardInfos } from "~/components/card/Default.vue";
import type { CardNavigationInfos } from "~/components/card/Navigation.vue";

const cardsInfos: CardInfos[] = [
  {
    title: "Par les étudiants pour les étudiants !",
    subTitle: "",
    description:
        "\"Nous proposons à ces étudiants des produits à 10% des prix du marchés, comme des paquets de pâtes à 7 centimes"
        + "\" - Alexandre Siméoni, président de la fédération Aix-Marseille Interasso.\n depuis l'inoguration du magasin" +
        "connecter en 2019 plus de 650 étudiants ont bénéficié de ces tarifs préférentiels.",
    publicImage: "mainPage_store.jpg",
    isReversed: false,
  },

  {
    title: "Un magasin a la pointe de la technologie",
    subTitle: "Vivez l'experience du client de demain",
    description:
        "Le magasin connecter a pour but de regroupé les technologies du futur et de les integré dans un contexte reel. " +
        "on y retrouve des technologies comme le LiFi, le recyclage de la lumière ambiante, l'eclairage circadien, " +
        "des drones, le RFID, l'IOT et la VLC",
    publicImage: "mainPage_tech_img.png",
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
