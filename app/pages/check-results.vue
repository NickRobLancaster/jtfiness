<script setup>
import { ref, watch } from "vue";
// If you have a separate file exporting useRouter(), import from '#imports' in Nuxt 3
// e.g. import { useRouter } from '#imports';

definePageMeta({
  ssr: true,
  title: "Check Results",
  meta: [
    {
      name: "description",
      content: "Check drug test results",
    },
  ],
  layout: "public-no-footer",
});

// Nuxt 3 Composition API router
const router = useRouter();

// The sample ID the user enters
const sample_id = ref("");

// Watch for changes in sample_id and remove all hyphens as the user types
watch(sample_id, (newVal) => {
  const noHyphens = newVal.replace(/-/g, "");
  if (noHyphens !== newVal) {
    sample_id.value = noHyphens;
  }
});

// Navigate to /results/<sample_id>
const lookup_results = async () => {
  router.push({
    path: `results/${sample_id.value}`,
  });
};
</script>

<template>
  <div
    class="w-screen min-h-screen flex flex-col items-center justify-center p-5 py-32 text-center"
  >
    <div
      class="flex flex-col items-center justify-center space-y-5 w-full md:w-64 lg:w-xl xl:w-2xl mx-auto"
    >
      <h1 id="check-results-header" class="text-4xl font-bold">
        Check Results
      </h1>
      <p class="text-lg">
        Here you can check your results by plugging in your Kit Sample ID
        provided when you dropped off the kit for testing. Use the filters to
        search the all public drug tests.
      </p>

      <div class="flex flex-row items-start">
        <FormKit
          message-class="text-base-content"
          type="text"
          name="Sample ID"
          placeholder="Enter Kit Sample ID"
          help-class="text-xs"
          :validation="[
            ['length', 9],
            ['matches', /^[a-zA-Z0-9]{9}$/],
          ]"
          :validation-messages="{
            length: 'The value must be exactly 9 characters long',
            matches: 'Only letters and numbers are allowed',
          }"
          wrapper-class="$reset w-full"
          :input-class="`input input-bordered rounded-r-none w-full`"
          v-model="sample_id"
        />
        <button
          @click="
            sample_id.length !== 9 || sample_id.includes('-')
              ? null
              : lookup_results()
          "
          :class="`${
            sample_id.length !== 9 || sample_id.includes('-')
              ? 'btn bg-gray-500 cursor-not-allowed'
              : 'btn btn-accent'
          }`"
          class="rounded-l-none text-base-content"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z"
            />
          </svg>
        </button>
      </div>

      <div class="relative flex flex-col md:flex-row items-start">
        <div class="flex flex-col">
          <DrugTestFilters />
        </div>

        <XListLinks
          :navUrl="'/results'"
          :title="'Drug Test Results'"
          :description="'Drug Test Results'"
          :fetchUrl="'/api/drug-tests/list-public'"
        />
      </div>
    </div>
  </div>
</template>
