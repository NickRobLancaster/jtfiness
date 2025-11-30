<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "w-52",
  },
});
</script>

<template>
  <img src="/images/placeholder_logo.png" alt="logo" :class="props.width" />
</template>
