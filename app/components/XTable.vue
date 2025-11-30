<script setup>
// Define props
const props = defineProps({
  belongsTo: {
    type: String,
  },
  tableData: {
    type: Array,
    required: true,
    default: [],
  },
  totalCount: {
    type: Number,
    default: 0,
  },
});

const api_store = useApiStore();

// Emit events to the parent component
const emit = defineEmits([
  "edit",
  "editTest",
  "editResult",
  "delete",
  "update:page",
  "update:limit",
]);

// Derive the headers dynamically from the first row's keys
const headers = computed(() => {
  return props.tableData?.length > 0
    ? Object.keys(props.tableData[0]).filter((key) => key !== "avatar")
    : [];
});

function handleDelete(rowId) {
  if (confirm("Are you sure you want to delete this item?")) {
    emit("delete", rowId);
  }
}

const checkbox_all = (event) => {
  if (event.target.checked) {
    // Add all sample_ids to api_store.checkboxed_rows_drug_tests
    api_store.checkboxed_rows_drug_tests = props.tableData.map(
      (row) => row.sample_id
    );
  } else {
    // Remove all
    api_store.checkboxed_rows_drug_tests = [];
  }
};

const batch_name = ref("");

const submit_create_labels = async () => {
  try {
    const data = await $fetch("/api/drug-tests/labels/create", {
      method: "POST",
      body: {
        batch_name: batch_name.value,
        labels_ids: api_store.checkboxed_rows_drug_tests,
      },
    });
    api_store.hide_modal("show_create_labels");

    //reset the batch name
    batch_name.value = "";

    console.log("Labels created successfully:", data.labels);

    api_store.labels_to_generate = data.labels;
    api_store.show_modal("show_labels_generator");
  } catch (error) {
    // Handle error (e.g., show notification)
    console.error("Failed to create labels:", error);
  }
};

const page = ref(api_store.table_pagination_settings?.page || 1);
const limit = ref(api_store.table_pagination_settings?.limit || 20);

watch([page, limit], ([newPage, newLimit], [oldPage, oldLimit]) => {
  emit("update:page", newPage);
  emit("update:limit", newLimit);

  // If limit changed, reset page to 1
  if (newLimit !== oldLimit) {
    page.value = 1;
  }

  api_store.table_pagination_settings = {
    page: page.value,
    limit: limit.value,
  };
});
</script>

<template>
  <client-only>
    <div class="flex-auto min-h-0 min-w-0 overflow-x-auto">
      <LabelGenerator :ids="api_store?.labels_to_generate" />

      <XModal shower="show_create_labels">
        <template #open-button>
          <button
            v-if="
              props.belongsTo === 'drug-tests' &&
              api_store.checkboxed_rows_drug_tests?.length > 0
            "
            class="btn btn-warning text-base-content mb-2 animate-pulse"
            style="animation-duration: 1.1s"
            @click="api_store.show_modal('show_create_labels')"
          >
            <span class="text-base-content">Generate Labels</span>
          </button>
        </template>
        <template #body>
          <FormKit
            id="create-manual-labels-form"
            type="form"
            incomplete-message="Please review the form and complete the required fields."
            incomplete-messages-class="text-base-content font-semibold"
            @submit="submit_create_labels"
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
                <h1 class="text-xl capitalize">Create Labels</h1>
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
                  v-model="batch_name"
                />
              </div>
            </template>
          </FormKit>
        </template>
      </XModal>

      <div class="flex justify-end p-2 items-center gap-5">
        <div class="flex items-center gap-2">
          <span class="text-sm">This Page: {{ props.tableData.length }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm">Total Records: {{ props.totalCount }}</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm">Rows per page:</span>
          <select v-model="limit" class="select select-xs select-bordered">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </div>

        <div class="flex items-center gap-2">
          <button class="btn btn-xs" :disabled="page === 1" @click="page--">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>

          <span class="text-sm">Page {{ page }}</span>

          <button
            class="btn btn-xs"
            :disabled="page * limit >= props.totalCount"
            @click="page++"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 14.354a.5.5 0 0 1 0-.708L10.293 8 4.646 2.354a.5.5 0 1 1 .708-.708l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <table class="table table-xs overflow-x-auto">
        <!-- head -->
        <thead>
          <tr>
            <th v-if="props.belongsTo === 'drug-tests'">
              <label>
                <input
                  id="checkbox_all"
                  type="checkbox"
                  class="checkbox"
                  @change="checkbox_all"
                />
              </label>
            </th>
            <th v-for="header in headers" :key="header">
              {{ header.replace("_", " ").toUpperCase() }}
            </th>
            <th class="w-36 sticky right-0 bg-base-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in props.tableData"
            :key="index"
            class="odd:bg-neutral odd:text-base-content hover:bg-gray-700"
          >
            <th v-if="props.belongsTo === 'drug-tests'">
              <label>
                <input
                  type="checkbox"
                  :value="row.sample_id"
                  :key="row.sample_id"
                  class="checkbox"
                  v-model="api_store.checkboxed_rows_drug_tests"
                />
              </label>
            </th>
            <td v-for="(cell, key) in row" :key="key">
              <div class="font-bold whitespace-nowrap">{{ cell }}</div>
            </td>

            <th class="sticky right-0 bg-base-300">
              <div class="flex flex-col md:flex-row gap-2 md:items-center">
                <div class="flex flex-col gap-2">
                  <!-- Edit Button -->
                  <button
                    v-if="props.belongsTo !== 'drug-tests'"
                    class="btn btn-info btn-xs text-base-content whitespace-nowrap"
                    @click="$emit('edit', { row, id: row?._id })"
                  >
                    Edit
                  </button>

                  <!-- Edit Button -->
                  <button
                    v-if="props.belongsTo === 'drug-tests'"
                    class="btn btn-info btn-xs text-base-content whitespace-nowrap"
                    @click="$emit('editTest', { row, id: row?._id })"
                  >
                    Edit Test
                  </button>

                  <!-- Edit Button -->
                  <button
                    v-if="props.belongsTo === 'drug-tests'"
                    class="btn btn-info btn-xs text-base-content whitespace-nowrap"
                    @click="$emit('editResult', { row, id: row?._id })"
                  >
                    Edit Results
                  </button>
                </div>

                <button
                  v-if="
                    // Hide if role is admin or user
                    api_store?.session?.role !== 'admin' &&
                    api_store?.session?.role !== 'user' &&
                    // For the 'users' dataset, hide if row._id matches session._id
                    (props.belongsTo === 'users'
                      ? row?._id !== api_store?.session?._id
                      : true)
                  "
                  class="btn btn-error btn-xs text-base-content"
                  @click="handleDelete(row?._id)"
                >
                  Delete
                </button>
              </div>
            </th>
          </tr>
        </tbody>
        <!-- foot -->
      </table>
      <div class="flex justify-end p-2 items-center gap-5">
        <div class="flex items-center gap-2">
          <span class="text-sm">This Page: {{ props.tableData.length }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm">Total Records: {{ props.totalCount }}</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm">Rows per page:</span>
          <select v-model="limit" class="select select-xs select-bordered">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </div>

        <div class="flex items-center gap-2">
          <button class="btn btn-xs" :disabled="page === 1" @click="page--">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>

          <span class="text-sm">Page {{ page }}</span>

          <button
            class="btn btn-xs"
            :disabled="page * limit >= props.totalCount"
            @click="page++"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 14.354a.5.5 0 0 1 0-.708L10.293 8 4.646 2.354a.5.5 0 1 1 .708-.708l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </client-only>
</template>
