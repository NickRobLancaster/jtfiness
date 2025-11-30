<script setup>
definePageMeta({
  ssr: true,
  title: "Contact Us",
  meta: [
    {
      name: "description",
      content: "Contact Us",
    },
  ],
});

// Fetch CMS content for "learn-more"
const {
  data: learn_more_data,
  pending: is_loading,
  error: fetch_error,
  refresh,
} = await useAsyncData("contact_page", () =>
  $fetch("/api/cms", { params: { page: "contact" } })
);

const sorted_sections = computed(() => {
  const sections = learn_more_data.value?.content?.sections || [];
  return [...sections].sort((a, b) => a.order_index - b.order_index);
});
</script>

<template>
  <div>
    <client-only>
      <!-- Loading state -->
      <div
        v-if="is_loading"
        class="flex items-center justify-center min-h-screen"
      >
        <span class="loading loading-spinner text-primary"></span>
      </div>

      <!-- Error state -->
      <div
        v-else-if="fetch_error"
        class="alert alert-error flex items-center justify-center min-h-screen"
      >
        <span
          >Error loading content.
          <button class="link" @click="refresh()">Retry</button></span
        >
      </div>

      <!-- Page Content -->
      <div v-else>
        <section
          v-for="(section, idx) in sorted_sections"
          :key="section?._id || idx"
          class="w-screen min-h-screen flex flex-col items-center justify-center p-10 text-center bg-base-100 border-b"
        >
          <div
            class="flex flex-col items-center justify-center space-y-8 max-w-[500px] md:max-w-[800px]"
          >
            <!-- eslint-disable vue/no-v-html -->
            <div v-html="section?.html"></div>
            <!-- eslint-enable vue/no-v-html -->
          </div>
        </section>
      </div>
    </client-only>
  </div>
</template>
