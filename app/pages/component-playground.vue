<template>
  <!-- <XFileUpload v-model="fetched_files" /> -->
</template>

<script lang="ts" setup>
definePageMeta({
  ssr: true,
  layout: "playground",
});

const fetched_files = ref([
  {
    name: "file1",
    file_name: "file1.jpg",
    type: "text/csv", //csv only
    url: "https://example.com/file1.jpg",
    path: "/path/to/file1.jpg",
    key: "file1",
    size: 1024,
  },
]);
</script>

<style></style>
