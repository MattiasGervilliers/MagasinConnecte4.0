<script setup lang="ts">
async function onButtonClick() {
  const { data, pending, error, refresh } = await useFetch('/api/solarPanel/v1/dataPeriod', {
    query: {
    }
  })

  console.log(data.value?.content)
}
</script>

<template>
  <UButton @click="onButtonClick">Click me</UButton>
</template>
