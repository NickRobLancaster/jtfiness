<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  label: String,
  modelValue: {
    type: [String, Boolean, Number, Object, Array],
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  multiSelect: Boolean,
  enableAddNewOption: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const dropdownOpen = ref(false);
const search = ref("");
const selectedValue = ref(props.modelValue);
const dropdownRef = ref(null);

// Ensure default option exists
const allOptions = computed(() => {
  const hasDefault = props.options.some((opt) => opt.value === "");
  return hasDefault
    ? props.options
    : [{ value: "", label: "- Choose Option -" }, ...props.options];
});

const filteredOptions = computed(() => {
  return allOptions.value.filter((option) =>
    option.label.toLowerCase().includes(search.value.toLowerCase())
  );
});

const selectOption = (value) => {
  selectedValue.value = value;
  emit("update:modelValue", value);
  dropdownOpen.value = false;
};

const currentValue = computed(() => {
  return (
    allOptions.value.find((option) => option.value === selectedValue.value) || {
      label: "- Choose Option -",
    }
  );
});

// Click outside to close
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const showAddInput = ref(false);
const newOptionLabel = ref("");

const addNewOption = () => {
  if (!newOptionLabel.value.trim()) return;
  const newValue = newOptionLabel.value.trim();
  // Add to options directly (mutates props.options)
  props.options.push({ label: newValue, value: newValue });
  newOptionLabel.value = "";
  showAddInput.value = false;
  search.value = ""; // Reset search for updated list
};

// Inject selectedValue if it's not already in the dropdown options
const ensureSelectedOptionExists = () => {
  if (
    selectedValue.value &&
    !props.options.some((opt) => opt.value === selectedValue.value)
  ) {
    props.options.push({
      label: selectedValue.value,
      value: selectedValue.value,
    });
  }
};

ensureSelectedOptionExists();
</script>

<template>
  <div class="relative w-full min-w-52" ref="dropdownRef">
    <label class="text-sm font-medium text-base-content">{{ label }}</label>

    <!-- Selected Display Box -->
    <div
      class="w-full border border-gray-500 rounded px-4 py-2 cursor-pointer bg-base-100 text-base-content flex items-center justify-between"
      @click="dropdownOpen = !dropdownOpen"
    >
      <span>{{ currentValue.label }}</span>
      <!-- Chevron Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-base-content transition-transform duration-200"
        :class="{ 'rotate-180': dropdownOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>

    <!-- Dropdown with Animation -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="dropdownOpen"
        class="fixed max-sm:top-0 md:h-auto max-sm:left-0 md:absolute z-10 mt-1 w-full bg-base-300 border border-neutral rounded-md shadow-lg h-screen md:max-h-60 overflow-auto"
      >
        <input
          type="text"
          v-model="search"
          placeholder="Search..."
          class="w-full border-base-300 px-4 py-2 text-sm outline-none sticky top-0 bg-base-300"
        />
        <ul class="py-1">
          <li
            v-for="(option, index) in filteredOptions"
            :key="index"
            @click="selectOption(option.value)"
            :class="{
              'bg-teal-300 border-2 border-base-300':
                selectedValue === option.value,
              'cursor-pointer hover:bg-teal-100': true,
            }"
            class="px-4 py-2 text-sm text-base-content active:bg-teal-300"
          >
            {{ option.label }}
          </li>
        </ul>
        <!-- Add Option -->
        <div
          v-if="props.enableAddNewOption"
          class="border border-base-300 sticky bottom-0 bg-gray-500"
        >
          <button
            type="button"
            class="text-sm text-base-content hover:underline"
            @click="showAddInput = !showAddInput"
          >
            + Add New Option
          </button>
          <div v-if="showAddInput" class="mt-2 flex-col gap-2 items-center">
            <input
              v-model="newOptionLabel"
              placeholder="New option"
              class="border rounded px-2 py-1 text-sm w-full bg-white"
            />
            <button
              class="bg-teal-500 text-base-content px-3 py-1 rounded text-sm hover:bg-teal-600 w-full"
              @click="addNewOption"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
