<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "w-64",
  },
});
</script>

<template>
  <img src="/images/JTFitLogo1.svg" alt="logo" :class="props.width" />
</template>
