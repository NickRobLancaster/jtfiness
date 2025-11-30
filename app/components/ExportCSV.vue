<script setup>
import { saveAs } from "file-saver";
import { json2csv } from "json-2-csv";
const props = defineProps({
  dataset: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

const filename = `IEHR_${props.dataset.replaceAll(" ", "_")}_${Date.now()}.csv`;

const isExporting = ref(false);

const exportCsv = async () => {
  if (!props.data || !props.data.length) {
    console.warn("No data available for export");
    return;
  }

  try {
    isExporting.value = true;

    // Convert JSON to CSV
    const csv = json2csv(props.data);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    saveAs(blob, filename);

    console.log("JSON to CSV DONE: ", csv);

    isExporting.value = false;
  } catch (error) {
    console.error("Error exporting data to CSV:", error);
    isExporting.value = false;
  }
};
</script>
<template>
  <client-only>
    <div class="ml-auto">
      <button
        @click="exportCsv"
        :disabled="isExporting"
        class="btn max-sm:btn-sm btn-neutral whitespace-nowrap"
      >
        Export {{ props.dataset }} to CSV
      </button>
    </div>
  </client-only>
</template>
