export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@hebilicious/vue-query-nuxt", "@vite-pwa/nuxt", '@nuxt/ui'],
  pwa: {
    manifest: {
      name: "Magasin Connecté 4.0",
      short_name: "Magasin Connecté",
      description:
        "Le Magasin Connecté 4.0 est une plateforme technologique de 150 m² dédiée aux étudiants. Elle accueille plusieurs technologies : internet par la lumière (LiFi), des bornes RFID, un diffuseur de parfum un capteur de CO2, des dalles acoustiques, etc.",
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
      screenshots: [
        {
          src: "screenshots/screenshot_1280x722.png",
          sizes: "1280x722",
          type: "image/png",
          form_factor: "wide",
          label: "Magasin Connecté 4.0",
        },
        {
          src: "screenshots/screenshot2_1280x853.png",
          sizes: "1280x853",
          type: "image/png",
          form_factor: "narrow",
          label: "Magasin Connecté 4.0",
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
