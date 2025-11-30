<template>
  <div class="w-full">
    <!-- Label -->
    <!-- <label v-if="label" class="block font-bold mb-2">
        {{ label }}
      </label> -->

    <!-- Table -->

    <div v-if="tableData.length === 0" class="">
      <div
        class="text-lg font-bold bg-orange-400 text-base-content text-center rounded p-5 w-full flex flex-row gap-5 items-center justify-center"
      >
        <div>No {{ props.label }} Added Yet:</div>
        <div>
          <button
            type="button"
            @click="addRow"
            class="btn bg-blue-500 rounded hover:bg-blue-600 text-base-content border-base-300"
          >
            Add One
          </button>
        </div>
      </div>
    </div>

    <table v-else class="table table-zebra w-full">
      <thead class="">
        <tr>
          <th v-for="(col, colIndex) in columns" :key="colIndex" class="p-2">
            {{ col.label }}
          </th>
          <th class="p-2 text-right w-24">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in tableData"
          :key="row._id"
          class="odd:bg-base-100"
        >
          <td v-for="(col, colIndex) in columns" :key="colIndex" class="p-2">
            <!-- Render text or select FormKit field -->
            <FormKit
              v-if="col.type === 'text'"
              type="text"
              v-model="tableData[rowIndex][col.key]"
              :validation="col.validation.required ? 'required' : ''"
              message-class="text-base-content"
              wrapper-class="$reset w-full"
              :input-class="`input input-bordered w-full`"
              :name="`${props.key_prefix}-${col.key}-${rowIndex}`"
              :id="`${props.key_prefix}-${col.key}-${rowIndex}`"
              class="w-full"
            />

            <XDropdown
              v-else-if="col.type === 'select'"
              :label="col.label"
              :modelValue="tableData[rowIndex][col.key]"
              :options="col.options"
              :multiSelect="col.multiSelect"
              @update:modelValue="
                (value) => (tableData[rowIndex][col.key] = value)
              "
              :enable-add-new-option="col.enable_add_new_option"
            />
            <div v-else-if="col.type === 'select'">
              {{ tableData[rowIndex][col.key] }}
            </div>

            <FormKit
              v-else-if="col.type === 'select'"
              type="select"
              v-model="tableData[rowIndex][col.key]"
              message-class="text-base-content"
              :validation="col.validation.required ? 'required' : ''"
              wrapper-class="$reset w-full"
              :input-class="`select select-bordered w-full`"
              :name="`${props.key_prefix}-${col.key}-${rowIndex}`"
              :id="`${props.key_prefix}-${col.key}-${rowIndex}`"
              class="w-full"
              :options="[
                { label: 'Select an option', value: '' },
                ...col.options.map((option) => ({
                  label: option.label,
                  value: option.value,
                })),
              ]"
            />
          </td>
          <td class="p-2 flex flex-row justify-end">
            <button
              type="button"
              @click="removeRow(rowIndex)"
              class="bg-red-500 text-base-content btn btn-square rounded hover:bg-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <!-- Icon from All by undefined - undefined -->
                <path
                  fill="currentColor"
                  d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <pre>
  
    {{ tableData }}
  </pre
    > -->

    <div v-if="tableData.length !== 0" class="flex justify-end mt-4 p-2">
      <!-- Add row button -->
      <button
        type="button"
        @click="addRow"
        class="btn btn-primary rounded hover:bg-blue-600 text-base-content"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  key_prefix: String,
  label: String,
  modelValue: Array,
  columns: Array,
});

const columns = ref(props.columns);

// We emit when we need to update the v-model
const emit = defineEmits(["update:modelValue"]);

const tableData = ref(props.modelValue);

const addRow = () => {
  // Create a new row object with empty properties for each column
  const newRow = {};
  columns.value.forEach((col) => {
    // Initialize each field with an empty string or null (your preference)
    newRow[col.key] = null;
  });
  tableData.value.push(newRow);
};

const removeRow = (index) => {
  tableData.value.splice(index, 1);
};

watch(
  () => tableData.value,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);
</script>
