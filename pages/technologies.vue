<script setup lang="ts">
import type { CardInfosTechno } from "~/components/CardInfoTechno.vue";

const links = [
  {
    label: "Magasin Connecté 4.0",
    to: "/",
  },
  {
    label: "Technologies",
  },
];

const cardInfosTechno: CardInfosTechno[] = [
  {
    title: 'LI-FI',
    description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non malesuada est.',
    image:  'screenshots/LIFI.png',
    link: 'lifi'
  },
  {
    title: 'VLC',
    description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non malesuada est.',
    image: 'screenshots/VLC.png',
    link: 'vlc'
  },
  {
    title: 'Drones',
    description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non malesuada est.',
    image: 'screenshots/drone.jpg',
    link: 'drones'
  },
  {
    title: 'CSO',
    description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non malesuada est.',
    image: '/screenshots/CSO.jpg',
    link: 'cso'
  },
  {
    title: 'RFID',
    description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non malesuada est.',
    image: '/screenshots/RFID.png',
    link: 'rfid'
  },
  {
    title: 'Acoustique',
    description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non malesuada est.',
    image: '/screenshots/acoustique.png',
    link: 'acoustique'
  },

]
</script>

<template>
  <h1>Technologies</h1>
  <UBreadcrumb :links="links">
    <template #divider>
      <span class="w-8 h-1 rounded-full bg-neutral-700 dark:bg-neutral-300" />
    </template>
  </UBreadcrumb>
  <div id="contentTechno" class="contentTechno">
    <CardInfoTechno v-for="cardInfoTechno in cardInfosTechno" :card-infos-techno="cardInfoTechno" />
  </div>
</template>

<style>
@import url("~/assets/css/cardInfosTechno.css");
</style>