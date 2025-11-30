<!-- components/PaginatedList.vue -->
<script setup>
const website_store = useWebsiteStore();
const props = defineProps({
  navUrl: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const currentPage = ref(1);
const pageSize = 9;

const data = ref(website_store.filtered_drug_tests || null);
const pending = ref(false);

const refresh = async () => {
  pending.value = true;
  try {
    const response = await $fetch("/api/drug-tests/list-public", {
      query: { page: currentPage.value },
    });

    console.log("Fetched data FRONT FACING:", response);

    data.value = response;
    website_store.filtered_drug_tests = response.records;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    pending.value = false;
  }
};

refresh();

const records = computed(() => website_store.filtered_drug_tests || []);
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
  const id = sample_id;
  router.push(`${props.navUrl}/${id}`);
};
</script>

<template>
  <div class="w-full max-w-6xl mx-auto p-6 bg-gray-900 text-base-content">
    <div
      v-if="pending"
      class="text-center py-10 text-base-content w-52 h-52 mx-auto"
    >
      <Loading />
    </div>

    <div v-else>
      <!-- <h1 class="text-3xl font-bold mb-4">Recent Tests</h1> -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in records"
          :key="item._id"
          @click="goToRecord(item.sample_id)"
          class="overflow-x-clip p-5 bg-gray-800 hover:bg-gray-700 border border-base-300 rounded-xl cursor-pointer transition duration-150 shadow-md flex flex-col items-start h-full max-h-[400px]"
        >
          <div
            class="text-lg font-semibold mb-1 flex flex-row item-center gap-3"
          >
            <!-- 🧪 Sample: -->
            <span class="text-base-content">{{ item.sample_id || "N/A" }}</span>
          </div>

          <!-- major_identified_substances -->
          <div
            v-if="item.results_data?.major_identified_substances.length > 0"
            class="text-sm text-base-content mb-2"
          >
            <!-- Major Identified Substances: -->
            <div
              class="text-sm text-base-content mb-2 line-clamp-4 max-h-24 overflow-hidden p-3"
            >
              <!-- <span class="block font-medium text-base-content mb-1"
                >Major Identified Substances:</span
              > -->
              <ul class="list-disc pl-5 space-y-1 text-left">
                <li
                  v-for="(substance, index) in item.results_data
                    ?.major_identified_substances || []"
                  :key="index"
                >
                  {{ substance?.major_drug?.drug }}
                </li>
              </ul>
            </div>
          </div>

          <div class="text-sm text-base-content mb-2 flex flex-row gap-3">
            <!-- <span>📅 Created:</span> -->
            <span>
              Created:
              {{ new Date(item.created_at).toLocaleDateString() }}</span
            >
          </div>

          <div class="text-sm font-medium mb-2">
            <span
              class="rounded px-2 py-1 text-base-content"
              :class="{
                'bg-emerald-700': item.status === 'Complete',
                'bg-red-700': item.status === 'Abandoned',
                'bg-yellow-700': item.status === 'Waiting for Return',
              }"
            >
              {{ item.status }}
            </span>
          </div>

          <!-- zip -->
          <div v-if="item.zip_code" class="text-sm text-base-content mb-2">
            Zip Code: {{ item.zip_code || "N/A" }}
          </div>

          <!-- collection_date  -->
          <div class="text-sm text-base-content mb-2">
            Collection Date:
            {{
              item.collection_date
                ? new Date(item.collection_date).toLocaleDateString()
                : "Pending"
            }}
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        class="flex items-center justify-center gap-4 mt-10 text-base-content"
      >
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

    <div v-if="!records.length" class="text-center py-10 text-base-content">
      <p class="text-lg text-base-content">No results found.</p>
    </div>
  </div>
</template>
