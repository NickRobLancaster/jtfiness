<script setup>
import { ref } from "vue";

import { useApiStore } from "../stores/apiStore";
const api_store = useApiStore();

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
          v-if="api_store[props.shower]"
          @click.self="api_store.hide_modal(props.shower)"
          class="fixed top-0 left-0 w-screen h-screen backdrop-brightness-50 z-50 max-w-screen max-h-screen flex flex-col"
        ></div>
      </transition>

      <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <div
          v-if="api_store[props.shower]"
          class="fixed top-0 right-0 h-screen w-screen md:w-1/2 bg-base-100 z-60"
        >
          <div class="flex flex-col gap-2 p-5 h-full w-full overflow-auto">
            <slot name="body">
              <!-- body content here -->
            </slot>

            <div class="flex flex-row items-center justify-between mt-auto">
              <button
                @click="api_store.hide_modal(props.shower)"
                class="btn btn-block btn-neutral"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </client-only>
</template>
