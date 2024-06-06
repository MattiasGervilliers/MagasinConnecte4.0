<script setup lang="ts">
import type { Item } from "~/pages/epicerie-solidaire.vue";

const { item } = defineProps<{ item: Item }>();
</script>

<template>
  <div class="shop__address">
    <h3 class="font-bold"><Icon name="i-heroicons-map-pin" />Addresse :</h3>

    <div style="width: 100%" :style="{ 'margin-top': '20px' }">
      <iframe
        width="100%"
        height="200"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        :src="`https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${encodeURIComponent(item.address)}+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`"
        ><a href="https://www.gps.ie/">gps devices</a></iframe
      >
    </div>
  </div>
</template>
