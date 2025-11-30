<script setup>
definePageMeta({
  ssr: true,
  title: "Careers",
  meta: [
    {
      name: "description",
      content: "Careers",
    },
  ],
});

//defineRouteRules({
//  prerender: true,
//});
</script>

<template>
  <div
    class="w-screen h-screen flex flex-col items-center justify-center p-10 text-center bg-base-100"
  >
    <div class="flex flex-col items-center justify-center space-y-8">
      <h1 class="text-4xl font-bold">Careers</h1>
      <p class="text-lg">
        This is a Careers page. We are hiring! Check out our open positions
        below.
      </p>
    </div>
  </div>
</template>
