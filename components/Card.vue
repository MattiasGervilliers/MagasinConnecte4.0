<script setup lang="ts">
const props = defineProps<{image?: string, isReversed?: boolean}>()
</script>

<template>
  <div class="card">

    <NuxtImg v-if="!props.isReversed" class="card-image" src="test.jpg" />

    <div class="card-description">
      <h2>Lorem ipsum dolor sit amet</h2>
      <h3>Hic nisi repellat sed voluptatem consequatur</h3>
      <UDivider size="sm" />
      <p>Qui temporibus rerum et cumque quod et iure officia est doloribus aspernatur sit nihil quia. In eius cumque et consequatur exercitationem qui pariatur Quis! Est placeat consequatur ut animi sapiente aut voluptatem molestias sed dolorem fugit et sunt maiores aut quia tempore. </p>
    </div>

    <NuxtImg v-if="props.isReversed" class="card-image" src="test.jpg" />
  </div>
</template>

<style>
@import url('~/assets/css/card.css');
</style>