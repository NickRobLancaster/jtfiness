<template>
  <div class="w-full mx-auto">
    <div class="flex flex-row">
      <FormKit
        type="text"
        v-model="search"
        name="search"
        placeholder="Search by Zip or City"
        @keyup.enter="handleSearch"
        outer-class="md:w-full text-left"
        input-class="w-full p-1 rounded-l bg-gray-800 border border-base-300
 text-base-content"
      />

      <button
        @click="handleSearch"
        class="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-base-content rounded-r shadow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </button>
    </div>

    <div v-if="loading" class="mt-4 text-center text-base-content">
      Searching...
    </div>
  </div>
</template>

<script setup>
const website_store = useWebsiteStore();

const search = ref("");
const results = ref([]);
const loading = ref(false);

async function handleSearch() {
  if (!search.value.trim()) return;
  loading.value = true;

  try {
    const data = await $fetch("/api/drug-tests/list-public-search", {
      params: { search_string: search.value },
    });
    website_store.filtered_drug_tests = data.records || [];
    results.value = data.records || [];
  } catch (err) {
    console.error("🔍 Search failed:", err);
    results.value = [];
  } finally {
    loading.value = false;
    search.value = "";
  }
}
</script>
