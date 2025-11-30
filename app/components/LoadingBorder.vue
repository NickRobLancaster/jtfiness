<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const progress = ref(0);
const isLoading = ref(false);

// Function to start and stop loading
function startLoading() {
  isLoading.value = true;
  progress.value = 0;
  const interval = setInterval(() => {
    if (progress.value < 90) progress.value += 10;
  }, 4000);

  return interval;
}

function stopLoading(interval) {
  clearInterval(interval);
  progress.value = 100;
  setTimeout(() => {
    isLoading.value = false;
    progress.value = 0;
  }, 500);
}

// Set up loading bar on route change
const router = useRouter();
router.beforeEach((to, from, next) => {
  const interval = startLoading();
  next();
  router.afterEach(() => {
    stopLoading(interval);
  });
});
</script>

<template>
  <!-- Display loading bar only when isLoading is true -->
  <div
    v-if="isLoading"
    class="fixed top-0 left-0 w-full h-1 z-20 bg-transparent"
  >
    <div
      class="h-full neon-blue transition-all duration-300 ease-out"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>

<style>
/* Neon glow effect for the loading bar */
.neon-blue {
  background: linear-gradient(
    90deg,
    rgba(0, 128, 255, 0.871),
    rgba(255, 0, 0, 0.871),
    rgba(0, 255, 0, 0.871)
  ); /* Gradient from blue to red to green */
  box-shadow: 0 0 2px rgba(0, 128, 255, 0.871), 0 0 2px rgba(255, 0, 0, 0.871),
    0 0 2px rgba(0, 255, 0, 0.871), 0 0 2px rgba(0, 128, 255, 0.871),
    0 0 2px rgba(255, 0, 0, 0.871), 0 0 2px rgba(0, 255, 0, 0.871),
    0 0 2px rgba(0, 128, 255, 0.871);
  height: 2px; /* Ensure the height is no larger than 2px */
}
</style>
