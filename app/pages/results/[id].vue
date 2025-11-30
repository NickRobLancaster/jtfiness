<script setup>
definePageMeta({
  ssr: true,
  layout: "default",
});

const api_store = useApiStore();
const website_store = useWebsiteStore();

const loading = ref(true);

const route = useRoute();
const id = route.params.id; // "456"

// Ensure date fields are formatted properly
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Format as "yyyy-MM-dd"
};

const drug_test_results = ref(null);

const fetch_sample_results = async (id) => {
  console.log("EDITING DRUG TEST: ", id);

  try {
    const data = await $fetch(`/api/drug-tests/results/${id}`, {
      method: "GET",
    });

    loading.value = false;

    console.log("EDIT DRUG TEST RESPONSE: ", data);

    if (data?.status === "error") {
      console.error(data.error);
      api_store.create_toast({
        title: "Error",
        message: data.error,
        color: "bg-orange-500",
      });
      return;
    }

    drug_test_results.value = data.one_drug_test;
  } catch (err) {
    console.error("Unexpected error:", err);
    api_store.create_toast({
      title: "Error",
      message: "Unexpected error occurred: " + err,
      color: "bg-red-500",
    });
  }
};

onMounted(async () => {
  await fetch_sample_results(id);
});
</script>

<template>
  <!-- Main container with a dark background and light text -->
  <div
    class="w-full min-h-screen bg-gray-900 text-base-content px-4 md:px-8 py-14"
  >
    <div class="flex flex-col">
      <!-- Loading state -->

      <div
        v-if="loading"
        class="flex flex-col items-center justify-center min-h-screen"
      >
        <div class="flex flex-row items-center justify-center gap-4">
          <Loading />
          <span class="text-2xl font-semibold"> Loading... </span>
        </div>
      </div>

      <!-- If no drug test found -->
      <div
        v-else-if="drug_test_results === null"
        class="flex flex-col items-center justify-center min-h-screen gap-6"
      >
        <nuxt-link
          to="/check-results"
          class="btn bg-gray-800 hover:bg-gray-700 text-base-content px-6 py-2 rounded shadow"
        >
          Search Another
        </nuxt-link>
        <div class="bg-red-600 text-base-content p-5 rounded-lg shadow-md">
          There isn't a test that exists with that ID
        </div>
      </div>

      <!-- Waiting for Return -->
      <div
        v-else-if="drug_test_results.status === 'Waiting for Return'"
        class="flex flex-col items-center justify-center min-h-screen gap-6"
      >
        <nuxt-link
          to="/check-results"
          class="btn bg-gray-800 hover:bg-gray-700 text-base-content px-6 py-2 rounded shadow"
        >
          Search Another
        </nuxt-link>
        <div class="bg-purple-600 text-base-content p-5 rounded-lg shadow-md">
          This Test is Still Waiting to be Returned to the Lab
        </div>
      </div>

      <!-- Processing -->
      <div
        v-else-if="drug_test_results.status === 'Processing'"
        class="flex flex-col items-center justify-center min-h-screen gap-6"
      >
        <nuxt-link
          to="/check-results"
          class="btn bg-gray-800 hover:bg-gray-700 text-base-content px-6 py-2 rounded shadow"
        >
          Search Another
        </nuxt-link>
        <div class="bg-orange-600 text-base-content p-5 rounded-lg shadow-md">
          This Test is Still Being Processed
        </div>
      </div>

      <!-- Complete Results -->
      <div
        v-else-if="drug_test_results.status === 'Complete'"
        class="flex flex-col-reverse md:flex-row gap-8 py-12"
      >
        <!-- Left panel (details) -->
        <div
          class="container mx-auto w-full flex-col gap-6 flex bg-gray-800 p-6 rounded shadow-md max-w-3xl"
        >
          <h1 class="text-3xl font-bold mb-2 break-words">
            Sample #{{ drug_test_results?.sample_id }}
          </h1>

          <!-- Sample Details -->
          <div>
            <h2 class="text-2xl font-semibold mb-2">Sample Details</h2>
            <div class="flex flex-col gap-2 border border-base-300 rounded p-4">
              <p class="text-base">
                <span class="font-semibold">Street Name(s):</span>
                {{ drug_test_results?.street_name.join(", ") }}
              </p>
              <p class="text-base">
                <span class="font-semibold">Collection Date:</span>
                {{
                  drug_test_results?.collection_date
                    ? formatDate(drug_test_results?.collection_date)
                    : "N/A"
                }}
              </p>
              <p class="text-base">
                <span class="font-semibold">Results Posted Date:</span>
                {{
                  drug_test_results?.results_data?.testing_date
                    ? formatDate(drug_test_results?.results_data?.testing_date)
                    : "N/A"
                }}
              </p>
            </div>
          </div>

          <!-- Location -->
          <div>
            <h2 class="text-2xl font-semibold mb-2 mt-4">Location</h2>
            <div class="flex flex-col gap-2 border border-base-300 rounded p-4">
              <p class="text-base">
                <span class="font-semibold">Zip Code:</span>
                {{ drug_test_results?.zip_code }}
              </p>
              <p class="text-base">
                <span class="font-semibold">City:</span>
                {{ drug_test_results?.city }}
              </p>
            </div>
          </div>

          <!-- Description of Sample -->
          <div>
            <h2 class="text-2xl font-semibold mb-2 mt-4">
              Description of Sample
            </h2>
            <div class="flex flex-col gap-2 border border-base-300 rounded p-4">
              <p class="text-base">
                <span class="font-semibold">Expected to be:</span>
                {{ drug_test_results?.expected_to_be?.join(", ") }}
              </p>
              <p class="text-base">
                <span class="font-semibold">Color:</span>
                {{ drug_test_results?.color }}
              </p>
              <p class="text-base">
                <span class="font-semibold">Markings:</span>
                {{ drug_test_results?.markings }}
              </p>
              <p class="text-base">
                <span class="font-semibold">Appearance:</span>
                {{ drug_test_results?.appearance?.join(", ") }}
              </p>
              <p class="text-base">
                <span class="font-semibold">Sensations:</span>
                {{ drug_test_results?.sensations?.join(", ") }}
              </p>
            </div>
          </div>

          <!-- Pre-Screening -->
          <div>
            <h2 class="text-2xl font-semibold mb-2 mt-4">Pre-Screening</h2>
            <div class="flex flex-col gap-4 border border-base-300 rounded p-4">
              <!-- Test Strips -->
              <div>
                <p class="text-lg font-semibold mb-2">Test Strips:</p>
                <div
                  v-if="
                    drug_test_results?.results_data?.pre_screening_results
                      ?.strips?.length === 0
                  "
                  class="bg-orange-600 p-2 rounded text-base-content"
                >
                  No Test Strips Used
                </div>
                <div v-else class="overflow-x-auto">
                  <table class="table-auto w-full text-sm">
                    <thead class="bg-gray-700 text-base-content">
                      <tr>
                        <th class="px-4 py-2 text-left">Strip Name</th>
                        <th class="px-4 py-2 text-left">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="strip in drug_test_results?.results_data
                          ?.pre_screening_results?.strips"
                        :key="strip.name"
                        class="border border-base-300"
                      >
                        <td class="px-4 py-2">{{ strip?.name }}</td>
                        <td class="px-4 py-2">
                          {{ strip?.result ? "Positive" : "Negative" }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Reagents -->
              <div>
                <p class="text-lg font-semibold mb-2">Reagents:</p>
                <div
                  v-if="
                    drug_test_results?.results_data?.pre_screening_results
                      ?.reagents?.length === 0
                  "
                  class="bg-orange-600 p-2 rounded text-base-content"
                >
                  No Reagents Used
                </div>
                <div v-else class="overflow-x-auto">
                  <table class="table-auto w-full text-sm">
                    <thead class="bg-gray-700 text-base-content">
                      <tr>
                        <th class="px-4 py-2 text-left">Reagent Used</th>
                        <th class="px-4 py-2 text-left">Color Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="reagent in drug_test_results?.results_data
                          ?.pre_screening_results?.reagents"
                        :key="reagent?.reagent_used"
                        class="border border-base-300"
                      >
                        <td class="px-4 py-2">{{ reagent?.reagent_used }}</td>
                        <td class="px-4 py-2">{{ reagent?.color_result }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Results -->
          <div>
            <h2 class="text-2xl font-semibold mb-2 mt-4">Lab Results</h2>
            <div class="flex flex-col gap-4 border border-base-300 rounded p-4">
              <!-- Major Substances -->
              <div>
                <p class="text-lg font-semibold mb-2">
                  Major Substances Detected:
                </p>
                <div
                  v-if="
                    drug_test_results?.results_data?.major_identified_substances
                      ?.length === 0
                  "
                  class="bg-orange-600 p-2 rounded text-base-content"
                >
                  No Major Substances Detected
                </div>
                <div v-else class="overflow-x-auto">
                  <table class="table-auto w-full text-sm">
                    <thead class="bg-gray-700 text-base-content">
                      <tr>
                        <th class="px-4 py-2 text-left">Drug</th>
                        <th class="px-4 py-2 text-left">Ratio</th>
                        <th class="px-4 py-2 text-left">Quantitative</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="substance in drug_test_results?.results_data
                          ?.major_identified_substances"
                        :key="substance?.major_drug?.drug"
                        class="border border-base-300"
                      >
                        <td class="px-4 py-2">
                          <div
                            v-tippy="substance?.major_drug?.drug_information"
                            class="hover:underline cursor-pointer"
                          >
                            {{ substance?.major_drug?.drug }}
                          </div>
                        </td>
                        <td class="px-4 py-2">{{ substance?.ratio }}</td>
                        <td class="px-4 py-2">{{ substance?.quantitative }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Trace Substances -->
              <div>
                <p class="text-lg font-semibold mb-2">
                  Trace Substances Detected:
                </p>
                <div
                  v-if="
                    drug_test_results?.results_data?.trace_identified_substances
                      ?.length === 0
                  "
                  class="bg-orange-600 p-2 rounded text-base-content"
                >
                  No Trace Substances Detected
                </div>
                <div v-else class="overflow-x-auto">
                  <table class="table-auto w-full text-sm">
                    <thead class="bg-gray-700 text-base-content">
                      <tr>
                        <th class="px-4 py-2 text-left">Drug</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="substance in drug_test_results?.results_data
                          ?.trace_identified_substances"
                        :key="substance?.trace_drug?.drug"
                        class="border border-base-300"
                      >
                        <td class="px-4 py-2">
                          <div
                            v-tippy="substance?.trace_drug?.drug_information"
                            class="hover:underline cursor-pointer"
                          >
                            {{ substance?.trace_drug?.drug }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Lab Comments -->
              <div>
                <p class="text-lg font-semibold mb-2">Lab Comments:</p>
                <p class="bg-gray-700 p-3 rounded text-base-content">
                  {{ drug_test_results?.results_data?.lab_comments }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NuxtLoadingIndicator />
    </div>
  </div>
</template>
