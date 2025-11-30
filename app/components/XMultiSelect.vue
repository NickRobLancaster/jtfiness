<script setup>
import { ref, watch, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  fieldLabel: {
    type: String,
    required: true,
  },
  isReference: {
    type: Boolean,
    default: false,
  },
  canWriteIn: {
    type: Boolean,
    default: true,
  },
  // MAIN - "required|min:1" for all checkboxes multi selects
  validationRulesString: {
    type: String,
  },
  selectOptions: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
  },
});

const emits = defineEmits(["update:modelValue"]);

const local_model = ref(props.modelValue);
const multi_select_additional_adder = ref("");
const multi_select_options = ref(props.selectOptions);

// Toggle the "add option" form
const show_option_adder = ref(false);
const toggle_option_adder = () => {
  show_option_adder.value = !show_option_adder.value;
};

// Add new custom option
function addOption() {
  const trimmed = multi_select_additional_adder.value.trim();
  if (!trimmed) return;

  // Check if the option already exists (case-insensitive).
  const alreadyExists = local_model.value.some(
    (option) => option.toLowerCase?.() === trimmed.toLowerCase()
  );

  if (!alreadyExists) {
    local_model.value.push(trimmed);
  }

  multi_select_additional_adder.value = "";
  toggle_option_adder();
}

// Watch local_model and emit updates
watch(local_model, (newVal) => {
  emits("update:modelValue", newVal);
});

// Confirm remove
const confirm_delete = (idx) => {
  const isConfirmed = confirm(
    `Are you sure you want to remove ${local_model.value[idx]}?`
  );
  if (isConfirmed) {
    local_model.value.splice(idx, 1);
  }
};

// --- NEW: search ---
const searchQuery = ref("");
const filteredOptions = computed(() => {
  // If referencing objects, filter by .label; otherwise by the string value
  if (props.isReference) {
    return multi_select_options.value.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  } else {
    return multi_select_options.value.filter((opt) =>
      opt.label.toLowerCase?.().includes(searchQuery.value.toLowerCase())
    );
  }
});
// -------------------
</script>

<template>
  <client-only>
    <div
      class="border border-base-300 rounded-lg p-3 relative flex flex-col gap-3 w-full"
    >
      <div class="flex flex-row gap-3 items-center">
        <!-- NEW: Search Field -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="input input-sm input-bordered w-full mb-2"
        />

        <button
          v-if="!show_option_adder && props.canWriteIn"
          type="button"
          class="text-base-content whitespace-nowrap"
          @click="toggle_option_adder"
        >
          Add Option
        </button>
      </div>

      <!-- Main FormKit checkbox group -->
      <FormKit
        message-class="text-base-content"
        type="checkbox"
        :name="props.fieldLabel.toLowerCase().replaceAll(' ', '_')"
        :label="props.fieldLabel"
        :validation="props.validationRulesString"
        outer-class="$reset col-span-2"
        options-class="border border-base-300
 rounded-lg p-3 max-h-52 overflow-y-auto"
        wrapper-class="$reset flex flex-row gap-3 w-full"
        :input-class="`checkbox checkbox-circle`"
        :options="filteredOptions"
        v-model="local_model"
      />

      <div
        v-if="show_option_adder"
        class="col-span-2 flex flex-row gap-3 items-end"
      >
        <button
          v-if="show_option_adder"
          type="button"
          class="btn btn-sm btn-error text-base-content"
          @click="toggle_option_adder"
        >
          X
        </button>

        <FormKit
          message-class="text-base-content"
          type="text"
          :name="`addon_${props.fieldLabel.toLowerCase().replaceAll(' ', '_')}`"
          :validation="local_model?.length === 0 ? 'required' : ''"
          placeholder="Type New Option Here"
          outer-class="$reset flex-1"
          wrapper-class="$reset w-full"
          :input-class="`input input-sm input-bordered w-full`"
          v-model="multi_select_additional_adder"
        />
        <button
          v-if="multi_select_additional_adder !== ''"
          type="button"
          @click="addOption"
          class="btn btn-sm btn-secondary text-base-content"
        >
          Add
        </button>
      </div>

      <!-- Display selected items -->
      <div v-if="local_model?.length !== 0 && !props.isReference">
        <div class="flex flex-row gap-2 flex-wrap">
          <button
            type="button"
            v-for="(val, idx) in local_model"
            :key="idx"
            class="btn btn-xs btn-primary"
            @click="confirm_delete(idx)"
          >
            {{ val }}
          </button>
        </div>
      </div>

      <div v-else-if="local_model?.length !== 0 && props.isReference">
        <div class="flex flex-row gap-2 flex-wrap">
          <button
            type="button"
            v-for="(val, idx) in local_model"
            :key="idx"
            class="btn btn-xs btn-primary"
            @click="confirm_delete(idx)"
          >
            {{
              multi_select_options.find((option) => option.value === val).label
            }}
          </button>
        </div>
      </div>
    </div>
  </client-only>
</template>
