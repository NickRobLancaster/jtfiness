require("dotenv").config();

export default defineNuxtConfig({
  // css: ["~/assets/css/tailwind.css"],
  css: ["./app/tailwind.css"],

  app: {
    head: {
      htmlAttrs: {
        "data-theme": "dark",
      },
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap",
        },
      ],
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
    "@nuxtjs/google-fonts",
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
