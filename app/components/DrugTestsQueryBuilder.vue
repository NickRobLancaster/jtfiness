<script setup>
const api_store = useApiStore();
const emit = defineEmits(["update:query"]);
const filters = ref([{ logic: "AND", field: "", operator: "", value: "" }]);
const picklistCache = ref({});

const logicOptions = [
  { value: "AND", label: "AND" },
  { value: "OR", label: "OR" },
];

const build_clause = (f) => {
  if (!f.field || !f.operator || f.value === "") return null;

  if (f.operator === "$in") {
    const arr = Array.isArray(f.value)
      ? f.value
      : String(f.value)
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
    return { [f.field]: { $in: arr } };
  }

  if (f.operator === "$regex") {
    return { [f.field]: { $regex: String(f.value), $options: "i" } }; // ✅ no nesting
  }

  return { [f.field]: { [f.operator]: f.value } };
};

const operatorSets = {
  text: [
    { label: "Select Operator", value: "", attrs: { disabled: true } },
    { value: "$eq", label: "Equal To" },
    { value: "$ne", label: "Not Equal To" },
    { value: "$regex", label: "contains" },
    { value: "$in", label: "In (Comma Separated)" },
  ],
  date: [
    { label: "Select Operator", value: "", attrs: { disabled: true } },
    { value: "$eq", label: "Equal To" },
    { value: "$ne", label: "Not Equal To" },
    { value: "$gt", label: "After Date" },
    { value: "$lt", label: "Before Date" },
  ],
  boolean: [
    { label: "Select Operator", value: "", attrs: { disabled: true } },
    { value: "$eq", label: "Is" },
    { value: "$ne", label: "Is Not" },
  ],
  dropdown: [
    { label: "Select Operator", value: "", attrs: { disabled: true } },
    { value: "$eq", label: "Equal To" },
    { value: "$ne", label: "Not Equal To" },
    { value: "$in", label: "In (Comma Separated)" },
  ],
};

const fieldOptions = [
  { key: "sample_id", label: "Sample ID", type: "text" },
  { key: "collection_date", label: "Collection Date", type: "date" },
  { key: "street_name", label: "Street Name", type: "text" },
  { key: "expected_to_be", label: "Expected To Be", type: "text" },
  { key: "color", label: "Color", type: "text" },
  { key: "markings", label: "Markings", type: "text" },
  { key: "appearance", label: "Appearance", type: "text" },
  { key: "sensations", label: "Sensations", type: "text" },
  { key: "route_of_administration", label: "Route of Admin", type: "text" },
  { key: "mass.before_sample", label: "Mass Before", type: "text" },
  { key: "mass.after_sample", label: "Mass After", type: "text" },
  { key: "city", label: "City", type: "text" },
  { key: "zip_code", label: "Zip Code", type: "text" },
  { key: "neighborhood", label: "Neighborhood", type: "text" },
  {
    key: "collection_organization",
    label: "Organization",
    type: "dropdown",
    picklist: {
      data_collection: "organizations",
      label_field: "name",
      value_field: "_id",
      api_endpoint: "/api/organizations/list",
    },
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Waiting for Return", value: "Waiting for Return" },
      { label: "Processing", value: "Processing" },
      { label: "Complete", value: "Complete" },
      { label: "Abandoned", value: "Abandoned" },
    ],
  },

  { key: "results_data.testing_date", label: "Testing Date", type: "date" },
  {
    key: "results_data.major_identified_substances.major_drug",
    label: "Major Substance",
    type: "dropdown",
    picklist: {
      data_collection: "drugs",
      label_field: "drug",
      value_field: "_id",
      api_endpoint: "/api/drugs/list",
    },
  },
  {
    key: "results_data.trace_identified_substances.trace_drug",
    label: "Trace Substance",
    type: "dropdown",
    picklist: {
      data_collection: "drugs",
      label_field: "drug",
      value_field: "_id",
      api_endpoint: "/api/drugs/list",
    },
  },

  { key: "batch", label: "Is Batch?", type: "boolean" },
];

const getFieldMeta = (fieldKey) =>
  fieldOptions.find((f) => f.key === fieldKey) || { type: "text" };

const getOperatorsForField = (fieldKey) => {
  const { type } = getFieldMeta(fieldKey);
  return operatorSets[type] || operatorSets.text;
};

const inputType = (fieldKey, operator) => {
  const meta = getFieldMeta(fieldKey);
  const type = meta.type;
  const hasPicklist = !!meta.picklist;

  // when using "in (comma separated)" we want a text input
  if (operator === "$in") {
    return "text";
  }

  return type === "boolean" || hasPicklist ? "select" : type;
};

const inputPlaceholder = (operator) =>
  operator === "$in" ? "Comma separated values" : "Value";

const inputOptions = (fieldKey) => {
  const meta = getFieldMeta(fieldKey);
  if (meta.type === "boolean") {
    return [
      { value: true, label: "True" },
      { value: false, label: "False" },
    ];
  }

  if (meta.options) {
    return meta.options;
  }

  if (meta.picklist) {
    const cached = picklistCache.value[fieldKey];
    if (cached?.length) return cached;

    // fetch if not already cached
    fetchPicklist(meta, fieldKey);
  }

  return [];
};

const fetchPicklist = async (meta, fieldKey) => {
  const { api_endpoint, label_field } = meta.picklist;
  try {
    const response = await $fetch(api_endpoint);
    if (!response) return;

    picklistCache.value[fieldKey] = response?.picklist?.map((item) => ({
      value: item._id,
      label: item[label_field],
    }));
  } catch (err) {
    console.error(`❌ Error fetching picklist for ${fieldKey}:`, err);
  }
};

const add = () =>
  filters.value.push({ logic: "AND", field: "", operator: "$eq", value: "" });

const remove = (i) => filters.value.splice(i, 1);

// Clear value if field/operator change + fetch picklist if needed
watch(
  filters,
  async (newVal, oldVal) => {
    for (let i = 0; i < newVal.length; i++) {
      const f = newVal[i];
      const old = oldVal?.[i] || {};
      const meta = getFieldMeta(f.field);

      // Always derive operators from helper so "select" / "dropdown" etc. all work
      const ops = getOperatorsForField(f.field);
      const operatorValid = ops.some((o) => o.value === f.operator);

      // If operator is no longer valid for this field, reset it to the first option
      if (!operatorValid) {
        f.operator = ops.length ? ops[0].value : "";
      }

      // If the field OR the operator changed, reset the value
      if (f.field !== old.field || f.operator !== old.operator) {
        f.value = "";

        // Fetch picklist when needed (first time this field is used)
        if (meta.picklist && !picklistCache.value[f.field]) {
          await fetchPicklist(meta, f.field);
        }
      }
    }
  },
  { deep: true }
);

const query_preview = ref({});

const applyFilters = () => {
  const and = [],
    or = [];

  for (const f of filters.value) {
    const clause = build_clause(f);
    if (!clause) continue;
    (f.logic === "AND" ? and : or).push(clause);
  }

  const query = {};
  if (and.length) query.$and = and;
  if (or.length) query.$or = or;

  query_preview.value = query;
  emit("update:query", query);
  api_store.drug_test_built_query = {
    filters: JSON.parse(JSON.stringify(toRaw(filters.value))),
    query,
  };
};

const resetFilters = () => {
  filters.value = [{ logic: "AND", field: "", operator: "$eq", value: "" }];
  query_preview.value = {};
  emit("update:query", {});
  api_store.drug_test_built_query = {};
};

onMounted(async () => {
  const saved = api_store.drug_test_built_query;

  if (saved && typeof saved === "object" && Array.isArray(saved.filters)) {
    try {
      const rawFilters = JSON.parse(JSON.stringify(saved.filters));
      filters.value.splice(0, filters.value.length, ...rawFilters);

      // Ensure all picklists are available before UI renders fully
      for (const f of filters.value) {
        const meta = getFieldMeta(f.field);
        if (meta.picklist && !picklistCache.value[f.field]) {
          await fetchPicklist(meta, f.field);
        }
      }

      // Rebuild the query
      // Rebuild the query
      const and = [],
        or = [];
      for (const f of filters.value) {
        const clause = build_clause(f);
        if (!clause) continue;
        (f.logic === "AND" ? and : or).push(clause);
      }
      const rebuilt_query = {};
      if (and.length) rebuilt_query.$and = and;
      if (or.length) rebuilt_query.$or = or;

      query_preview.value = rebuilt_query;
      emit("update:query", rebuilt_query);
      api_store.drug_test_built_query = {
        filters: structuredClone(toRaw(filters.value)),
        query: rebuilt_query,
      };

      console.log(
        "✅ Filters restored successfully:",
        api_store.drug_test_built_query
      );
    } catch (err) {
      console.warn("❌ Failed to restore filters:", err);
    }
  }
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- <pre class="bg-base-200 p-2 rounded text-sm overflow-x-auto">
      {{ api_store.drug_test_built_query }}
    </pre>
    <pre class="bg-base-200 p-2 rounded text-sm overflow-x-auto">
      {{ JSON.stringify(query_preview, null, 2) }}
    </pre> -->

    <div
      v-for="(condition, index) in filters"
      :key="index"
      class="flex flex-row items-center justify-between gap-2"
    >
      <FormKit
        type="select"
        name="logic"
        :value="condition.logic"
        v-model="condition.logic"
        :options="[
          {
            label: 'Clause',
            value: '',
            attrs: { disabled: true },
          },
          ...logicOptions,
        ]"
        wrapper-class="$reset w-full"
        :input-class="`input input-bordered w-full`"
      />

      <FormKit
        type="select"
        name="operator"
        :value="condition.field"
        v-model="condition.field"
        :options="[
          {
            label: 'Field',
            value: '',
            attrs: { disabled: true },
          },
          ...fieldOptions.map((f) => ({ label: f.label, value: f.key })),
        ]"
        wrapper-class="$reset w-full"
        :input-class="`select select-bordered w-full`"
      />

      <FormKit
        v-if="condition.field !== ''"
        type="select"
        :value="condition.operator"
        v-model="condition.operator"
        :options="getOperatorsForField(condition.field)"
        wrapper-class="$reset w-full"
        :input-class="`input input-bordered w-full`"
      />

      <FormKit
        v-if="condition.operator !== '' && condition.field !== ''"
        :key="`${condition.field}-${condition.operator}`"
        :type="inputType(condition.field, condition.operator)"
        v-model="condition.value"
        :value="condition.value"
        :placeholder="inputPlaceholder(condition.operator)"
        :options="
          inputType(condition.field, condition.operator) === 'select'
            ? inputOptions(condition.field)
            : []
        "
        wrapper-class="$reset w-full"
        :input-class="
          inputType(condition.field, condition.operator) === 'select'
            ? 'select select-bordered w-full'
            : 'input input-bordered w-full'
        "
      />

      <button class="btn bg-red-500 text-base-content" @click="remove(index)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
          <path
            fill="currentColor"
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
          />
        </svg>
      </button>
    </div>

    <div class="flex gap-4">
      <button class="btn btn-info text-base-content" @click="add">
        Add Filter
      </button>

      <button class="btn btn-warning text-base-content" @click="resetFilters">
        Reset All Filters
      </button>

      <button
        class="ml-auto btn btn-success text-base-content"
        @click="applyFilters"
      >
        Apply
      </button>
    </div>
  </div>
</template>
