require("dotenv").config();

export default defineNuxtConfig({
  // css: ["~/assets/css/tailwind.css"],
  css: ["./app/tailwind.css"],

  app: {
    head: {
      htmlAttrs: {
        "data-theme": "dark",
      },
    },
    pageTransition: false,
    // layoutTransition: { name: "website-layout", mode: "out-in" },
  },

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },

  runtimeConfig: {
    NUXT_ENV: process.env.NUXT_ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    NUXT_MONGO_DB_NAME: process.env.NUXT_MONGO_DB_NAME,
    public: {
      NUXT_ENV: process.env.NUXT_ENV,
    },
  },

  // build: {
  //   analyze: true,
  // },

  compatibilityDate: "2024-10-25",
  devtools: { enabled: true },

  modules: [
    // "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@formkit/nuxt",
    "@nuxt/icon",
    "@vueuse/nuxt",
  ],

  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },

  experimental: {
    inlineRouteRules: true,
    // scanPageMeta: true,
    // emitRouteChunkError: "automatic", // options are: manual / false / automatic
  },

  features: {
    devLogs: false,
  },
});
