<script setup>
definePageMeta({
  ssr: true,
  title: "Create JT Fitness Admin Account",
  meta: [
    {
      name: "description",
      content: "Create JT Fitness Admin Account",
    },
  ],
});
//defineRouteRules({
//  prerender: true,
//});

const login = ref({
  username: "",
  password: "",
  confirm_password: "",
  one_time_access_key: "",
});
</script>

<template>
  <div
    class="w-screen md:h-screen bg-base-100 flex flex-col items-center justify-center"
  >
    <div class="bg-base-100 p-5 flex flex-col gap-5 md:w-[325px]">
      <div class="p-5">
        <h1 class="text-2xl text-center">Create JT Fitness Admin Account</h1>
      </div>
      <label for=""> Email </label>
      <input
        type="text"
        v-model="login.username"
        class="input input-bordered"
      />

      <label for=""> Password </label>
      <input
        type="password"
        v-model="login.password"
        class="input input-bordered"
      />

      <label for=""> Confirm Password </label>
      <input
        type="password"
        v-model="login.confirm_password"
        class="input input-bordered"
      />

      <label for=""> One Time Access Key </label>
      <input
        type="password"
        v-model="login.one_time_access_key"
        class="input input-bordered"
      />

      <button class="btn btn-success text-base-content">Create Account</button>

      <div class="grid grid-cols-2 gap-5">
        <nuxt-link to="/admin/forgot-password" class="link col-span-1"
          >Forgot Password?</nuxt-link
        >
        <nuxt-link to="/admin" class="link col-span-1 text-right"
          >Admin Sign In</nuxt-link
        >
        <nuxt-link to="/" class="link col-span-2 text-center"
          >Back to Website</nuxt-link
        >
      </div>
    </div>
  </div>
</template>
