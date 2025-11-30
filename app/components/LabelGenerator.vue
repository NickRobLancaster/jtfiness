<template>
  <div>
    <!-- Control bar (never printed / exported) -->
    <!-- <div
      v-if="api_store.labels_to_generate?.length > 0"
      class="flex flex-row gap-5 p-1"
    >
      <button
        class="btn bg-gray-500 text-base-content animate-pulse"
        @click="printLabels"
      >
        Print Labels
      </button>
    </div> -->

    <!-- Printable area -->
    <div ref="printArea" class="print-container hidden-until-print">
      <div v-for="(page, pIdx) in pagedLabels" :key="pIdx" class="label-page">
        <div v-for="(id, idx) in page" :key="`${pIdx}-${idx}`" class="label">
          {{ id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import html2pdf from "html2pdf.js";
const api_store = useApiStore();

/* ---------- Props ---------- */
const props = defineProps({
  ids: { type: Array, required: true }, // already 4×‑repeated IDs
});

/* ---------- Refs ---------- */
const printArea = ref(null);

/* ---------- Data ---------- */
const pagedLabels = computed(() => {
  const perPage = 80; // 4 cols × 20 rows
  const out = [];
  for (let i = 0; i < props.ids.length; i += perPage) {
    out.push(props.ids.slice(i, i + perPage));
  }
  return out;
});

/* ---------- Actions ---------- */
function printLabels() {
  window.print();
}

function downloadPdf() {
  const el = printArea.value;
  if (!el) {
    console.error("Printable area not found.");
    return;
  }
  html2pdf()
    .set({
      filename: "labels.pdf",
      margin: 0,
      html2canvas: {
        scale: 1,
        /* 👇 Ignore every node that is NOT inside printArea */
        ignoreElements: (element) => !el.contains(element),
      },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })
    .from(el)
    .save();
}

/* ---------- Load Font ---------- */
onMounted(() => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap";
  document.head.appendChild(link);
});
const forced_print = ref(false);
watch(
  () => props.ids,
  (newVal) => {
    if (Array.isArray(newVal) && newVal.length > 0 && !forced_print.value) {
      // Delay to ensure DOM is rendered before print

      nextTick(() => {
        printLabels();
      });

      forced_print.value = true;
    }

    if (forced_print.value && newVal.length === 0) {
      // Reset the flag if no IDs are provided
      forced_print.value = false;
    }
  },
  { immediate: true, deep: false }
);

window.onafterprint = () => {
  api_store.labels_to_generate = [];
  api_store.checkboxed_rows_drug_tests = [];

  //   get the checkbox_all id by querySelector and set it to false
  const checkboxAll = document.querySelector("#checkbox_all");
  if (checkboxAll) {
    checkboxAll.checked = false;
  }
};
</script>

<style>
/* === Print rules: show ONLY the label sheet ===================== */
@media print {
  /* Hide everything by default … */
  body * {
    visibility: hidden !important;
  }

  .hidden-until-print {
    display: block !important;
  }

  /* … then re‑show the label sheet */
  .print-container,
  .print-container * {
    visibility: visible !important;
  }

  .print-container {
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
  }

  /* One sheet per printed page */
  .label-page {
    page-break-after: always;
  }
}

/* === Control bar (never printed) =============================== */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* === Printable layout ========================================== */
.print-container {
  font-family: "Atkinson Hyperlegible", sans-serif;
  background: #fff;
}

.label-page {
  width: 8.5in;
  height: 11in;
  padding-top: 0.12in;
  display: grid;
  grid-template-columns: repeat(4, 2.27in);
  grid-template-rows: repeat(20, 0.573in);
  gap: 0 0.125in;
  margin-left: -0.1in;
  box-sizing: border-box; /* ✅ corrected */
}

.label {
  width: 1.75in;
  height: 0.573in;
  font-size: 15pt;
  color: black;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box; /* fixed */
}

/* Hidden on screen, visible for print/download */
.hidden-until-print {
  display: none;
}
</style>
