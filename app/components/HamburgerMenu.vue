<script setup>
import { useWebsiteStore } from "../stores/websiteStore";

const websiteStore = useWebsiteStore();
</script>

<template>
  <client-only>
    <Teleport to="#modals">
      <transition
        enter-active-class="transition-transform duration-100 ease-in-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-100 ease-in-out"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div
          v-if="websiteStore.showHamburgerMenu"
          class="fixed top-0 left-0 w-screen h-screen bg-base-100 z-10"
        >
          <div class="relative h-full w-full p-10">
            <button
              type="button"
              @click="websiteStore.toggleHideItem('showHamburgerMenu')"
              class="absolute top-2 right-2 btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
                />
              </svg>
            </button>
            <NavLinks />
          </div>
        </div>
      </transition>
    </Teleport>
  </client-only>
</template>
