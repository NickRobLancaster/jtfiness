<script setup>
import { useWebsiteStore } from "../stores/websiteStore";

const websiteStore = useWebsiteStore();
</script>

<template>
  <div class="sticky top-0 w-full z-50">
    <nav class="flex flex-row items-center flex-wrap bg-base-300 p-3 gap-5">
      <!-- company logo -->
      <div class="hover:bg-gray-200 p-2 rounded">
        <nuxt-link to="/" class="">
          <!-- <img src="/images/placeholder_logo.png" alt="logo" class="w-52" /> -->
          <h1 class="text-2xl font-bold">JT Fitness</h1>
        </nuxt-link>
      </div>

      <div class="flex flex-row gap-5 ml-auto">
        <div class="max-md:hidden">
          <NavLinks />
        </div>

        <!-- this gets teleported to modals layer -->
        <HamburgerMenu />

        <button
          type="button"
          @click="websiteStore.toggleShowItem('showHamburgerMenu')"
          class="md:hidden btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 14 14"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 2H.5m13 5H.5m13 5H.5"
            />
          </svg>
        </button>
      </div>
    </nav>
  </div>
</template>
