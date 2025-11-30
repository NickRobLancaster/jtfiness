<!-- components/PaginatedList.vue -->
<script setup>
import { ref, computed, watch } from "vue";
import { useFetch } from "#app";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  navUrl: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const currentPage = ref(1);
const pageSize = 10;

const data = ref(null);
const pending = ref(false);

const refresh = async () => {
  pending.value = true;
  try {
    const response = await $fetch("/api/drugs/list-public", {
      query: { page: currentPage.value },
    });
    console.log("Fetched data FRONT FACING:", response);
    data.value = response;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    pending.value = false;
  }
};

refresh();

const records = computed(() => data.value || []);
const totalPages = computed(() =>
  Math.ceil((data.value?.total || 0) / pageSize)
);

watch(currentPage, () => refresh());

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const goToRecord = (sample_id) => {
  //   const id = sample_id;
  //   router.push(`${props.navUrl}/${id}`);

  console.log("Nothing happens yet");
};
</script>

<template>
  <div
    class="w-full max-w-6xl mx-auto p-6 bg-gray-900 text-base-content text-left"
  >
    <div class="flex items-center gap-5 mb-4">
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <div
          class="px-4 py-2 bg-sky-600 text-base-content text-sm font-medium rounded-lg shadow-md"
        >
          <span class="block text-lg font-bold">{{ data?.total }}</span>
          <span class="text-xs uppercase tracking-wide"
            >Total Substance Records</span
          >
        </div>
        <div
          class="px-4 py-2 bg-purple-600 text-base-content text-sm font-medium rounded-lg shadow-md"
        >
          <span class="block text-lg font-bold">{{
            data?.records?.length
          }}</span>
          <span class="text-xs uppercase tracking-wide">Records This Page</span>
        </div>
      </div>
    </div>
    <div
      v-if="pending"
      class="text-center py-10 text-base-content w-52 h-52 mx-auto"
    >
      <Loading />
    </div>

    <div v-else>
      <div class="flex items-center justify-end gap-4 mt-10 text-base-content">
        <button
          @click="goToPage(1)"
          :disabled="currentPage === 1"
          class="p-2 disabled:opacity-30 hover:text-base-content transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
        </button>

        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="p-2 disabled:opacity-30 hover:text-base-content transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <span class="text-sm text-base-content">
          Page
          <span class="text-base-content font-semibold">{{ currentPage }}</span>
          of
          <span class="text-base-content font-semibold">{{ totalPages }}</span>
        </span>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="p-2 disabled:opacity-30 hover:text-base-content transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <button
          @click="goToPage(totalPages)"
          :disabled="currentPage === totalPages"
          class="p-2 disabled:opacity-30 hover:text-base-content transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- Stacked list of cards instead of a grid -->
      <div class="flex flex-col gap-6">
        <div
          v-for="(item, index) in data.records"
          :key="item._id"
          @click="goToRecord(item._id)"
          class="p-5 bg-gray-800 hover:bg-gray-700 border border-base-300 rounded-xl cursor-pointer transition duration-150 shadow-md grid grid-cols-1 md:grid-cols-4 items-start justify-between gap-3"
        >
          <div
            class="text-lg font-semibold mb-1 flex flex-row items-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <!-- Icon from Game Icons by GameIcons - https://github.com/game-icons/icons/blob/master/license.txt -->
              <path
                fill="currentColor"
                d="M254.97 34.75c-30.48-.167-59.02 22.12-79.532 62.156c-.075.146-.176.26-.25.406L43.063 326.783l-.22.343C18.5 365.413 13.377 401.515 28.47 428.03c15.08 26.498 48.627 40.126 93.5 37.908h265.093c44.887 2.227 78.445-11.404 93.53-37.907c15.09-26.51 9.956-62.595-14.375-100.874l-.22-.375L335.28 98.064c-.06-.12-.124-.225-.186-.344c-20.948-40.263-49.626-62.803-80.125-62.97zm.06 18.844c13.576.13 26.453 6.93 38.126 18.343c11.606 11.347 22.554 27.453 33.406 48.344c.063.122.125.224.188.345l115.22 201.563c.033.053.058.102.092.156l.125.22c12.92 20.274 21.395 38.06 25.282 53.967c3.91 16.01 3.063 30.648-3.845 42.408s-19.222 19.533-34.78 23.906c-15.444 4.34-34.508 5.656-57.408 4.5H137.625c-24.845 1.258-44.73-.32-60.405-5.125c-15.78-4.84-27.68-13.45-33.72-25.69c-6.04-12.237-5.862-26.797-1.5-42.436c4.333-15.535 12.815-32.608 24.875-51.53l.22-.377L183.562 120c.08-.157.17-.28.25-.438C194.51 98.644 205.32 82.6 216.875 71.376c11.642-11.307 24.58-17.913 38.156-17.78zm47.657 62.093l-28.53 224.032h-41.844L204.438 120.5a293 293 0 0 0-4.22 7.97l-.093.218l-.125.218l-116.938 202.97l-.093.187l-.126.187C71.28 350.346 63.598 366.226 60 379.125s-3.108 22.322.25 29.125s9.925 12.28 22.47 16.125c12.542 3.845 30.67 5.547 54.405 4.313l.25-.032h234.313l.25.03c21.85 1.138 39.308-.28 51.875-3.81c12.566-3.533 19.822-8.827 23.687-15.407s4.978-15.545 1.813-28.5c-3.166-12.958-10.732-29.374-23.094-48.72l-.126-.188l-.125-.218l-115.658-202.28l-.093-.158l-.064-.187c-2.5-4.828-4.99-9.326-7.47-13.532zM231.28 361.875h43.907v43.906H231.28z"
              />
            </svg>
            <span class="text-base-content">{{ item.drug || "N/A" }}</span>
          </div>

          <div
            v-if="item.categories_of_drug?.length > 0"
            class="text-sm text-base-content mb-2"
          >
            Categories of Drug
            <ul class="list-disc pl-8 space-y-1 text-left p-3">
              <li
                v-for="(category, subIndex) in item.categories_of_drug"
                :key="subIndex"
                class="text-base-content font-medium"
              >
                {{ category }}
              </li>
            </ul>
          </div>

          <div
            v-if="item.categories_of_drug?.length > 0"
            class="text-sm text-base-content mb-2"
          >
            Street Name(s)
            <ul class="list-disc pl-8 space-y-1 text-left p-3">
              <li
                v-for="(street_name, subIndex) in item.alternative_names"
                :key="subIndex"
                class="text-base-content font-medium"
              >
                {{ street_name }}
              </li>
            </ul>
          </div>

          <!-- Created At -->
          <div class="text-sm text-base-content mb-2">
            📅 Created: {{ new Date(item.created_at).toLocaleString() }}
          </div>

          <!-- drug_information - string -->
          <div
            v-if="item.drug_information"
            class="text-sm text-base-content mb-2 md:col-span-4"
          >
            Drug Information:
            <span class="text-base-content font-medium">
              {{ item.drug_information }}
            </span>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-end gap-4 mt-10 text-base-content">
        <button
          @click="goToPage(1)"
          :disabled="currentPage === 1"
          class="p-2 disabled:opacity-30 hover:text-base-content transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
        </button>

        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="p-2 disabled:opacity-30 hover:text-base-content transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <span class="text-sm text-base-content">
          Page
          <span class="text-base-content font-semibold">{{ currentPage }}</span>
          of
          <span class="text-base-content font-semibold">{{ totalPages }}</span>
        </span>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="p-2 disabled:opacity-30 hover:text-base-content transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <button
          @click="goToPage(totalPages)"
          :disabled="currentPage === totalPages"
          class="p-2 disabled:opacity-30 hover:text-base-content transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
