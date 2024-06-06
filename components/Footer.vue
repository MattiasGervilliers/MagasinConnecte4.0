<script setup lang="ts">
const isDarkTheme = ref(false);

onMounted(() => {
  isDarkTheme.value = document.documentElement.classList.contains("dark");
});
</script>

<template>
  <footer class="footer">
    <div class="container py-5 justify-center lg:justify-between">
      <div class="logo">
        <NuxtImg
          v-if="isDarkTheme"
          src="footer/amu_logo_white.png"
          alt="Logo amu white"
          class="w-fit"
        />

        <NuxtImg
          v-else
          src="footer/amu_logo.png"
          alt="Logo amu"
          class="w-fit"
        />
      </div>

      <div>
        <h2 class="text-xl font-bold text-_primary-700 dark:text-white">
          Liens rapides
        </h2>
        <ul class="footer-menu">
          <li>
            <NuxtLink to="technologies" class="hover:text-blue-800"
              >Technologies</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="photovoltaique" class="hover:text-blue-800"
              >Photovoltaique</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="epicerie-solidaire" class="hover:text-blue-800"
              >Epicerie Solidaire</NuxtLink
            >
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-_primary-700 dark:text-white">
          Magasin Connecté 4.0
        </h2>
        <p>
          IUT d’Aix-Marseille – Site de l’étoile<br />
          142 traverse Charles Susini 13013 Marseille
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import url("~/assets/css/footer.css");
</style>
