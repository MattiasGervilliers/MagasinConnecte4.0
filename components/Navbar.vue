<script setup lang="ts">
const isMenuOpen = useState("isMenuOpen", () => false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const links = [
  {
    name: "Technologies",
    path: "/technologies",
  },
  {
    name: "Photovoltaïque",
    path: "/photovoltaique",
  },
  {
    name: "Epicerie-solidaire",
    path: "/epicerie-solidaire",
  },
];
</script>

<template>
  <nav class="navbar">
    <h1>Magasin Connecté 4.0</h1>

    <div class="navbar-menu-container">
      <ul class="menu" v-if="isMenuOpen">
        <li v-for="link in links" :key="link.name">
          <UButton :to="link.path" variant="link">{{ link.name }}</UButton>
        </li>
      </ul>

      <UIcon @click="toggleMenu" v-if="!isMenuOpen" name="i-heroicons-bars-3" />
      <UIcon @click="toggleMenu" v-if="isMenuOpen" name="i-heroicons-x-mark" />
    </div>
  </nav>
</template>

<style>
@import url("~/assets/css/navbar.css");
</style>
