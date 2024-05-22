<script setup lang="ts">
const props = defineProps<{image: ReturnType<typeof defineComponent>, isReversed?: boolean}>()
</script>

<template>
  <div class="card-navigation">
    <component :is="props.image" v-if="props.image" />
  </div>
</template>

<style>
.card-navigation {
  width: 200px;
  height: 200px;
  border: 1px solid theme('colors._primary.500');
}
</style>
