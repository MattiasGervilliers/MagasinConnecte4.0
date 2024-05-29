<script setup lang="ts">
const route = useRoute();
const navbar = ref<Element | null>(null);
const isMenuOpen = useState("isMenuOpen", () => false);

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

const changeBackground = () => {
  if (navbar.value) {
    if (document.documentElement.scrollTop > 0 || route.path !== "/") {
      navbar.value.classList.add("navbar-scrolled");
      return;
    }

    navbar.value.classList.remove("navbar-scrolled");
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const resetMenu = () => {
  if (isMenuOpen.value) {
    isMenuOpen.value = false;
  }
};

//TODO: refactor this function and optimize it
onMounted(() => {
  navbar.value = document.querySelector(".navbar");

  changeBackground();

  window.addEventListener("scroll", () => {
    if (navbar.value && route.path === "/") {
      if (window.scrollY > 0) {
        navbar.value.classList.add("navbar-scrolled");
        navbar.value.classList.add(
          "animate__animated",
          "animate__fadeInDown",
          "animate__faster",
        );
      } else {
        navbar.value.classList.remove("navbar-scrolled");
        navbar.value.classList.remove(
          "animate__animated",
          "animate__fadeInDown",
          "animate__faster",
        );
      }
    }
  });
});

watch(
  () => route.path,
  () => {
    changeBackground();
    resetMenu();
  },
);
</script>

<template>
  <nav class="navbar">
    <h1
      class="text-3xl text-white font-bold animate__animated animate__fadeInLeft animate__fast"
    >
      <NuxtLink to="/">Magasin Connecté 4.0</NuxtLink>
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
