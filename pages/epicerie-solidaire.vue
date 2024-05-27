<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
//TODO: refactor this component maybe just one state ?
//TODO : style pending state
//TODO: add a refresh button

const isModalOpen = ref<boolean>(false);
const isMapLoaded = ref<boolean>(false);

const { loadMapBox } = useMapBox(isModalOpen, isMapLoaded);

const { data, pending } = useFetch<string>("/api/mapboxAccessToken", {
  method: "GET",
  server: false,
});

const items = [
  {
    label: "Tab1",
    content: "dedefeff",
  },
  {
    label: "Tab2",
    content: "And, this is the content for Tab2",
  },
  {
    label: "Tab3",
    content: "Finally, this is the content for Tab3",
  },
];

watch(
  () => data.value,
  (value) => {
    mapboxgl.accessToken = value;
    loadMapBox();
  },
);
</script>

<template>
  <div class="wrapper">
    <p v-if="pending">Loading...</p>
    <div id="map">
      <p v-if="!isMapLoaded">Erreur lors du chargement de la map</p>
    </div>

    <USlideover v-model="isModalOpen">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3>Lorem</h3>
            <UButton
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isModalOpen = false"
            />
          </div>
        </template>
      </UCard>
    </USlideover>

    <UTabs :items="items">
      <template #item="{ item }">
        <div class="tab-container">
          <div class="tab-image">
            <NuxtImg src="test.jpg" />
          </div>
          <div class="tab-description">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              dolorum, sint ullam necessitatibus maxime sunt soluta saepe.
              Nesciunt dignissimos beatae non eum fugit doloribus. Minima beatae
              nulla tenetur facilis natus? Tempore eos praesentium minima ad a,
              quibusdam aliquam voluptate voluptatum ipsam architecto, optio
              itaque deserunt beatae? Similique possimus sed mollitia beatae
              fugit distinctio, nisi deserunt asperiores, esse a, voluptates
              eligendi.
            </p>
          </div>
        </div>
      </template>
    </UTabs>
  </div>
</template>

<style>
@import url("~/assets/css/solidaryGrocery.css");
</style>
