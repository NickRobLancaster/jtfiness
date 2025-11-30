<script setup>
import { onClickOutside } from "@vueuse/core";

definePageMeta({
  ssr: true,
  layout: "admin",
});

const showFilters = ref(false);
const filterDropdownRef = ref(null);

onClickOutside(filterDropdownRef, () => {
  showFilters.value = false;
});

const api_store = useApiStore();
//defineRouteRules({
//  prerender: true,
//});

const creating_drug_test = ref({
  _id: "",
  sample_id: "",
  collection_date: "", // date
  street_name: [],
  expected_to_be: [],
  color: "",
  markings: "",
  appearance: [],
  sensations: [],
  route_of_administration: [],
  mass: {
    before_sample: "",
    after_sample: "",
    // difference: "",
    // measured_in_mg: "",
  },
  city: "",
  zip_code: "",
  neighborhood: "",
  collection_organization: "",
  status: "",
  results_data: {
    testing_date: "",
    // category: "",
    pre_screening_results: {
      strips: [
        // { name: "Fentanyl", result: false },
      ],
      reagents: [
        // { reagent_used: "Marquis", color_result: "" },
      ],
    },
    major_identified_substances: [
      // { major_drug: "Heroin", ratio: "", quantitative: "" },
    ],
    //reference to the drugs collection
    trace_identified_substances: [
      // { trace_drug: "Heroin", ratio: "", quantitative: "" },
    ],
    identified_fillers: [
      // { filler: "Lactose", ratio: "", quantitative: "" },
    ],
    // gcms_graph: "", they asked to deprecate
    //file upload and reference array
    raw_gcms_data: [
      // { name: "", file_name: "", file_path: "", file_type: "", file_url: "", file_size: "" },
    ],
    lab_comments: "",
  },
});

const handle_shower = (mode) => {
  api_store.show_modal("show_create_drug_test");
  api_store.drug_test_create_or_edit_mode = mode;
  api_store.drug_test_edit_mode = "test";
  if (mode === "create") {
    reset_form();
    creating_drug_test.value.status = "Waiting for Return";
  }
};

const creating_drug_test_batch = ref({
  number_of_tests: null,
  collection_organization: "",
  batch_name: "",
});

const reset_form = () => {
  creating_drug_test.value = {
    _id: "",
    sample_id: "",
    collection_date: "", // date
    street_name: [],
    expected_to_be: [],
    color: "",
    markings: "",
    appearance: [],
    sensations: [],
    route_of_administration: [],
    mass: {
      before_sample: "",
      after_sample: "",
      // difference: "",
      // measured_in_mg: "",
    },
    city: "",
    zip_code: "",
    neighborhood: "",
    collection_organization: "",
    status: "",
    results_data: {
      testing_date: "",
      // category: "",
      pre_screening_results: {
        strips: [
          // { name: "Fentanyl", result: false },
        ],
        reagents: [
          // { reagent_used: "Marquis", color_result: "" },
        ],
      },
      major_identified_substances: [
        // { major_drug: "Heroin", ratio: "", quantitative: "" },
      ],
      //reference to the drugs collection
      trace_identified_substances: [
        // { trace_drug: "Heroin", ratio: "", quantitative: "" },
      ],
      identified_fillers: [
        // { filler: "Lactose", ratio: "", quantitative: "" },
      ],
      // gcms_graph: "", //they asked to deprecate
      //file upload and reference array
      raw_gcms_data: [
        // { name: "", file_name: "", file_path: "", file_type: "", file_url: "", file_size: "" },
      ],
      lab_comments: "",
    },
  };
};

const submit_create_drug_test_batch = async () => {
  console.log(
    "ATTEMPTING TO CREATE DRUG TEST BATCH: ",
    creating_drug_test_batch.value
  );

  try {
    const data = await $fetch("/api/drug-tests/batch", {
      method: "POST",
      body: creating_drug_test_batch.value,
    });

    console.log("CREATED DRUG TEST BATCH RESPONSE: ", data.created_drug_tests);
    console.log("BATCHED LABELS: ", data.labels);

    //TODO - generate the avery labels and download instantly
    api_store.labels_to_generate = data.labels;

    if (data?.status === "error") {
      console.error("DrugTest batch creation failed:", data.error);
      api_store.create_toast({
        title: "Error",
        message: "DrugTest batch was not created.",
        color: "bg-orange-500",
      });
      return;
    }

    console.log(
      "DrugTest batch created successfully, displaying success toast."
    );
    api_store.create_toast({
      title: `Success`,
      message: "DrugTest batch has been created.",
      color: "bg-emerald-500",
    });

    // reset the form
    creating_drug_test_batch.value = {
      number_of_tests: null,
      collection_organization: "",
      batch_name: "",
    };

    // close the modal
    api_store.hide_modal("show_create_drug_test_batch");

    // fetch the drug_tests again
    await fetch_drug_tests();
  } catch (err) {
    console.error("Unexpected error:", err);
    api_store.create_toast({
      title: "Error",
      message: "Unexpected error occurred. Please try again.",
      color: "bg-red-500",
    });
  }
};

const submit_create_drug_test = async () => {
  console.log("ATTEMPTING TO CREATE DRUG TEST: ", creating_drug_test.value);

  delete creating_drug_test.value._id;
  delete creating_drug_test.value.sample_id;

  // if the collection_organization is empty, delete it - throws errors
  if (
    creating_drug_test.value.collection_organization === "" ||
    creating_drug_test.value.collection_organization === null ||
    creating_drug_test.value.collection_organization === undefined
  ) {
    console.log("Deleting Collection Organization");
    delete creating_drug_test.value.collection_organization;
  }

  try {
    const data = await $fetch("/api/drug-tests/create", {
      method: "POST",
      body: creating_drug_test.value,
    });

    console.log("CREATED DRUG TEST RESPONSE: ", data);

    if (data?.status === "error") {
      console.error("DrugTest creation failed:", data.error);
      api_store.create_toast({
        title: "Error",
        message: "DrugTest was not created.",
        color: "bg-orange-500",
      });
      return;
    }

    console.log("DrugTest created successfully, displaying success toast.");
    api_store.create_toast({
      title: `Success`,
      message: "DrugTest has been created.",
      color: "bg-emerald-500",
    });

    // reset the form
    reset_form();

    // close the modal
    api_store.hide_modal("show_create_drug_test");

    // fetch the drug_tests again
    await fetch_drug_tests();
  } catch (err) {
    console.error("Unexpected error:", err);
    api_store.create_toast({
      title: "Error",
      message: "Unexpected error occurred. Please try again.",
      color: "bg-red-500",
    });
  }
};

// TODO: need to slice out the appropriate selected edit data and send to backend using update $set

const handle_edit_test = async ({ row, id }) => {
  console.log("EDITING DRUG TEST: ", id);
  api_store.drug_test_create_or_edit_mode = "edit";
  api_store.drug_test_edit_mode = "test";

  try {
    const data = await $fetch(`/api/drug-tests/${id}`, {
      method: "GET",
    });

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

    // Ensure date fields are formatted properly
    const formatDate = (dateString) => {
      if (!dateString) return ""; // Ensure it handles null/undefined gracefully
      const date = new Date(dateString);
      return date.toISOString().split("T")[0]; // Format as "yyyy-MM-dd"
    };

    const oneDrugTest = {
      ...data.one_drug_test,
      collection_date: formatDate(data.one_drug_test.collection_date),
      results_data: {
        ...data.one_drug_test.results_data,
        testing_date: formatDate(data.one_drug_test.results_data?.testing_date),
      },
    };

    creating_drug_test.value = oneDrugTest;

    api_store.show_modal("show_create_drug_test");
  } catch (err) {
    console.error("Unexpected error:", err);
    api_store.create_toast({
      title: "Error",
      message: "Unexpected error occurred: " + err,
      color: "bg-red-500",
    });
  }
};

const handle_edit_result = async ({ row, id }) => {
  console.log("EDITING DRUG TEST: ", id);
  api_store.drug_test_create_or_edit_mode = "edit";
  api_store.drug_test_edit_mode = "result";

  try {
    const data = await $fetch(`/api/drug-tests/${id}`, {
      method: "GET",
    });

    console.log("EDIT DRUG TEST RESULT RESPONSE: ", data);

    if (data?.status === "error") {
      console.error(data.error);
      api_store.create_toast({
        title: "Error",
        message: data.error,
        color: "bg-orange-500",
      });
      return;
    }

    // Ensure date fields are formatted properly
    const formatDate = (dateString) => {
      if (!dateString) return ""; // Ensure it handles null/undefined gracefully
      const date = new Date(dateString);
      return date.toISOString().split("T")[0]; // Format as "yyyy-MM-dd"
    };

    const oneDrugTest = {
      ...data.one_drug_test,
      collection_date: formatDate(data.one_drug_test.collection_date),
      results_data: {
        ...data.one_drug_test.results_data,
        testing_date: formatDate(data.one_drug_test.results_data?.testing_date),
      },
    };

    creating_drug_test.value = oneDrugTest;

    api_store.show_modal("show_create_drug_test");
  } catch (err) {
    console.error("Unexpected error:", err);
    api_store.create_toast({
      title: "Error",
      message: "Unexpected error occurred: " + err,
      color: "bg-red-500",
    });
  }
};

const submit_update_drug_test = async () => {
  console.log("ATTEMPTING TO UPDATE DRUG TEST: ", creating_drug_test.value);

  const id = creating_drug_test.value._id;

  // delete the sample_id to prevent it from being updated
  delete creating_drug_test.value.sample_id;

  //delete the results_data object - save only the test data
  delete creating_drug_test.value.results_data;

  // if the collection_organization is empty, delete it - throws errors
  if (
    creating_drug_test.value.collection_organization === "" ||
    creating_drug_test.value.collection_organization === null ||
    creating_drug_test.value.collection_organization === undefined
  ) {
    delete creating_drug_test.value.collection_organization;
  }

  try {
    const data = await $fetch(`/api/drug-tests/${id}`, {
      method: "PUT",
      body: creating_drug_test.value,
    });

    console.log("UPDATED DRUG TEST RESPONSE: ", data);

    if (data?.status === "error") {
      console.error("DrugTest update failed:", data.error);
      api_store.create_toast({
        title: "Error",
        message: "DrugTest was not updated.",
        color: "bg-orange-500",
      });
      return;
    }

    console.log("DrugTest updated successfully, displaying success toast.");
    api_store.create_toast({
      title: `Success`,
      message: "DrugTest has been updated.",
      color: "bg-emerald-500",
    });

    // reset the form
    reset_form();

    // close the modal
    api_store.hide_modal("show_create_drug_test");

    // fetch the drug_tests again
    await fetch_drug_tests();
  } catch (err) {
    console.error("Unexpected error:", err);
    api_store.create_toast({
      title: "Error",
      message: "Unexpected error occurred. Please try again.",
      color: "bg-red-500",
    });
  }
};

const submit_update_drug_test_results = async () => {
  console.log("ATTEMPTING TO UPDATE DRUG TEST: ", creating_drug_test.value);

  const id = creating_drug_test.value._id;
  delete creating_drug_test.value.sample_id;
  // delete creating_drug_test.value.results_data.raw_gcms_data; // this is handled by the upload file component

  try {
    const data = await $fetch(`/api/drug-tests/${id}`, {
      method: "PUT",
      body: {
        status: creating_drug_test.value.status,
        results_data: creating_drug_test.value.results_data,
      },
    });

    console.log("UPDATED DRUG TEST RESULTS RESPONSE: ", data);

    if (data?.status === "error") {
      console.error("DrugTest update failed:", data.error);
      api_store.create_toast({
        title: "Error",
        message: "DrugTest was not updated.",
        color: "bg-orange-500",
      });
      return;
    }

    console.log("DrugTest updated successfully, displaying success toast.");
    api_store.create_toast({
      title: `Success`,
      message: "DrugTest has been updated.",
      color: "bg-emerald-500",
    });

    // reset the form
    reset_form();

    // close the modal
    api_store.hide_modal("show_create_drug_test");

    // fetch the drug_tests again
    await fetch_drug_tests();
  } catch (err) {
    console.error("Unexpected error:", err);
    api_store.create_toast({
      title: "Error",
      message: "Unexpected error occurred. Please try again.",
      color: "bg-red-500",
    });
  }
};

const handle_delete = async (drug_test_id) => {
  const id = drug_test_id;
  try {
    const data = await $fetch(`/api/drug-tests/${id}`, {
      method: "DELETE",
    });

    console.log("DELETE DRUG TEST RESPONSE: ", data);

    if (data?.status === "error") {
      console.error("DrugTest deletion failed:", data.error);
      api_store.create_toast({
        title: "Error",
        message: "DrugTest was not deleted.",
        color: "bg-orange-500",
      });
      return;
    }

    console.log("DrugTest deleted successfully, displaying success toast.");
    api_store.create_toast({
      title: `Success`,
      message: "DrugTest has been deleted.",
      color: "bg-emerald-500",
    });

    // fetch the drug_tests again
    await fetch_drug_tests();
  } catch (err) {
    console.error("Unexpected error:", err);
    api_store.create_toast({
      title: "Error",
      message: "Unexpected error occurred. Please try again.",
      color: "bg-red-500",
    });
  }
};

const drug_tests_table = useState("drug_tests_table", () => []);

const organizations_dropdown_list = useState(
  "organizations_dropdown_list",
  () => []
);

const fetch_organizations = async () => {
  try {
    const response = await $fetch("/api/organizations/list", {
      method: "GET",
    });

    console.log("ORGANIZATIONS RETURNED: ", response.organizations);

    organizations_dropdown_list.value = response.organizations.map((org) => {
      return {
        value: org._id,
        label: org.name,
      };
    });
  } catch (err) {
    console.error("Unexpected error:", err);

    if (import.meta.client) {
      alert("An unexpected error occurred:", err);
    }
  }
};

const drugs_dropdown_list = ref([]);

const fetch_drugs = async () => {
  try {
    const data = await $fetch("/api/drugs/list", {
      method: "GET",
    });

    console.log("DRUGS RETURNED: ", data.drugs_list);

    const value_label_list = data.drugs_list.map((drug) => {
      return {
        value: drug._id,
        label: drug.drug,
      };
    });

    console.log("VALUE LABEL LIST: ", value_label_list);

    drugs_dropdown_list.value = value_label_list;

    console.log("DRUGS DROPDOWN LIST: ", drugs_dropdown_list.value);
  } catch (err) {
    console.error("Unexpected error:", err);

    if (import.meta.client) {
      alert("An unexpected error occurred.: ", err);
    }
  }
};

const fetch_drug_tests = async () => {
  try {
    const data = await $fetch("/api/drug-tests/list", {
      method: "GET",
      params: {
        query: queryObject.value, // send the whole object as a single "query" param
        page: page.value || api_store.table_pagination_settings?.page,
        limit: limit.value || api_store.table_pagination_settings?.limit,
      },
    });

    console.log("DRUG-TESTS RETURNED: ", data.drug_tests);
    drug_tests_table.value = data.drug_tests;
    total_count.value = data.total_count;
  } catch (err) {
    console.error("Unexpected error:", err);
    if (import.meta.client) {
      alert("An unexpected error occurred: ", err);
    }
  }
};

//computed function that returns the drug test table data filtered by status
// const filtered_drug_tests = computed(() => {
//   if (api_store.drug_test_filter === "All") {
//     return drug_tests_table.value;
//   } else if (api_store.drug_test_filter === "Waiting for Return") {
//     return drug_tests_table.value.filter((drug_test) => {
//       return drug_test.status === "Waiting for Return";
//     });
//   } else if (api_store.drug_test_filter === "Processing") {
//     return drug_tests_table.value.filter((drug_test) => {
//       return drug_test.status === "Processing";
//     });
//   } else if (api_store.drug_test_filter === "Complete") {
//     return drug_tests_table.value.filter((drug_test) => {
//       return drug_test.status === "Complete";
//     });
//   } else if (api_store.drug_test_filter === "Abandoned") {
//     return drug_tests_table.value.filter((drug_test) => {
//       return drug_test.status === "Abandoned";
//     });
//   }
// });

onMounted(async () => {
  await fetch_drug_tests();
  await fetch_drugs();
  await fetch_organizations();
});

const major_columns = ref([
  {
    key: "major_drug",
    label: "Major Drug",
    type: "select",
    enable_add_new_option: false,
    enable_add_new_option: false,
    options: drugs_dropdown_list,
    validation: {
      required: true,
    },
  },

  {
    key: "ratio",
    label: "Ratio",
    type: "text",
    validation: {
      required: true,
    },
  },
  {
    key: "quantitative",
    label: "Quantitative",
    type: "text",
    validation: {
      required: true,
    },
  },
]);

const strips_columns = ref([
  {
    key: "name",
    label: "Name",
    type: "select",
    enable_add_new_option: true,
    options: [
      { value: "Fentanyl", label: "Fentanyl" },
      { value: "Heroin", label: "Heroin" },
    ],
    validation: {
      required: true,
    },
  },
  {
    key: "result",
    label: "Result",
    type: "select",
    enable_add_new_option: false,
    options: [
      { value: true, label: "Positive" },
      { value: false, label: "Negative" },
    ],

    validation: {
      required: true,
    },
  },
]);

const reagents_columns = ref([
  {
    key: "reagent_used",
    label: "Reagent Used",
    type: "select",
    enable_add_new_option: true,
    options: [
      { value: "Marquis", label: "Marquis" },
      { value: "Mecke", label: "Mecke" },
      { value: "Mandelin", label: "Mandelin" },
      { value: "Simon's", label: "Simon's" },
    ],
    validation: {
      required: true,
    },
  },
  {
    key: "color_result",
    label: "Color Result",
    type: "text",
    validation: {
      required: true,
    },
  },
]);

const trace_columns = ref([
  {
    key: "trace_drug",
    label: "Trace Drug",
    type: "select",
    enable_add_new_option: false,
    options: drugs_dropdown_list,
    validation: {
      required: true,
    },
  },
  // deprecated per request edif
  // {
  //   key: "ratio",
  //   label: "Ratio",
  //   type: "text",
  //   validation: {
  //     required: false,
  //   },
  // },
  // {
  //   key: "quantitative",
  //   label: "Quantitative",
  //   type: "text",
  //   validation: {
  //     required: true,
  //   },
  // },
]);

const fillers_columns = ref([
  {
    key: "filler",
    label: "Filler",
    type: "select",
    enable_add_new_option: true,
    options: [
      { value: null, label: "Choose an option", attrs: { disabled: true } },
      { value: "Lactose", label: "Lactose" },
      { value: "Mannitol", label: "Mannitol" },
      { value: "Inositol", label: "Inositol" },
      { value: "Dextrose", label: "Dextrose" },
    ],
    validation: {
      required: true,
    },
  },
  {
    key: "ratio",
    label: "Ratio",
    type: "text",
    validation: {
      required: false,
    },
  },
  {
    key: "quantitative",
    label: "Quantitative",
    type: "text",
    validation: {
      required: false,
    },
  },
]);

const queryObject = ref({});

const page = ref(api_store.table_pagination_settings?.page || 1);
const limit = ref(api_store.table_pagination_settings?.limit || 20); // default items per page
const total_count = ref(0);

watch([page, limit, queryObject], fetch_drug_tests, { immediate: true });
</script>

<template>
  <div class="bg-base-300 flex flex-col gap-3 flex-auto min-h-0 min-w-0">
    <div
      class="flex flex-row p-3 gap-3 bg-base-100 items-center w-full max-sm:overflow-x-auto"
    >
      <client-only>
        <!-- <button
          @click="api_store.drug_test_filter = 'All'"
          :class="[
            'btn max-sm:btn-sm',
            api_store.drug_test_filter === 'All'
              ? 'bg-primary text-base-content hover:bg-primary'
              : '',
          ]"
        >
          All
        </button>
        <button
          @click="api_store.drug_test_filter = 'Waiting for Return'"
          :class="[
            'btn max-sm:btn-sm',
            api_store.drug_test_filter === 'Waiting for Return'
              ? 'bg-primary text-base-content hover:bg-primary'
              : '',
          ]"
        >
          Waiting For Return
        </button>
        <button
          @click="api_store.drug_test_filter = 'Processing'"
          :class="[
            'btn max-sm:btn-sm',
            api_store.drug_test_filter === 'Processing'
              ? 'bg-primary text-base-content hover:bg-primary'
              : '',
          ]"
        >
          Processing
        </button>
        <button
          @click="api_store.drug_test_filter = 'Complete'"
          :class="[
            'btn max-sm:btn-sm',
            api_store.drug_test_filter === 'Complete'
              ? 'bg-primary text-base-content hover:bg-primary'
              : '',
          ]"
        >
          Complete
        </button>
        <button
          @click="api_store.drug_test_filter = 'Abandoned'"
          :class="[
            'btn max-sm:btn-sm',
            api_store.drug_test_filter === 'Abandoned'
              ? 'bg-primary text-base-content hover:bg-primary'
              : '',
          ]"
        >
          Abandoned
        </button> -->
        <!-- {{ queryObject }} -->
        <div class="relative" ref="filterDropdownRef">
          <button
            class="btn btn-outline btn-sm md:btn-md"
            @click="showFilters = !showFilters"
          >
            <span>Filters</span>
            <svg
              class="ml-2 transition-transform"
              :class="{ 'rotate-180': showFilters }"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M7 10l5 5 5-5z" />
            </svg>
          </button>

          <transition name="fade">
            <div
              v-if="showFilters"
              class="absolute z-50 top-full mt-2 w-[90vw] sm:w-[600px] max-h-[70vh] overflow-auto bg-base-100 border border-base-300 rounded-lg shadow-lg p-4"
            >
              <DrugTestsQueryBuilder @update:query="(q) => (queryObject = q)" />
            </div>
          </transition>
        </div>
      </client-only>

      <ExportCSV :data="drug_tests_table" dataset="Drug Tests" />

      <XModal shower="show_create_drug_test_batch">
        <template #open-button>
          <button
            v-if="
              api_store?.session?.role === 'admin' ||
              api_store?.session?.role === 'super'
            "
            @click="api_store.show_modal('show_create_drug_test_batch')"
            class="btn max-sm:btn-sm btn-info text-base-content"
          >
            <span class="mr-2">
              <span> Create Batch </span>
            </span>
            <svg
              xmlns="http://www.w3.org/
              2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21"
              />
            </svg>
          </button>
        </template>
        <template #body>
          <FormKit
            id="create-drug-test-batch-form"
            type="form"
            incomplete-message="Please review the form and complete the required fields."
            incomplete-messages-class="text-base-content font-semibold"
            @submit="submit_create_drug_test_batch"
            form-class="w-full flex flex-col gap-5 p-5 rounded-xl bg-base-100 shadow-md"
            wrapper-class="w-full max-w-full"
            :actions="true"
            :submit-attrs="{
              inputClass: 'bg-blue-500 p-3 rounded w-full text-base-content ',
              wrapperClass: '',
              'data-theme': `dark`,
              help: '',
              ignore: false,
            }"
          >
            <template #default="{ state }">
              <div class="flex flex-row items-center justify-between">
                <h1 class="text-xl capitalize">Create Drug Tests Batch</h1>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormKit
                  message-class="text-base-content"
                  type="text"
                  name="batch_name"
                  number
                  label="Batch Name"
                  validation="required"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_drug_test_batch.batch_name"
                />

                <!-- FORMKIT number field - max 1000 / min 2 -->
                <FormKit
                  message-class="text-base-content"
                  type="number"
                  name="number_of_tests"
                  number
                  label="Number of Tests"
                  validation="required|min:2|max:100"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_drug_test_batch.number_of_tests"
                />

                <FormKit
                  message-class="text-base-content"
                  type="select"
                  name="collection_organization"
                  label="Collection Organization"
                  validation="required"
                  :options="[
                    {
                      label: 'Select Organization',
                      value: '',
                    },
                    ...organizations_dropdown_list,
                  ]"
                  wrapper-class="$reset w-full"
                  :input-class="`select select-bordered w-full`"
                  v-model="creating_drug_test_batch.collection_organization"
                />
              </div>
            </template>
          </FormKit>
        </template>
      </XModal>

      <XModal shower="show_create_drug_test">
        <template #open-button>
          <button
            v-if="
              api_store?.session?.role === 'admin' ||
              api_store?.session?.role === 'super'
            "
            @click="handle_shower('create')"
            class="btn max-sm:btn-sm btn-info text-base-content"
          >
            <span class="mr-2">
              <span> Create Drug Test </span>
            </span>
            <svg
              xmlns="http://www.w3.org/
              2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21"
              />
            </svg>
          </button>
        </template>
        <template #body>
          <FormKit
            id="create-drug-test-form"
            type="form"
            incomplete-message="Please review the form and complete the required fields."
            incomplete-messages-class="text-base-content font-semibold"
            @submit="
              api_store.drug_test_create_or_edit_mode === 'create'
                ? submit_create_drug_test()
                : api_store.drug_test_edit_mode === 'test'
                ? submit_update_drug_test()
                : submit_update_drug_test_results()
            "
            form-class="w-full flex flex-col gap-5 p-5 rounded-xl bg-base-100 shadow-md"
            wrapper-class="w-full max-w-full"
            :actions="true"
            :submit-attrs="{
              inputClass: 'bg-blue-500 p-3 rounded w-full text-base-content ',
              wrapperClass: '',
              'data-theme': `dark`,
              help: '',
              ignore: false,
            }"
          >
            <template #default="{ state }">
              <div class="flex flex-row items-center justify-between">
                <h1 class="text-xl capitalize">
                  {{ api_store.drug_test_create_or_edit_mode }} Drug
                  {{ api_store.drug_test_edit_mode }}
                  <!-- -
                  {{ api_store.drug_test_create_or_edit_mode }}-
                  {{ api_store.drug_test_edit_mode }} -->
                </h1>
                <!-- pill options - Test, Results -->
              </div>
              <div
                v-if="api_store.drug_test_edit_mode === 'test'"
                class="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <FormKit
                  message-class="text-base-content"
                  type="select"
                  name="status"
                  label="Status"
                  :options="[
                    {
                      value: 'Waiting for Return',
                      label: 'Waiting for Return',
                    },
                    { value: 'Processing', label: 'Processing' },
                    { value: 'Complete', label: 'Complete' },
                    { value: 'Abandoned', label: 'Abandoned' },
                  ]"
                  wrapper-class="$reset w-full"
                  :input-class="`select select-bordered w-full`"
                  v-model="creating_drug_test.status"
                />

                <FormKit
                  message-class="text-base-content"
                  type="date"
                  label="Collection Date"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_drug_test.collection_date"
                />

                <FormKit
                  message-class="text-base-content"
                  type="text"
                  name="color"
                  label="Color"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_drug_test.color"
                />

                <FormKit
                  message-class="text-base-content"
                  type="text"
                  name="city"
                  label="City"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_drug_test.city"
                />

                <FormKit
                  message-class="text-base-content"
                  type="text"
                  name="zip_code"
                  label="Zip Code"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_drug_test.zip_code"
                />

                <FormKit
                  message-class="text-base-content"
                  type="text"
                  name="neighborhood"
                  label="Neighborhood"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_drug_test.neighborhood"
                />

                <FormKit
                  message-class="text-base-content"
                  type="select"
                  name="collection_organization"
                  label="Collection Organization"
                  :options="[
                    {
                      label: 'Select Organization',
                      value: '',
                    },
                    ...organizations_dropdown_list,
                  ]"
                  wrapper-class="$reset w-full"
                  :input-class="`select select-bordered w-full`"
                  v-model="creating_drug_test.collection_organization"
                />

                <FormKit
                  message-class="text-base-content"
                  type="textarea"
                  rows="4"
                  name="markings"
                  label="Markings"
                  outer-class="$reset w-full col-span-1 md:col-span-2"
                  wrapper-class="$reset w-full"
                  :input-class="`textarea textarea-bordered w-full`"
                  v-model="creating_drug_test.markings"
                />

                <div
                  class="border rounded-lg border-base-300 col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 p-3"
                >
                  <h1 class="text-xl mb-2 col-span-1 md:col-span-2">Mass</h1>

                  <FormKit
                    message-class="text-base-content"
                    type="text"
                    name="before_sample"
                    label="Before Sample"
                    wrapper-class="$reset w-full"
                    :input-class="`input input-bordered w-full`"
                    v-model="creating_drug_test.mass.before_sample"
                  />

                  <FormKit
                    message-class="text-base-content"
                    type="text"
                    name="after_sample"
                    label="After Sample"
                    wrapper-class="$reset w-full"
                    :input-class="`input input-bordered w-full`"
                    v-model="creating_drug_test.mass.after_sample"
                  />

                  <!-- <FormKit
                    message-class="text-base-content"
                    type="text"
                    name="difference"
                    label="Difference"
                    disabled
                    wrapper-class="$reset w-full"
                    :input-class="`input input-bordered w-full`"
                    :value="Number(creating_drug_test.mass.difference)"
                  /> -->

                  <div class="flex flex-col gap-2">
                    <label for="">Calculated Difference</label>
                    <p
                      class="input input-bordered flex flex-row items-center opacity-50 cursor-not-allowed"
                    >
                      {{
                        creating_drug_test.mass.before_sample -
                        creating_drug_test.mass.after_sample
                      }}
                    </p>
                  </div>

                  <!-- <FormKit
                    message-class="text-base-content"
                    type="text"
                    name="measured_in_mg"
                    label="Measured In MG"
                    wrapper-class="$reset w-full"
                    :input-class="`input input-bordered w-full`"
                    v-model="creating_drug_test.mass.measured_in_mg"
                  /> -->
                </div>

                <XMultiSelect
                  v-model="creating_drug_test.expected_to_be"
                  fieldLabel="Expected to Be"
                  validationRulesString=""
                  :selectOptions="[
                    { label: 'Dope', value: 'Dope' },
                    { label: 'White Pill', value: 'White Pill' },
                    { label: 'Meth', value: 'Meth' },
                    { label: 'm30', value: 'm30' },
                    { label: 'Unknown', value: 'Unknown' },
                  ]"
                ></XMultiSelect>

                <XMultiSelect
                  v-model="creating_drug_test.street_name"
                  fieldLabel="Street Name"
                  validationRulesString=""
                  :selectOptions="[
                    { label: 'Heroin', value: 'Heroin' },
                    { label: 'Fentanyl', value: 'Fentanyl' },
                    { label: 'Xylazine', value: 'Xylazine' },
                    { label: 'M30', value: 'M30' },
                    { label: 'Nitazene', value: 'Nitazene' },
                    { label: 'Cocaine', value: 'Cocaine' },
                    {
                      label: 'Crack(Freebase Cocaine)',
                      value: 'Crack(Freebase Cocaine)',
                    },
                    { label: 'Methamphetamine', value: 'Methamphetamine' },
                    { label: 'Ketamine', value: 'Ketamine' },
                    { label: 'Benzo', value: 'Benzo' },
                    { label: 'MDMA/Ecstasy', value: 'MDMA/Ecstasy' },
                    { label: 'PCP', value: 'PCP' },
                    { label: 'THC/Cannabis', value: 'THC/Cannabis' },
                  ]"
                ></XMultiSelect>

                <XMultiSelect
                  v-model="creating_drug_test.appearance"
                  fieldLabel="Appearance"
                  validationRulesString=""
                  :selectOptions="[
                    { label: 'Crystals', value: 'Crystals' },
                    { label: 'Prescription Pill', value: 'Prescription Pill' },
                    { label: 'Fake Pill', value: 'Fake Pill' },
                    { label: 'Powder Chunky', value: 'Powder Chunky' },
                    { label: 'Powder Fluffy', value: 'Powder Fluffy' },
                    { label: 'Powder Flaky', value: 'Powder Flaky' },
                    { label: 'Powder Shiny', value: 'Powder Shiny' },
                    { label: 'Powder Dull', value: 'Powder Dull' },
                    { label: 'Oil/Wax', value: 'Oil/Wax' },
                    { label: 'Tar', value: 'Tar' },
                    { label: 'Liquid', value: 'Liquid' },
                  ]"
                ></XMultiSelect>

                <XMultiSelect
                  v-model="creating_drug_test.sensations"
                  fieldLabel="Sensations"
                  validationRulesString=""
                  :selectOptions="[
                    { label: 'Normal', value: 'Normal' },
                    { label: 'Weaker', value: 'Weaker' },
                    { label: 'Stronger', value: 'Stronger' },
                    { label: 'Longer', value: 'Longer' },
                    { label: 'Shorter', value: 'Shorter' },
                    { label: 'Fast', value: 'Fast' },
                    { label: 'Slow', value: 'Slow' },
                    { label: 'More up', value: 'More up' },
                    { label: 'More down', value: 'More down' },
                    { label: 'Unusual Taste', value: 'Unusual Taste' },
                    { label: 'Unusual Smell', value: 'Unusual Smell' },
                    { label: 'Weird', value: 'Weird' },
                    { label: 'Hallucinations', value: 'Hallucinations' },
                    { label: 'Sedating', value: 'Sedating' },
                    { label: 'Dizzy', value: 'Dizzy' },
                    { label: 'Pulsing/WaWa', value: 'Pulsing/WaWa' },
                    { label: 'Burning', value: 'Burning' },
                    { label: 'Itchy', value: 'Itchy' },
                    { label: 'Pins and Needles', value: 'Pins and Needles' },
                    { label: 'Stomach/Bathroom', value: 'Stomach/Bathroom' },
                  ]"
                ></XMultiSelect>

                <XMultiSelect
                  v-model="creating_drug_test.route_of_administration"
                  fieldLabel="Route of Administration"
                  :canWriteIn="false"
                  validationRulesString=""
                  :selectOptions="[
                    { label: 'Oral', value: 'Oral' },
                    { label: 'Sublingual', value: 'Sublingual' },
                    { label: 'Smoke', value: 'Smoke' },
                    { label: 'Nasal', value: 'Nasal' },
                    { label: 'Rectum', value: 'Rectum' },
                    { label: 'Injection', value: 'Injection' },
                  ]"
                ></XMultiSelect>
              </div>

              <div
                v-if="api_store.drug_test_edit_mode === 'result'"
                class="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <FormKit
                  v-if="api_store.drug_test_create_or_edit_mode !== 'create'"
                  message-class="text-base-content"
                  type="text"
                  name="record_id"
                  label="Record ID"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full cursor-not-allowed cursor-disabled pointer-events-none bg-gray-800`"
                  v-model="creating_drug_test._id"
                />

                <FormKit
                  v-if="api_store.drug_test_create_or_edit_mode !== 'create'"
                  message-class="text-base-content"
                  type="text"
                  name="sample_id"
                  label="Sample ID"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full cursor-not-allowed cursor-disabled pointer-events-none bg-gray-800`"
                  v-model="creating_drug_test.sample_id"
                />

                <FormKit
                  message-class="text-base-content"
                  type="select"
                  name="status"
                  label="Status"
                  :options="[
                    {
                      value: 'Waiting for Return',
                      label: 'Waiting for Return',
                    },
                    { value: 'Processing', label: 'Processing' },
                    { value: 'Complete', label: 'Complete' },
                    { value: 'Abandoned', label: 'Abandoned' },
                  ]"
                  wrapper-class="$reset w-full"
                  :input-class="`select select-bordered w-full`"
                  v-model="creating_drug_test.status"
                />
                <FormKit
                  type="date"
                  message-class="text-base-content"
                  label="Testing Date"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_drug_test.results_data.testing_date"
                />

                <div
                  class="border rounded-lg border-base-300 col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 p-3"
                >
                  <h1 class="text-xl mb-2 col-span-1 md:col-span-2">Strips</h1>

                  <div class="col-span-1 md:col-span-2">
                    <XTableInput
                      key_prefix="strips"
                      v-model="
                        creating_drug_test.results_data.pre_screening_results
                          .strips
                      "
                      label="Strips"
                      :columns="strips_columns"
                    />
                  </div>
                </div>

                <div
                  class="border rounded-lg border-base-300 col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 p-3"
                >
                  <h1 class="text-xl mb-2 col-span-1 md:col-span-2">
                    Reagents
                  </h1>

                  <div class="col-span-1 md:col-span-2">
                    <XTableInput
                      key_prefix="reagents"
                      v-model="
                        creating_drug_test.results_data.pre_screening_results
                          .reagents
                      "
                      label="Reagents"
                      :columns="reagents_columns"
                    />
                  </div>
                </div>
                <div
                  class="border rounded-lg border-base-300 col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 p-3"
                >
                  <h1 class="text-xl mb-2 col-span-1 md:col-span-2">
                    Major Identified Substances

                    <!-- {{ major_columns.options }} -->
                  </h1>

                  <div class="col-span-1 md:col-span-2">
                    <XTableInput
                      key_prefix="major"
                      v-model="
                        creating_drug_test.results_data
                          .major_identified_substances
                      "
                      label="Major Identified Substances"
                      :columns="major_columns"
                    />
                  </div>
                </div>
                <div
                  class="border rounded-lg border-base-300 col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 p-3"
                >
                  <h1 class="text-xl mb-2 col-span-1 md:col-span-2">
                    Trace Identified Substances
                  </h1>

                  <div class="col-span-1 md:col-span-2">
                    <XTableInput
                      key_prefix="trace"
                      v-model="
                        creating_drug_test.results_data
                          .trace_identified_substances
                      "
                      label="Trace Identified Substances"
                      :columns="trace_columns"
                    />
                  </div>
                </div>
                <div
                  class="border rounded-lg border-base-300 col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 p-3"
                >
                  <h1 class="text-xl mb-2 col-span-1 md:col-span-2">
                    Identified Fillers
                  </h1>

                  <div class="col-span-1 md:col-span-2">
                    <XTableInput
                      key_prefix="filler"
                      v-model="
                        creating_drug_test.results_data.identified_fillers
                      "
                      label="Trace Identified Substances"
                      :columns="fillers_columns"
                    />
                  </div>
                </div>

                <!-- they asked to depricate -->
                <!-- <FormKit
                  type="textarea"
                  rows="4"
                  name="gcms_graph"
                  label="GCMS Graph"
                  outer-class="$reset w-full col-span-1 md:col-span-2"
                  wrapper-class="$reset w-full"
                  :input-class="`textarea textarea-bordered w-full`"
                  v-model="creating_drug_test.results_data.gcms_graph"
                /> -->

                <FormKit
                  type="textarea"
                  rows="4"
                  name="lab_comments"
                  label="Lab Comments"
                  outer-class="$reset w-full col-span-1 md:col-span-2"
                  wrapper-class="$reset w-full"
                  :input-class="`textarea textarea-bordered w-full`"
                  v-model="creating_drug_test.results_data.lab_comments"
                />

                <!-- <pre>
                  {{ drugs_dropdown_list }}
                </pre> -->
                <div class="col-span-1 md:col-span-2">
                  <XFileUpload
                    :document-object-id="creating_drug_test?._id"
                    :existing-files="
                      creating_drug_test.results_data?.raw_gcms_data
                    "
                    v-model="creating_drug_test.results_data.raw_gcms_data"
                  ></XFileUpload>
                </div>
              </div>
              <!-- <pre>
                    {{ { ...creating_drug_test, results_data: undefined } }}
                </pre
              > -->

              <!-- <pre>
                  {{ creating_drug_test.results_data }}
                </pre
              > -->
            </template>
          </FormKit>
        </template>
      </XModal>
    </div>

    <div class="w-full flex-auto min-h-0 min-w-0 overflow-auto bg-base-100">
      <!-- <Loading v-if="loading" /> -->
      <XTable
        belongsTo="drug-tests"
        :tableData="drug_tests_table"
        :totalCount="total_count"
        @editTest="handle_edit_test"
        @editResult="handle_edit_result"
        @delete="handle_delete"
        @update:page="page = $event"
        @update:limit="limit = $event"
      ></XTable>
    </div>
  </div>
</template>
