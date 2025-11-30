<script setup>
import { ref, computed } from "vue";

// Store the raw alphanumeric value (without hyphens)
const search_value = ref("");
</script>

<template>
  <client-only>
    <div class="px-2">
      <FormKit
        message-class="text-base-content"
        type="text"
        name="Search Value"
        validation-visibility="live"
        placeholder="Search Sample ID (abc-123-a2Z)"
        :validation="[
          ['length', 9], // Exactly 9 characters
          ['matches', /^[a-zA-Z0-9]{9}$/], // Only letters and numbers, exactly 9
        ]"
        :validation-messages="{
          length: 'The value must be exactly 9 characters long',
          matches: 'Only letters and numbers are allowed',
        }"
        wrapper-class="w-full"
        :input-class="`input input-bordered w-full`"
        v-model="search_value"
      />
    </div>
  </client-only>
</template>
