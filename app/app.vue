<script setup>
//import the apiStore
const api_store = useApiStore();

onMounted(() => {
  // Load theme from localStorage
  const savedTheme = localStorage.getItem("theme") || "dark";
  api_store.selected_theme = savedTheme;
  document.documentElement.setAttribute("data-theme", savedTheme);
});
</script>

<template>
  <div class="">
    <!-- the dynamic nuxt page -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- TELEPORTS HERE -->

    <div id="toasts"></div>

    <div id="modals"></div>

    <!-- Toasts -->
    <ToastNotification />
    <Translator />
    <!-- the loading bar -->
    <LoadingBorder />

    <!-- USEFUL FOR TEMPLATE - NEW CLIENTS CAN CHOOSE a Theme -->
    <!-- <div class="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-3">
      <ThemeSwitcher />
    </div> -->
  </div>
</template>
