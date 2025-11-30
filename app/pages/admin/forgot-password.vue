<script setup>
definePageMeta({
  ssr: true,
  title: "Forgot Password",
  meta: [
    {
      name: "description",
      content: "Forgot Password",
    },
  ],
});
//defineRouteRules({
//  prerender: true,
//});

const login = ref({
  username: "",
  password: "",
});
</script>

<template>
  <div
    class="w-screen h-screen bg-base-100 flex flex-col items-center justify-center"
  >
    <div class="bg-base-100 p-5 flex flex-col gap-5 md:w-[325px]">
      <div class="p-5">
        <h1 class="text-2xl text-center">JT Fitness Forgot Password</h1>
      </div>
      <label for=""> Email </label>
      <input type="text" v-model="login.email" class="input input-bordered" />

      <button class="btn btn-error text-base-content">Recover Password</button>

      <div class="grid grid-cols-2 gap-5">
        <nuxt-link to="/admin" class="link col-span-1">Admin Sign In</nuxt-link>
        <nuxt-link to="/admin/users/create" class="link col-span-1"
          >Create Account</nuxt-link
        >
        <nuxt-link to="/" class="link col-span-2 text-center"
          >Back to Website</nuxt-link
        >
      </div>
    </div>
  </div>
</template>
