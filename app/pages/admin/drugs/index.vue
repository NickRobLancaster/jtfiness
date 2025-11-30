<script setup>
definePageMeta({
  ssr: true,
  layout: "admin",
});

const api_store = useApiStore();

const drug_categories = ref([
  {
    label: "Tentative",
    value: "Tentative",
  },
  {
    label: "Inactive",
    value: "Inactive",
  },
  {
    label: "Unidentified",
    value: "Unidentified",
  },
  {
    label: "Common",
    value: "Common",
  },
  {
    label: "Stimulant",
    value: "Stimulant",
  },
  {
    label: "Depressant/Tranquilizer",
    value: "Depressant/Tranquilizer",
  },
  {
    label: "Hallucinogen",
    value: "Hallucinogen",
  },
  {
    label: "Cannabinoid",
    value: "Cannabinoid",
  },
  {
    label: "Deleriant",
    value: "Deleriant",
  },
  {
    label: "Dissacoiative",
    value: "Dissacoiative",
  },
  {
    label: "Anti-Psychotic",
    value: "Anti-Psychotic",
  },
  {
    label: "Psychedelic",
    value: "Psychedelic",
  },
  {
    label: "Opioid",
    value: "Opioid",
  },
  {
    label: "Benzo",
    value: "Benzo",
  },
  {
    label: "Analgesic",
    value: "Analgesic",
  },
  {
    label: "Barbiturate",
    value: "Barbiturate",
  },
  {
    label: "Nitazene",
    value: "Nitazene",
  },
  {
    label: "Tomidine",
    value: "Tomidine",
  },
  {
    label: "Amphetamine",
    value: "Amphetamine",
  },
]);

const reset_form = () => {
  creating_drug.value = {
    _id: "",
    drug: "",
    categories_of_drug: [],
    drug_information: "",
    alternative_names: [],
  };
};

const handle_shower = (mode) => {
  api_store.show_modal("show_create_drug");
  api_store.drug_create_or_edit_mode = mode;
  if (mode === "create") {
    reset_form();
  }
};

const creating_drug = ref({
  _id: "",
  drug: "",
  categories_of_drug: [],
  drug_information: "",
  alternative_names: [],
});

const submit_create_drug = async () => {
  delete creating_drug.value._id; // not needed

  try {
    const data = await $fetch("/api/drugs/create", {
      method: "POST",
      body: creating_drug.value,
    });

    console.log("CREATED DRUG RESPONSE: ", data);

    if (data.status === "error") {
      console.error("Network error:", data.message);
      if (import.meta.client) {
        api_store.create_toast({
          title: "Error",
          message: "Failed to connect to the server.",
          color: "bg-red-500",
        });
      }
      return;
    }

    if (data.status === "error") {
      console.error("Drug creation failed:", data.message);
      if (import.meta.client) {
        api_store.create_toast({
          title: "Error",
          message: "Drug was not created.",
          color: "bg-orange-500",
        });
        return;
      }
    }

    console.log("Drug created successfully, displaying success toast.");
    if (import.meta.client) {
      api_store.create_toast({
        title: `Success`,
        message: "Drug has been created.",
        color: "bg-emerald-500",
      });
    }

    // clear the form
    reset_form();

    // close the modal
    if (import.meta.client) {
      api_store.hide_modal("show_create_drug");
    }

    // fetch the drugs again
    await fetch_drugs();
  } catch (err) {
    console.error("Unexpected error:", err);
    if (import.meta.client) {
      alert("An unexpected error occurred.");
      api_store.create_toast({
        title: "Error",
        message: "Unexpected error occurred. Please try again.",
        color: "bg-red-500",
      });
    }
  }
};

const submit_update_drug = async () => {
  const id = creating_drug.value._id;

  try {
    const data = await $fetch(`/api/drugs/${id}`, {
      method: "PUT",
      body: creating_drug.value,
    });

    console.log("UPDATED DRUG RESPONSE: ", data);

    if (data.status === "error") {
      console.error("Drug update failed:", data.message);
      if (import.meta.client) {
        api_store.create_toast({
          title: "Error",
          message: data.message,
          color: "bg-orange-500",
        });
      }
      return;
    }

    console.log("Drug created successfully, displaying success toast.");
    if (import.meta.client) {
      api_store.create_toast({
        title: `Success`,
        message: "Drug has been updated.",
        color: "bg-emerald-500",
      });
    }

    reset_form();

    // close the modal
    if (import.meta.client) {
      api_store.hide_modal("show_create_drug");
    }

    // fetch the drugs again
    await fetch_drugs();
  } catch (err) {
    console.error("Unexpected error:", err);
    if (import.meta.client) {
      alert("An unexpected error occurred.");
      api_store.create_toast({
        title: "Error",
        message: "Unexpected error occurred. Please try again.",
        color: "bg-red-500",
      });
    }
  }
};

const handle_edit_drug = async ({ row, id }) => {
  api_store.drug_create_or_edit_mode = "edit";
  console.log("EDITING DRUG ID: ", id);

  try {
    const data = await $fetch(`/api/drugs/${id}`, {
      method: "GET",
    });

    console.log("EDIT DRUG RESPONSE: ", data);

    if (data.status === "error") {
      console.error("Drug edit failed:", data.message);
      if (import.meta.client) {
        api_store.create_toast({
          title: "Error",
          message: data.message,
          color: "bg-orange-500",
        });
      }
      return;
    }

    creating_drug.value = data.one_drug;

    api_store.show_modal("show_create_drug");

    // fetch the drugs again
    await fetch_drugs();
  } catch (err) {
    console.error("Unexpected error:", err);
    if (import.meta.client) {
      alert("An unexpected error occurred.");
      api_store.create_toast({
        title: "Error",
        message: "Unexpected error occurred. Please try again.",
        color: "bg-red-500",
      });
    }
  }
};

const handle_delete = async (drug_id) => {
  const id = drug_id;

  console.log("DELETEING DRUG ID: ", id);

  try {
    const data = await $fetch(`/api/drugs/${id}`, {
      method: "DELETE",
    });

    console.log("DELETE DRUG RESPONSE: ", data);

    if (data.status === "error") {
      console.error("Drug deletion failed:", data.message);
      if (import.meta.client) {
        api_store.create_toast({
          title: "Error",
          message: data.message,
          color: "bg-orange-500",
        });
      }
      return;
    }

    console.log("Drug created successfully, displaying success toast.");
    if (import.meta.client) {
      api_store.create_toast({
        title: `Success`,
        message: "Drug has been deleted.",
        color: "bg-emerald-500",
      });
    }

    // fetch the drugs again
    await fetch_drugs();
  } catch (err) {
    console.error("Unexpected error:", err);
    if (import.meta.client) {
      alert("An unexpected error occurred.");
      api_store.create_toast({
        title: "Error",
        message: "Unexpected error occurred. Please try again.",
        color: "bg-red-500",
      });
    }
  }
};

const drugs_table = useState("drugs_table", () => []);

const fetch_drugs = async () => {
  try {
    const data = await $fetch("/api/drugs/list", {
      method: "GET",
      params: {
        query: queryObject.value, // send the whole object as a single "query" param
        page: page.value || api_store.table_pagination_settings?.page,
        limit: limit.value || api_store.table_pagination_settings?.limit,
      },
    });

    console.log("DRUGS RETURNED: ", data.drugs_list);

    drugs_table.value = data.drugs_list;
    total_count.value = data.total_count;
  } catch (err) {
    console.error("Unexpected error:", err);

    if (import.meta.client) {
      alert("An unexpected error occurred.: ", err);
    }
  }
};
onMounted(async () => {
  await fetch_drugs();
});

const filtered_drugs = computed(() => {
  const set_filter = api_store.drug_filter;

  if (set_filter === "All") {
    return drugs_table.value;
  } else {
    return drugs_table.value.filter((drug) => {
      // Check if set_filter is in the array
      return drug.categories_of_drug.includes(set_filter);
    });
  }
});

const queryObject = ref({});

const page = ref(api_store.table_pagination_settings?.page || 1);
const limit = ref(api_store.table_pagination_settings?.limit || 20); // default items per page
const total_count = ref(0);

watch([page, limit, queryObject], fetch_drugs, { immediate: true });
</script>

<template>
  <div class="bg-base-300 flex flex-col gap-3 flex-auto min-h-0 min-w-0">
    <div
      class="flex flex-row p-3 gap-3 bg-base-100 items-center w-full overflow-x-auto"
    >
      <button
        @click="api_store.drug_filter = 'All'"
        :class="[
          'btn max-sm:btn-sm',
          api_store.drug_filter === 'All'
            ? 'bg-primary text-base-content hover:bg-primary'
            : '',
        ]"
      >
        All
      </button>
      <!-- formkit select option -->
      <FormKit
        type="select"
        v-model="api_store.drug_filter"
        name="category"
        :options="[
          {
            label: 'Filter by Category',
            value: 'All',
          },
          ...drug_categories,
        ]"
        :input-class="`select max-sm:select-sm max-sm:w-40 select-bordered w-full`"
      ></FormKit>
      <ExportCSV :data="drugs_table" dataset="Drugs" />

      <XModal shower="show_create_drug">
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
              <span> Create Drug </span>
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
            id="create-drug-form"
            type="form"
            incomplete-message="Please review the form and complete the required fields."
            incomplete-messages-class="text-base-content font-semibold"
            @submit="
              api_store.drug_create_or_edit_mode === 'create'
                ? submit_create_drug()
                : submit_update_drug()
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
              <h1 class="text-xl capitalize">
                {{ api_store.drug_create_or_edit_mode }}
                Drug
              </h1>
              <div class="grid grid-cols-2 gap-5">
                <FormKit
                  message-class="text-base-content"
                  type="text"
                  name="drug"
                  label="Drug"
                  validation="required"
                  outer-class="$reset col-span-2"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_drug.drug"
                />

                <div
                  class="col-span-2 flex flex-row gap-3 justify-start max-w-full"
                >
                  <XMultiSelect
                    v-model="creating_drug.alternative_names"
                    validationRulesString="min:1"
                    fieldLabel="Add Alternative"
                    :selectOptions="[
                      { label: 'Weed', value: 'Weed' },
                      { label: 'Pot', value: 'Pot' },
                      { label: 'Grass', value: 'Grass' },
                      { label: 'Mary Jane', value: 'Mary Jane' },
                      { label: 'Hash', value: 'Hash' },
                      { label: 'Coke', value: 'Coke' },
                      { label: 'Blow', value: 'Blow' },
                      { label: 'Snow', value: 'Snow' },
                      { label: 'Crack', value: 'Crack' },
                      { label: 'Rock', value: 'Rock' },
                      { label: 'Meth', value: 'Meth' },
                      { label: 'Ice', value: 'Ice' },
                      { label: 'Crystal', value: 'Crystal' },
                      { label: 'Glass', value: 'Glass' },
                      { label: 'Ecstasy', value: 'Ecstasy' },
                      { label: 'Molly', value: 'Molly' },
                      { label: 'E', value: 'E' },
                      { label: 'Shrooms', value: 'Shrooms' },
                      { label: 'Magic Mushrooms', value: 'Magic Mushrooms' },
                      { label: 'Acid', value: 'Acid' },
                      { label: 'LSD', value: 'LSD' },
                      { label: 'Tabs', value: 'Tabs' },
                      { label: 'Heroin', value: 'Heroin' },
                      { label: 'Smack', value: 'Smack' },
                      { label: 'Junk', value: 'Junk' },
                      { label: 'Brown', value: 'Brown' },
                      { label: 'Opioids', value: 'Opioids' },
                      { label: 'Oxy', value: 'Oxy' },
                      { label: 'Percs', value: 'Percs' },
                      { label: 'Vikes', value: 'Vikes' },
                      { label: 'Lean', value: 'Lean' },
                      { label: 'Purple Drank', value: 'Purple Drank' },
                      { label: 'Sizzurp', value: 'Sizzurp' },
                    ]"
                  ></XMultiSelect>
                </div>
                <div
                  class="col-span-2 flex flex-row gap-3 justify-start max-w-full"
                >
                  <XMultiSelect
                    v-model="creating_drug.categories_of_drug"
                    fieldLabel="Category of Drug"
                    validationRulesString="required|min:1"
                    :selectOptions="drug_categories"
                  ></XMultiSelect>
                </div>

                <FormKit
                  message-class="text-base-content"
                  rows="4"
                  type="textarea"
                  name="drug_information"
                  label="Drug Information"
                  outer-class="$reset col-span-2"
                  wrapper-class="$reset w-full"
                  :input-class="`textarea textarea-bordered w-full`"
                  v-model="creating_drug.drug_information"
                />
              </div>
            </template>
          </FormKit>
        </template>
      </XModal>
    </div>

    <div class="w-full flex-auto min-h-0 min-w-0 overflow-auto bg-base-100">
      <!-- <Loading v-if="loading" /> -->
      <XTable
        belongsTo="drugs"
        :tableData="filtered_drugs"
        :totalCount="total_count"
        @edit="handle_edit_drug"
        @delete="handle_delete"
        @update:page="page = $event"
        @update:limit="limit = $event"
      ></XTable>
    </div>
  </div>
</template>
