<script setup>
definePageMeta({
  ssr: true,
  title: "Substance Catelog",
  meta: [
    {
      name: "description",
      content: "Substance Catelog",
    },
  ],
});

import { useWebsiteStore } from "../stores/websiteStore";

const websiteStore = useWebsiteStore();

//defineRouteRules({
//  prerender: true,
//});
</script>

<template>
  <div
    class="w-screen min-h-screen flex flex-col items-center justify-center p-10 py-32 text-center"
  >
    <div class="flex flex-col w-full justify-center space-y-8">
      <h1 class="text-4xl font-bold">Substance Catelog</h1>
      <p class="text-lg">
        Explore comprehensive public substance tests and their results
      </p>

      <div class="flex flex-row items-start">
        <XListLinks2
          :navUrl="'/results'"
          :title="'Substance Catelog'"
          :description="'Substance Catelog'"
          :fetchUrl="'/api/drugs/list-public'"
        />
      </div>
    </div>
  </div>
</template>
