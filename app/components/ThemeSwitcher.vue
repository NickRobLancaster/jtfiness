<script setup>
import { ref, onMounted } from "vue";
const api_store = useApiStore();

const themes = [
  "dark",
  "forest",
  "light",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
  "caramellatte",
  "abyss",
  "silk",
]; // List of themes
const selectedTheme = ref(localStorage.getItem("theme") || "dark");

const updateTheme = () => {
  api_store.selected_theme = selectedTheme.value;
  document.documentElement.setAttribute("data-theme", selectedTheme.value);
  localStorage.setItem("theme", selectedTheme.value);
};
</script>

<template>
  <div
    class="bg-gray-50 flex flex-row items-center gap-3 p-2 rounded-xl border border-base-300"
  >
    <label for="theme-selector" class="text-base-content">Theme</label>
    <select
      id="theme-selector"
      v-model="selectedTheme"
      @change="updateTheme"
      class="select w-full max-w-xs text-base-content"
    >
      <option v-for="theme in themes" :key="theme" :value="theme">
        {{ theme }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.label {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
