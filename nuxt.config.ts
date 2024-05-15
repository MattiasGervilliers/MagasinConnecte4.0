export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@hebilicious/vue-query-nuxt", "@vite-pwa/nuxt"],
  pwa: {
    manifest: {
      name: "My Awesome App",
      short_name: "Awesome",
      description: "My awesome Nuxt.js app",
      theme_color: "#ffffff",
      icons: [
        {
          src: "icons/icon_64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/icon_144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
