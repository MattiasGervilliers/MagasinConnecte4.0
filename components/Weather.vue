<script setup>

const { data, execute } = useFetchWeatherReport();

async function onButtonClick() {
  // TODO
}

</script>

<template>
  <button @click="onButtonClick">get Station data</button>
</template>