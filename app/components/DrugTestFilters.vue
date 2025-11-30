<script setup>
const website_store = useWebsiteStore();

const today = new Date();
const startDate = ref(""); // Format: YYYY-MM-DD

const endDate = ref(
  (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Use browser locale for formatting (YYYY-MM-DD)
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  })()
);
const records = ref([]);
const page = ref(1);
const total = ref(0);

// Filters
const staticFilters = {
  "Fake Pill": { appearance: { $in: ["Fake Pill"] } },
  Stimulant: { categories_of_drug: { $in: ["Stimulant"] } },
  "Depressant/Tranquilizer": {
    categories_of_drug: { $in: ["Depressant/Tranquilizer"] },
  },
  Opioid: { categories_of_drug: { $in: ["Opioid"] } },
  Amphetamine: { categories_of_drug: { $in: ["Amphetamine"] } },
  Psychedelic: { categories_of_drug: { $in: ["Psychedelic"] } },
  Benzo: { categories_of_drug: { $in: ["Benzo"] } },
  Nitazene: { categories_of_drug: { $in: ["Nitazene"] } },
  Tomidine: { categories_of_drug: { $in: ["Tomidine"] } },
};

// Dynamic drug picklist
const drugButtons = ref([]);

onMounted(async () => {
  try {
    const drugs = await $fetch("/api/drugs/picklist");
    drugButtons.value = drugs.records.map((drug) => ({
      label: drug.drug,
      id: drug._id,
    }));
  } catch (err) {
    console.error("❌ Failed to load drug picklist:", err);
  }
});

async function runFilter(filterObj) {
  try {
    const encoded = encodeURIComponent(JSON.stringify(filterObj));
    const response = await $fetch(
      `/api/drug-tests/list-public?query=${encoded}&page=${page.value}`
    );

    console.log("✅ Filtered results:", response);
    records.value = response.records;
    total.value = response.total;

    website_store.filtered_drug_tests = records.value;
  } catch (err) {
    console.error("❌ Failed to fetch filtered results:", err);
  }
}

// Automatically trigger fetch when both dates are set
watch([startDate, endDate], () => {
  if (startDate.value && endDate.value) {
    const dateQuery = {
      created_at: {
        $gte: startDate.value,
        $lte: endDate.value,
      },
    };
    runFilter(dateQuery);
  }
});

const minEndDate = computed(() => {
  if (!startDate.value) return "";
  const date = new Date(startDate.value);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
});

function resetFilters() {
  startDate.value = "";
  endDate.value = "";
  page.value = 1;

  // fetch unfiltered results (no query param)
  $fetch(`/api/drug-tests/list-public?page=${page.value}`)
    .then((response) => {
      records.value = response.records;
      total.value = response.total;
      website_store.filtered_drug_tests = records.value;
    })
    .catch((err) => {
      console.error("❌ Failed to reset filters:", err);
    });
}

const selectedStaticFilter = ref(null);
const selectedDrugFilter = ref(null);

function handleStaticFilterClick(label, filter) {
  selectedStaticFilter.value = label;
  selectedDrugFilter.value = null;
  runFilter(filter);
}

function handleDrugFilterClick(id) {
  selectedDrugFilter.value = id;
  selectedStaticFilter.value = null;
  runFilter({ major_drugs_only: { $in: [id] } });
}
</script>

<template>
  <div
    class="md:fixed md:bottom-0 md:h-[calc(100vh-70px)] md:overflow-y-auto md:left-0 md:w-66 w-72 max-sm:h-[610px] overflow-y-auto mx-auto p-6 bg-gray-900 text-base-content rounded-xl shadow"
  >
    <!-- Date Range -->
    <!-- <div class="mb-6 flex flex-row justify-end"></div> -->
    <div>
      <div class="flex flex-row items-center mb-4">
        <h2 class="text-lg font-semibold mb-2 text-base-content text-left">
          <span> Search </span>
        </h2>

        <button
          class="ml-auto btn btn-sm rounded-lg bg-orange-800 hover:bg-orange-700 border border-base-300 text-base-content"
          @click="resetFilters"
        >
          Clear All
        </button>
      </div>
      <div class="flex flex-col gap-4 max-sm:overflow-x-auto pb-2">
        <SearchDrugTests />
      </div>
      <div class="flex flex-row items-center mb-4">
        <h2 class="text-lg font-semibold mb-2 text-base-content text-left">
          <span> Date Range </span>
        </h2>
      </div>
      <div class="flex flex-col gap-4 max-sm:overflow-x-auto pb-2">
        <FormKit
          type="date"
          v-model="startDate"
          label="Start Date"
          outer-class="md:w-full text-left"
          input-class="w-full p-1 rounded-lg bg-gray-800 border border-base-300 text-base-content"
        />
        <FormKit
          v-if="startDate !== ''"
          type="date"
          v-model="endDate"
          label="End Date"
          :min="minEndDate"
          outer-class="md:w-full text-left"
          input-class="w-full p-1 rounded-lg bg-gray-800 border border-base-300 text-base-content"
        />
      </div>
    </div>

    <!-- Category Buttons -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2 text-base-content text-left">
        Categories
      </h2>
      <div
        class="flex flex-row md:flex-col gap-3 overflow-x-auto pb-2 scroll-smooth"
      >
        <button
          v-for="(filter, label) in staticFilters"
          :key="label"
          class="btn btn-sm rounded-lg border text-base-content whitespace-nowrap transition"
          :class="{
            'bg-teal-700 border-base-300 ring-2 ring-teal-300':
              selectedStaticFilter === label,
            'bg-gray-800 hover:bg-gray-700 border-base-300':
              selectedStaticFilter !== label,
          }"
          @click="handleStaticFilterClick(label, filter)"
        >
          {{ label }}
        </button>
      </div>
    </div>

    <!-- Specific Drug Buttons -->
    <div>
      <h2 class="text-lg font-semibold mb-2 text-base-content text-left">
        Specific Drugs
      </h2>
      <div
        class="flex flex-row md:flex-col gap-3 overflow-x-auto pb-2 scroll-smooth"
      >
        <button
          v-for="drug in drugButtons"
          :key="drug.id"
          class="btn btn-sm rounded-lg border text-base-content whitespace-nowrap transition"
          :class="{
            'bg-teal-700 border-base-300 ring-2 ring-teal-300':
              selectedDrugFilter === drug.id,
            'bg-gray-800 hover:bg-gray-700 border-base-300':
              selectedDrugFilter !== drug.id,
          }"
          @click="handleDrugFilterClick(drug.id)"
        >
          {{ drug.label }}
        </button>
      </div>
    </div>
  </div>
</template>
