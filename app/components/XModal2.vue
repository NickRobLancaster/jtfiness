<script setup>
import { ref } from "vue";

import { useWebsiteStore } from "../stores/websiteStore";
const websiteStore = useWebsiteStore();

const props = defineProps({
  shower: String,
});
</script>

<template>
  <slot name="open-button">
    <!-- toggle button -->
  </slot>

  <client-only>
    <Teleport to="#modals">
      <transition
        enter-active-class="transition-opacity ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-in duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="websiteStore[props.shower]"
          @click.self="websiteStore.toggleHideItem(props.shower)"
          class="fixed top-0 left-0 w-screen h-screen backdrop-brightness-50 z-50 max-w-screen max-h-screen flex flex-col"
        ></div>
      </transition>

      <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="translate-y-[-100%] opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-full opacity-0"
      >
        <div
          v-if="websiteStore[props.shower]"
          class="fixed inset-0 m-auto h-screen w-screen md:h-5/6 md:w-5/6 overflow-auto bg-base-100 z-60 flex items-center justify-center rounded"
        >
          <div class="flex flex-col gap-2 p-5 h-full w-full">
            <slot name="body">
              <!-- body content here -->
            </slot>
          </div>
        </div>
      </transition>
    </Teleport>
  </client-only>
</template>
