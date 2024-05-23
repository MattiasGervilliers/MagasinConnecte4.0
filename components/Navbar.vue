<script setup lang="ts">
//TODO: refactor this function
onMounted(() => {
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (window.scrollY > 0) {
        navbar.classList.add("navbar-scrolled");
        navbar.classList.add(
          "animate__animated",
          "animate__fadeInDown",
          "animate__faster",
        );
      } else {
        navbar.classList.remove("navbar-scrolled");
        navbar.classList.remove(
          "animate__animated",
          "animate__fadeInDown",
          "animate__faster",
        );
      }
    }
  });
});

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
    <h1
      class="text-3xl text-white font-bold animate__animated animate__fadeInLeft animate__fast"
    >
      Magasin Connecté 4.0
    </h1>

    <div class="navbar-menu-container">
      <ul class="menu" v-if="isMenuOpen">
        <li
          class="animate__animated animate__fadeInDown animate__faster"
          v-for="link in links"
          :key="link.name"
        >
          <UButton :to="link.path" variant="link" size="xl">{{
            link.name
          }}</UButton>
        </li>
      </ul>

      <UIcon
        @click="toggleMenu"
        v-if="!isMenuOpen"
        name="i-heroicons-bars-3"
        class="menu-icon text-3xl cursor-pointer animate__animated animate__flipInX animate__fast"
      />
      <UIcon
        @click="toggleMenu"
        v-if="isMenuOpen"
        name="i-heroicons-x-mark"
        class="menu-icon text-3xl cursor-pointer animate__animated animate__flipInX animate__fast"
      />
    </div>
  </nav>
</template>

<style scoped>
@import url("~/assets/css/navbar.css");
</style>
