<script setup>
definePageMeta({
  ssr: true,
  layout: "admin",
});

const api_store = useApiStore();
//defineRouteRules({
//  prerender: true,
//});

const reset_form = () => {
  creating_user.value = {
    _id: "",
    first_name: "",
    last_name: "",
    email: "",
    email_secondary: "",
    phone: "",
    phone_secondary: "",
    role: "", // super admin, admin, user
    api_key: "",
    api_key_confirmed: "",
    active: "",
  };
};

const handle_shower = (mode) => {
  api_store.show_modal("show_create_user");
  api_store.users_create_or_edit_mode = mode;
  if (mode === "create") {
    reset_form();
  }
};

const show_phone_secondary = ref(false);
const toggle_phone_secondary = () => {
  show_phone_secondary.value = !show_phone_secondary.value;
};

const show_email_secondary = ref(false);
const toggle_email_secondary = () => {
  show_email_secondary.value = !show_email_secondary.value;
};

const creating_user = ref({
  _id: "",
  first_name: "",
  last_name: "",
  email: "",
  email_secondary: "",
  phone: "",
  phone_secondary: "",
  role: "", // super admin, admin, user
  api_key: "",
  api_key_confirmed: "",
  active: "",
});

const submit_create_user = async () => {
  delete creating_user.value._id;

  try {
    const response = await $fetch("/api/users/create", {
      method: "POST",
      body: creating_user.value,
    });

    console.log("CREATED USER RESPONSE: ", response);

    if (response.status === "error") {
      console.error("User creation failed:", response.error);
      api_store.create_toast({
        title: "Error",
        message: "User was not created.",
        color: "bg-orange-500",
      });
      return;
    }

    console.log("User created successfully, displaying success toast.");
    api_store.create_toast({
      title: `Success`,
      message: "User has been created.",
      color: "bg-emerald-500",
    });

    reset_form();

    // close the modal
    api_store.hide_modal("show_create_user");

    // fetch the users again
    await fetch_users();
  } catch (err) {
    console.error("Unexpected error:", err);
    api_store.create_toast({
      title: "Error",
      message: "Unexpected error occurred. Please try again.",
      color: "bg-red-500",
    });
  }
};

const submit_update_user = async () => {
  const id = creating_user.value._id;
  if (creating_user.value.api_key === "") {
    //delete the api_key property
    delete creating_user.value.api_key;
  }
  try {
    const response = await $fetch(`/api/users/${id}`, {
      method: "PUT",
      body: creating_user.value,
    });

    console.log("UPDATED USER RESPONSE: ", response);

    if (response.status === "error") {
      console.error("User update failed:", response.error);
      api_store.create_toast({
        title: "Error",
        message: "User was not updated.",
        color: "bg-orange-500",
      });
      return;
    }

    console.log("User updated successfully, displaying success toast.");
    api_store.create_toast({
      title: `Success`,
      message: "User has been updated.",
      color: "bg-emerald-500",
    });

    reset_form();

    // close the modal
    api_store.hide_modal("show_create_user");

    // fetch the users again
    await fetch_users();
  } catch (err) {
    console.error("Unexpected error:", err);
    api_store.create_toast({
      title: "Error",
      message: "Unexpected error occurred. Please try again.",
      color: "bg-red-500",
    });
  }
};

const handle_edit_user = async ({ row, id }) => {
  api_store.users_create_or_edit_mode = "edit";
  try {
    const response = await $fetch(`/api/users/${id}`, {
      method: "GET",
    });

    console.log("EDIT USER RESPONSE: ", response);

    if (response.status === "error") {
      console.error("User edit failed:", response.error);
      api_store.create_toast({
        title: "Error",
        message: "User was not edited.",
        color: "bg-orange-500",
      });
      return;
    }

    console.log("FETCHED USER SINGLE: ", response);

    creating_user.value = response.one_user;

    api_store.show_modal("show_create_user");

    // fetch the users again
    await fetch_users();
  } catch (err) {
    console.error("Unexpected error:", err);
    api_store.create_toast({
      title: "Error",
      message: "Unexpected error occurred. Please try again.",
      color: "bg-red-500",
    });
  }
};

const handle_delete = async (user_id) => {
  const id = user_id;
  try {
    const response = await $fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    console.log("DELETE USER RESPONSE: ", response);

    if (response.status === "error") {
      console.error("User deletion failed:", response.error);
      api_store.create_toast({
        title: "Error",
        message: "User was not deleted.",
        color: "bg-orange-500",
      });
      return;
    }

    console.log("User deleted successfully, displaying success toast.");
    api_store.create_toast({
      title: `Success`,
      message: "User has been deleted.",
      color: "bg-emerald-500",
    });

    // fetch the users again
    await fetch_users();
  } catch (err) {
    console.error("Unexpected error:", err);
    api_store.create_toast({
      title: "Error",
      message: "Unexpected error occurred. Please try again.",
      color: "bg-red-500",
    });
  }
};

const users_table = useState("users_table", () => []);

const fetch_users = async () => {
  try {
    const response = await $fetch("/api/users/list", {
      method: "GET",
      params: {
        query: queryObject.value, // send the whole object as a single "query" param
        page: page.value || api_store.table_pagination_settings?.page,
        limit: limit.value || api_store.table_pagination_settings?.limit,
      },
    });

    console.log("USERS RETURNED: ", response.users);

    users_table.value = response.users;
    total_count.value = response.total_count;
  } catch (err) {
    console.error("Unexpected error:", err);

    if (import.meta.client) {
      alert("An unexpected error occurred: ", err);
    }
  }
};

const filtered_users = computed(() => {
  if (api_store.users_filter === "All") {
    return users_table.value;
  } else if (api_store.users_filter === "super") {
    return users_table.value.filter((user) => user.role === "super");
  } else if (api_store.users_filter === "admin") {
    return users_table.value.filter((user) => user.role === "admin");
  } else if (api_store.users_filter === "user") {
    return users_table.value.filter((user) => user.role === "user");
  }
});

onMounted(async () => {
  await fetch_users();
});

const queryObject = ref({});

const page = ref(api_store.table_pagination_settings?.page || 1);
const limit = ref(api_store.table_pagination_settings?.limit || 20); // default items per page
const total_count = ref(0);

watch([page, limit, queryObject], fetch_users, { immediate: true });
</script>

<template>
  <div class="w-full flex-auto min-h-0 min-w-0 overflow-auto bg-base-100">
    <div
      class="flex flex-row p-3 gap-3 bg-base-100 items-center w-full overflow-x-auto"
    >
      <button
        @click="api_store.users_filter = 'All'"
        :class="[
          'btn max-sm:btn-sm',
          api_store.users_filter === 'All'
            ? 'bg-primary text-base-content hover:bg-primary'
            : '',
        ]"
      >
        All
      </button>
      <button
        @click="api_store.users_filter = 'super'"
        :class="[
          'btn max-sm:btn-sm',
          api_store.users_filter === 'super'
            ? 'bg-primary text-base-content hover:bg-primary'
            : '',
        ]"
      >
        Super Admin
      </button>
      <button
        @click="api_store.users_filter = 'admin'"
        :class="[
          'btn max-sm:btn-sm',
          api_store.users_filter === 'admin'
            ? 'bg-primary text-base-content hover:bg-primary'
            : '',
        ]"
      >
        Admin
      </button>
      <button
        @click="api_store.users_filter = 'user'"
        :class="[
          'btn max-sm:btn-sm',
          api_store.users_filter === 'user'
            ? 'bg-primary text-base-content hover:bg-primary'
            : '',
        ]"
      >
        User
      </button>

      <ExportCSV :data="users_table" dataset="Users" />

      <XModal shower="show_create_user">
        <template #open-button>
          <button
            v-if="
              api_store?.session?.role === 'admin' ||
              api_store?.session?.role === 'super'
            "
            @click="handle_shower('create')"
            class="btn max-sm:btn-sm btn-info text-base-content"
          >
            <span class="mr-2">
              <span> Create User </span>
            </span>
            <svg
              xmlns="http://www.w3.org/
              2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21"
              />
            </svg>
          </button>
        </template>
        <template #body>
          <FormKit
            id="create-user-form"
            type="form"
            incomplete-message="Please review the form and complete the required fields."
            incomplete-messages-class="text-base-content font-semibold"
            @submit="
              api_store.users_create_or_edit_mode === 'create'
                ? submit_create_user()
                : submit_update_user()
            "
            form-class="w-full flex flex-col gap-5 p-5 rounded-xl bg-base-100 shadow-md"
            wrapper-class="w-full max-w-full"
            :actions="true"
            :submit-attrs="{
              inputClass: 'bg-blue-500 p-3 rounded w-full text-base-content ',
              wrapperClass: '',
              'data-theme': `dark`,
              help: '',
              ignore: false,
            }"
          >
            <template #default="{ state }">
              <h1 class="text-xl capitalize">
                {{ api_store.users_create_or_edit_mode }} User
              </h1>
              <div class="grid grid-cols-2 gap-5">
                <FormKit
                  message-class="text-base-content"
                  type="select"
                  name="role"
                  label="Role"
                  validation="required"
                  outer-class="$reset
                col-span-2"
                  wrapper-class="$reset w-full col-span-2"
                  :input-class="`select select-bordered w-full`"
                  v-model="creating_user.role"
                  :options="[
                    {
                      label: 'Select Role',
                      value: '',
                    },
                    {
                      label: 'Super Admin',
                      value: 'super',
                      attrs: {
                        disabled: api_store.session.role !== 'super',
                      },
                    },
                    {
                      label: 'Admin',
                      value: 'admin',
                      attrs: {
                        disabled:
                          api_store.session.role !== 'super' &&
                          api_store.session.role !== 'admin',
                      },
                    },
                    {
                      label: 'User',
                      value: 'user',
                    },
                  ]"
                />
                <FormKit
                  message-class="text-base-content"
                  type="text"
                  name="first_name"
                  label="First Name"
                  validation="required"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_user.first_name"
                />

                <FormKit
                  message-class="text-base-content"
                  type="text"
                  name="last_name"
                  label="Last Name"
                  validation="required"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_user.last_name"
                />

                <div class="col-span-2 flex flex-row gap-5 items-end">
                  <FormKit
                    message-class="text-base-content"
                    type="email"
                    name="email"
                    label="Email"
                    validation="required|email"
                    outer-class="$reset flex-1"
                    wrapper-class="$reset w-full"
                    :input-class="`input input-bordered w-full`"
                    v-model="creating_user.email"
                  />

                  <FormKit
                    v-if="show_email_secondary"
                    message-class="text-base-content"
                    type="email"
                    name="email_secondary"
                    label="Secondary Email"
                    validation="required|email"
                    outer-class="$reset flex-1"
                    wrapper-class="$reset w-full"
                    :input-class="`input input-bordered w-full`"
                    v-model="creating_user.email_secondary"
                  />

                  <button
                    @click="toggle_email_secondary"
                    type="button"
                    class="btn text-base-content"
                    :class="`${
                      show_email_secondary ? 'btn-error' : 'btn-secondary'
                    }`"
                  >
                    {{ show_email_secondary ? "Remove" : "Add" }}
                    Secondary Email
                  </button>
                </div>

                <!-- <pre>
                  {{ creating_user }}
                </pre> -->

                <div class="col-span-2 flex flex-row gap-5 items-end">
                  <FormKit
                    message-class="text-base-content"
                    type="tel"
                    name="phone"
                    label="Phone"
                    outer-class="$reset flex-1"
                    wrapper-class="$reset w-full"
                    :input-class="`input input-bordered w-full`"
                    v-model="creating_user.phone"
                  />

                  <FormKit
                    v-if="show_phone_secondary"
                    message-class="text-base-content"
                    type="tel"
                    name="phone_secondary"
                    label="Secondary Phone"
                    validation="required"
                    outer-class="$reset flex-1"
                    wrapper-class="$reset w-full"
                    :input-class="`input input-bordered w-full`"
                    v-model="creating_user.phone_secondary"
                  />

                  <button
                    @click="toggle_phone_secondary"
                    type="button"
                    class="btn text-base-content"
                    :class="`${
                      show_phone_secondary ? 'btn-error' : 'btn-secondary'
                    }`"
                  >
                    {{ show_phone_secondary ? "Remove" : "Add" }}
                    Secondary Phone
                  </button>
                </div>

                <FormKit
                  message-class="text-base-content"
                  type="text"
                  autocomplete="username"
                  name="api_username"
                  label="Username"
                  validation="required"
                  outer-class="$reset col-span-2"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_user.api_username"
                />

                <FormKit
                  message-class="text-base-content"
                  type="password"
                  autocomplete="new-password"
                  name="api_key"
                  label="Password"
                  :validation="
                    api_store.users_create_or_edit_mode === 'create'
                      ? 'required'
                      : ''
                  "
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_user.api_key"
                />

                <FormKit
                  message-class="text-base-content"
                  type="password"
                  autocomplete="new-password"
                  name="api_key_confirm"
                  label="Confirm Password"
                  :validation="
                    api_store.users_create_or_edit_mode === 'create'
                      ? 'required|confirm'
                      : 'confirm'
                  "
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_user.api_key_confirmed"
                />

                <FormKit
                  message-class="text-base-content"
                  type="select"
                  name="active"
                  label="User Status"
                  validation="required"
                  outer-class="$reset col-span-2"
                  wrapper-class="$reset w-full"
                  :input-class="`select select-bordered w-full`"
                  v-model="creating_user.active"
                  :options="[
                    {
                      label: '- Choose Status -',
                      value: '',
                    },
                    {
                      label: 'Active - User will be able to login',
                      value: 'active',
                    },
                    {
                      label: 'Suspended - User will not be able to login',
                      value: 'suspended',
                    },
                  ]"
                />
              </div>
            </template>
          </FormKit>
        </template>
      </XModal>
    </div>

    <div class="w-full flex-auto min-h-0 min-w-0 overflow-auto bg-base-100">
      <!-- <Loading v-if="loading" /> -->
      <XTable
        belongsTo="users"
        :tableData="filtered_users"
        :totalCount="total_count"
        @edit="handle_edit_user"
        @delete="handle_delete"
        @update:page="page = $event"
        @update:limit="limit = $event"
      ></XTable>
    </div>
  </div>
</template>
