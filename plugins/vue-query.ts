import { VueQueryPlugin } from '@tanstack/vue-query'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueQueryPlugin)
})