<script setup>
import { useRoute } from "vue-router";

import { useApiStore } from "../stores/apiStore";

const api_store = useApiStore();

// Get the current route
const route = useRoute();
</script>

<template>
  <!-- <Testing class="fixed bottom-0 left-0" /> -->
  <div
    class="w-screen h-screen bg-base-300 flex flex-col gap-3 overflow-y-hidden overflow-x-hidden"
  >
    <!-- ADMIN NAV BAR -->
    <div class="bg-base-100 flex flex-row items-center p-3">
      <h1 class="text-xl max-sm:text-base-content">IEHR Admin Dashboard</h1>

      <!-- <SearchTests /> -->

      <div class="ml-auto">
        <XModal shower="show_logout">
          <template #open-button>
            <div
              class="avatar avatar-placeholder ml-auto cursor-pointer"
              @click="api_store.show_modal('show_logout')"
            >
              <div
                class="bg-primary text-base-content max-sm:w-8 w-12 rounded-full"
              >
                <span>
                  {{ api_store.session?.first_name?.[0] }}
                  {{ api_store.session?.last_name?.[0] }}
                </span>
              </div>
            </div>
          </template>

          <template #body>
            <div class="h-full flex flex-col">
              <!-- USER NAME -->
              <div class="p-3 flex flex-row items-center justify-between">
                <h1 class="text-xl">
                  {{
                    api_store.session?.first_name +
                    " " +
                    api_store.session?.last_name
                  }}
                </h1>

                <ThemeSwitcher />

                <div class="flex flex-row gap-5 items-center">
                  <button
                    @click="api_store.logout"
                    class="btn btn-error text-base-content"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="api_store.hide_modal('show_logout')"
                    class="btn btn-neutral btn-circle"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </XModal>
      </div>
    </div>
    <div
      class="bg-base-300 flex flex-col md:flex-row gap-3 flex-auto min-h-0 min-w-0"
    >
      <div
        class="bg-base-100 flex flex-row md:flex-col gap-3 p-3 overflow-x-auto flex-shrink-0"
      >
        <nuxt-link
          to="/admin/dashboard"
          active-class="bg-primary text-base-content hover:bg-primary"
          class="btn max-sm:btn-sm"
        >
          Dashboard
        </nuxt-link>
        <nuxt-link
          to="/admin/users"
          active-class="bg-primary text-base-content hover:bg-primary"
          class="btn max-sm:btn-sm"
        >
          Users
        </nuxt-link>

        <nuxt-link
          to="/admin/organizations"
          active-class="bg-primary text-base-content hover:bg-primary"
          class="btn max-sm:btn-sm"
        >
          Organizations
        </nuxt-link>

        <nuxt-link
          to="/admin/drug-tests"
          active-class="bg-primary text-base-content hover:bg-primary"
          class="btn max-sm:btn-sm"
        >
          Drug Tests
        </nuxt-link>

        <nuxt-link
          to="/admin/drugs"
          active-class="bg-primary text-base-content hover:bg-primary"
          class="btn max-sm:btn-sm"
        >
          Drug Catelog
        </nuxt-link>
      </div>
      <div
        class="flex-auto min-h-0 min-w-0 flex flex-row md:flex-col h-full bg-base-100"
      >
        <!-- slot to receive the page -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>
