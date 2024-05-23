<script setup lang="ts">
async function onButtonClick() {
  const { data, pending, error, refresh } = await useFetch('/api/solarPanel/v1/power', {
    query: {
      startTime: '2024-01-01%2000:00:00',
      endTime: '2024-01-31%2000:00:00'
    }
  })

  console.log(data.value?.content)
}
</script>

<template>
  <UButton @click="onButtonClick">Click me</UButton>
</template>
