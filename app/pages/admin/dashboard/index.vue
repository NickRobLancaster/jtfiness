<script setup>
definePageMeta({
  ssr: true,
  layout: "admin",
});
//defineRouteRules({
//  prerender: true,
//});

import { useApiStore } from "../stores/apiStore";

const api_store = useApiStore();
</script>

<template>
  <div class="w-full flex-auto min-h-0 min-w-0 overflow-auto bg-base-100">
    <div
      class="flex flex-row p-3 gap-3 bg-base-100 items-center w-full overflow-x-auto"
    >
      <a
        class="btn max-sm:btn-sm btn-info text-base-content ml-auto"
        href="mailto:nick@finnypi.com"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M64 112c-8.8 0-16 7.2-16 16v22.1l172.5 141.6c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16zM48 212.2V384c0 8.8 7.2 16 16 16h384c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0zM0 128c0-35.3 28.7-64 64-64h384c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64z"
          />
        </svg>

        <span> Email Support </span>
      </a>
      <a
        class="btn max-sm:btn-sm btn-error text-base-content"
        href="tel:17143952633"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"
          />
        </svg>
        <span> Call Support </span>
      </a>

      <!-- <XModal shower="show_create_user">
        <template #open-button>
          <button
            @click="api_store.show_modal('show_create_user')"
            class="btn btn-primary text-base-content ml-auto"
          >
            <span class="mr-2">Create User</span>

          </button>
        </template>

        <template #body> body </template>
      </XModal> -->
    </div>

    <div class="w-full flex-auto min-h-0 min-w-0 overflow-auto bg-base-100">
      <div
        class="p-5 bg-neutral rounded flex flex-row justify-center items-center gap-3"
      >
        <h1 class="text-xl">
          <span>
            Welcome to IE Admin Dashboard {{ api_store?.session?.first_name }}
          </span>
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M17 23.025q-.425 0-.712-.3T16 22t.288-.712T17 21q1.65 0 2.825-1.175T21 17q0-.425.3-.725t.725-.3t.713.3t.287.725q0 2.5-1.762 4.263T17 23.025M2 8q-.425 0-.725-.288T.975 7q0-2.5 1.763-4.262T7 .974q.425 0 .725.288t.3.712t-.3.725T7 3Q5.35 3 4.175 4.175T3 7q0 .425-.288.713T2 8m17.225-3.575q.3.3.3.7t-.3.7l-6.35 6.375q-.275.3-.687.288t-.713-.288q-.3-.3-.3-.712t.3-.713l6.35-6.35q.3-.3.7-.3t.7.3M21 7.6q.3.3.3.713t-.3.712l-5.65 5.65q-.275.275-.687.275t-.713-.275q-.3-.3-.312-.712t.287-.713l5.65-5.65q.3-.3.713-.3t.712.3M5.275 18.725Q3 16.45 3 13.25t2.275-5.475l2.3-2.3q.3-.3.7-.3t.7.3l.775.775q.175.175.3.363T10.3 7L14 3.275q.3-.3.713-.3t.712.3t.3.712t-.3.713L11.1 9.025l-2.125 2.1l.475.475q1.15 1.15 1.1 2.75t-1.225 2.775l-.025.025q-.275.275-.687.275T7.9 17.15q-.3-.3-.3-.712t.3-.713q.575-.575.638-1.362T8.025 13L6.85 11.85q-.3-.3-.3-.712t.3-.713l1.425-1.4q.3-.3.3-.713t-.3-.712l-1.6 1.6q-1.7 1.7-1.7 4.063t1.7 4.062t4.075 1.7t4.075-1.7l5.975-6q.3-.3.713-.3t.712.3t.3.713t-.3.712l-6 5.975Q13.95 21 10.75 21t-5.475-2.275m5.475-5.475"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
