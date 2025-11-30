<script setup>
definePageMeta({
  ssr: true,
  title: "Administrator Sign In",
  meta: [
    {
      name: "IEHR Admin Login",
      content: "IEHR Admin Login",
    },
  ],
});
//defineRouteRules({
//  prerender: true,
//});
import { useApiStore } from "./../stores/apiStore";
const api_store = useApiStore();
// import the nuxt/formkit module to access the submit function

const login = ref({
  api_username: "",
  api_key: "",
});

const submitLogin = async () => {
  try {
    //delay 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const data = await $fetch("/api/auth/login", {
      method: "POST",
      body: login.value,
    });

    console.log("LOGIN RETURNED: ", data);

    if (data.status === "error") {
      console.error("Login failed:", data.error);
      api_store.create_toast({
        title: "Error",
        message: "Invalid Credentials",
        color: "bg-orange-500",
      });
      return;
    }

    api_store.session = data.session.user;

    api_store.create_toast({
      title: `Welcome ${data.session.user.first_name}`,
      message: "Successfully logged in",
      color: "bg-emerald-500",
    });

    // redirect to the admin/dashboard route
    navigateTo("/admin/dashboard");

    // navigateTo("/dashboard");
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("An unexpected error occurred.");
  }
};
</script>

<template>
  <div
    class="w-screen min-h-screen flex flex-col items-center justify-center py-14 text-center"
  >
    <div class="bg-base-100 p-5 flex flex-col gap-5 md:w-[325px] w-72">
      <FormKit
        id="login-form"
        type="form"
        :incomplete-message="false"
        @submit="submitLogin"
        form-class="w-full flex flex-col gap-5 p-5 rounded-xl bg-base-100 shadow-md"
        wrapper-class="w-full max-w-full"
        :actions="true"
        :submit-attrs="{
          inputClass: 'bg-blue-500 p-3 rounded w-full text-base-content',
          wrapperClass: '',
          'data-theme': `dark`,
          help: '',
          ignore: false,
        }"
      >
        <template #default="{ state }">
          <div class="p-5">
            <h1 class="text-2xl text-center">IEHR Admin Login</h1>
          </div>
          <!-- Username Field -->
          <FormKit
            v-if="!state.loading"
            message-class="text-base-content"
            type="text"
            name="api_username"
            label="Username"
            validation="required"
            wrapper-class="$reset w-full"
            :input-class="`input input-bordered w-full`"
            v-model="login.api_username"
          />

          <!-- Password Field -->
          <FormKit
            v-if="!state.loading"
            message-class="text-base-content"
            type="password"
            name="password"
            label="Password"
            validation="required"
            wrapper-class="$reset w-full"
            :input-class="`input input-bordered w-full`"
            v-model="login.api_key"
          />

          <Loading v-if="state.loading" />
        </template>
      </FormKit>

      <div class="grid grid-cols-2 gap-5">
        <!-- <nuxt-link to="/admin/forgot-password" class="link col-span-1"
          >Forgot Password?</nuxt-link
        > -->
        <!-- <nuxt-link to="/admin/users/create" class="link col-span-1 text-right"
          >Create Account</nuxt-link
        > -->
        <nuxt-link to="/" class="link col-span-2 text-center"
          >Back to Website</nuxt-link
        >
      </div>
    </div>
  </div>
</template>
