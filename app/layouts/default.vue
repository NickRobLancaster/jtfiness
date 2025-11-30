<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
</script>

<template>
  <div class="">
    <div class="fixed top-0 left-0 w-full">
      <!-- nav -->
      <Navigation />

      <div class="flex flex-row items-center p-2">
        <!-- current path -->
        <!-- <Breadcrumbs class="" /> -->
        <ContactBar class="ml-auto" />
      </div>
    </div>

    <!-- slot to receive the page -->
    <slot />

    <!-- footer -->
    <FooterSection />
  </div>
</template>
