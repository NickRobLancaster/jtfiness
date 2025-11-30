<script setup>
import { ref } from "vue";

const api_store = useApiStore();
</script>

<template>
  <client-only>
    <Teleport to="#toasts">
      <transition-group
        tag="div"
        class="flex flex-col space-y-2"
        enter-active-class="transition ease-out duration-200"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-for="(item, index) in api_store?.toasts"
          v-if="api_store?.toasts?.length > 0"
          @click="api_store?.delete_toast(index)"
          :key="item.key"
          class="fixed top-3 right-3 h-16 rounded flex flex-row overflow-clip cursor-pointer shadow-lg z-80"
        >
          <div
            class="w-16 bg-white flex flex-row items-center justify-center text-base-content"
          >
            <!-- Font Awesome info icon -->
            <span class="rounded-full" :class="item.color">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"
                />
              </svg>
            </span>
          </div>

          <div
            class="flex-1 flex flex-col justify-center px-4"
            :class="item.color"
          >
            <!-- title -->
            <div class="text-base font-bold text-center text-base-content">
              {{ item.title }}
            </div>

            <!-- message -->
            <div class="text-base-content text-sm">
              {{ item.message }}
            </div>
          </div>
        </div>
      </transition-group>
    </Teleport>
  </client-only>
</template>
