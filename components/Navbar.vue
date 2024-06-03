<script setup lang="ts">
const route = useRoute();
const navbar = ref<Element | null>(null);

const { isMenuOpen, refLinks, resetMenu, toggleMenu, toggleMenuWithSubLinks } =
  useNavbar();

const { changeBackground, onScroll } = useBackground({ navbar });

onMounted(() => {
  navbar.value = document.querySelector(".navbar");

  changeBackground();
  window.addEventListener("scroll", onScroll);
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
          v-for="refLink in refLinks"
          :key="refLink.name"
        >
          <UButton
            v-if="
              refLink.name !== 'Photovoltaïque' && refLink.name !== 'Retour'
            "
            :to="refLink.path"
            variant="link"
            size="xl"
            >{{ refLink.name }}</UButton
          >
          <UButton
            v-else-if="refLink.name === 'Retour'"
            :icon="refLink.icon"
            variant="link"
            size="xl"
            @click="refLink.onClick"
          />

          <UButton
            v-else
            variant="link"
            size="xl"
            @click="toggleMenuWithSubLinks"
            >{{ refLink.name }}</UButton
          >
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

      <UButton
        icon="i-heroicons-user-16-solid"
        size="md"
        class="menu-icon"
        to="/administration"
        variant="link"
      />
    </div>
  </nav>
</template>

<style scoped>
@import url("~/assets/css/navbar.css");
</style>
