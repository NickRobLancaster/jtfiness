<script setup>
import { ref, watch, onMounted } from "vue";
import { useHead } from "#imports";

// const available_langs = [
//   { value: "en", label: "En" },
//   { value: "es", label: "Es" },
// ];

// const selected_lang = ref("en");

// const set_html_lang = (lang) => {
//   if (import.meta.client) {
//     document.documentElement.setAttribute("lang", lang);
//   }
// };

// const apply_lang = () => {
//   set_html_lang(selected_lang.value);

//   // persist choice
//   if (import.meta.client) {
//     localStorage.setItem("app_lang", selected_lang.value);
//   }

//   // strongest hint to browsers/translate
//   useHead({
//     htmlAttrs: { lang: selected_lang.value },
//     meta: [
//       {
//         key: "content-language",
//         "http-equiv": "Content-Language",
//         content: selected_lang.value,
//       },
//     ],
//   });
// };

// onMounted(() => {
//   // initialize from saved choice or user agent
//   const saved = localStorage.getItem("app_lang");
//   selected_lang.value = saved || navigator.language?.slice(0, 2) || "en";
//   apply_lang();
// });

// watch(selected_lang, apply_lang);
</script>

<template>
  <div
    v-if="false"
    class="fixed bottom-0 left-0 bg-blue-500 rounded-r-full px-2 flex items-center gap-2 p-1 z-50 shadow"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M12 2C6.486 2 2 6.486 2 12c0 5.515 4.486 10 10 10s10-4.485 10-10C22 6.486 17.514 2 12 2zm7.938 9h-3.003a15.92 15.92 0 0 0-1.29-5.033A8.027 8.027 0 0 1 19.938 11zM12 4c1.59 0 3.061 2.138 3.713 5H8.287C8.939 6.138 10.41 4 12 4zM4.062 13h3.003c.293 1.793.83 3.468 1.29 5.033A8.027 8.027 0 0 1 4.062 13zM8.287 13h7.426c-.652 2.862-2.123 5-3.713 5s-3.061-2.138-3.713-5zM16.645 18.033A15.92 15.92 0 0 0 16.935 13h3.003a8.027 8.027 0 0 1-3.293 5.033zM7.355 5.967A15.92 15.92 0 0 0 7.065 11H4.062A8.027 8.027 0 0 1 7.355 5.967z"
      />
    </svg>

    <select
      v-model="selected_lang"
      @change="apply_lang"
      class="rounded-full w-12 h-10 bg-blue-500 text-white border border-white/40 hover:bg-white hover:text-blue-600 cursor-pointer text-sm px-2"
      aria-label="language"
    >
      <option v-for="l in available_langs" :key="l.value" :value="l.value">
        {{ l.label }}
      </option>
    </select>
  </div>
</template>
