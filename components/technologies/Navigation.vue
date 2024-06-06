<script setup lang="ts">
const { links } = defineProps<{ links: string[] }>();
const route = useRoute();

const hash = ref(route.hash);

watch(
  () => route.hash,
  () => {
    hash.value = route.hash;
  },
);
</script>

<template>
  <ul class="navigation">
    <li
      v-for="link in links"
      :key="link"
      :class="hash === `#${link}` ? 'is-selected ' : 'not-selected'"
    >
      <UButton
        :to="`#${link}`"
        variant="link"
        :color="hash === `#${link}` ? 'white' : 'primary'"
        >{{ link }}</UButton
      >
    </li>
  </ul>
</template>

<style>
.navigation {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: theme("colors.white");
  display: flex;
  flex-direction: row;
  border: 1px solid theme("colors.primary.500");
  border-radius: 10px;
  overflow: hidden;
}

.navigation li {
  padding: 10px;
  transition: 0.3s ease-in-out;
}

.is-selected {
  background-color: theme("colors.primary.500");
  color: theme("colors.white");
}
</style>
