<script setup></script>

<template>
  <button class="px-3 py-1 bg-black text-base-content fixed bottom-0 left-0">
    <span>Command</span>
  </button>

  <Teleport to="#modals">
    <transition
      enter-active-class="transition-opacity duration-500 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-500 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div class="fixed top-0 left-0 w-screen h-screen brightness-50 z-20">
        assd
      </div>
    </transition>
  </Teleport>
</template>
