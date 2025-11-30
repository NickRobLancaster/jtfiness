<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div
    class="max-sm:hidden bg-gray-400 py-[3px] px-2 capitalize text-base-content rounded"
  >
    {{ route.name === "index" ? "home" : route.name }}
  </div>
</template>
