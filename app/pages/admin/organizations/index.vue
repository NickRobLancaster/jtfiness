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
  creating_organization.value = {
    _id: "",
    name: "",
    location: "",
    type: "",
    populations_served: [],
  };
};

const handle_shower = (mode) => {
  api_store.show_modal("show_create_organization");
  api_store.organizations_create_or_edit_mode = mode;
  if (mode === "create") {
    reset_form();
  }
};

const creating_organization = ref({
  _id: "",
  name: "",
  location: "",
  type: "",
  populations_served: [],
});

const submit_create_organization = async () => {
  delete creating_organization.value._id;

  try {
    const response = await $fetch("/api/organizations/create", {
      method: "POST",
      body: creating_organization.value,
    });

    console.log("CREATED USER RESPONSE: ", response);

    if (response.status === "error") {
      console.error("Organization creation failed:", response.error);
      api_store.create_toast({
        title: "Error",
        message: "Organization was not created.",
        color: "bg-orange-500",
      });
      return;
    }

    console.log("Organization created successfully, displaying success toast.");
    api_store.create_toast({
      title: `Success`,
      message: "Organization has been created.",
      color: "bg-emerald-500",
    });

    // clear the form
    reset_form();

    // close the modal
    api_store.hide_modal("show_create_organization");

    // fetch the organizations again
    await fetch_organizations();
  } catch (err) {
    console.error("Unexpected error:", err);
    if (import.meta.client) {
      alert("An unexpected error occurred.");
      api_store.create_toast({
        title: "Error",
        message: "Unexpected error occurred. Please try again.",
        color: "bg-red-500",
      });
    }
  }
};

const submit_update_organization = async () => {
  const id = creating_organization.value._id;

  try {
    const response = await $fetch(`/api/organizations/${id}`, {
      method: "PUT",
      body: creating_organization.value,
    });

    console.log("EDITED USER RESPONSE: ", response);

    if (response.status === "error") {
      console.error("Organization edit failed:", response.error);
      api_store.create_toast({
        title: "Error",
        message: "Organization was not edited.",
        color: "bg-orange-500",
      });
      return;
    }

    console.log("Organization edited successfully, displaying success toast.");
    api_store.create_toast({
      title: `Success`,
      message: "Organization has been edited.",
      color: "bg-emerald-500",
    });

    // clear the form
    reset_form();

    // close the modal
    api_store.hide_modal("show_create_organization");

    // fetch the organizations again
    await fetch_organizations();
  } catch (err) {
    console.error("Unexpected error:", err);
    if (import.meta.client) {
      alert("An unexpected error occurred.");
      api_store.create_toast({
        title: "Error",
        message: "Unexpected error occurred. Please try again.",
        color: "bg-red-500",
      });
    }
  }
};

const handle_edit_organization = async ({ row, id }) => {
  api_store.organizations_create_or_edit_mode = "edit";

  try {
    const response = await $fetch(`/api/organizations/${id}`, {
      method: "GET",
    });

    console.log("EDIT USER RESPONSE: ", response);

    if (response.status === "error") {
      console.error("Organization edit failed:", response.error);
      api_store.create_toast({
        title: "Error",
        message: "Organization was not edited.",
        color: "bg-orange-500",
      });
      return;
    }

    creating_organization.value = response.one_organization;
    api_store.show_modal("show_create_organization");
    api_store.organizations_create_or_edit_mode = "edit";
  } catch (err) {
    console.error("Unexpected error:", err);
    if (import.meta.client) {
      alert("An unexpected error occurred.");
      api_store.create_toast({
        title: "Error",
        message: "Unexpected error occurred. Please try again.",
        color: "bg-red-500",
      });
    }
  }
};

const handle_delete = async (organization_id) => {
  const id = organization_id;
  try {
    const response = await $fetch(`/api/organizations/${id}`, {
      method: "DELETE",
    });

    console.log("DELETE USER RESPONSE: ", response);

    if (response.status === "error") {
      console.error("Organization deletion failed:", response.error);
      api_store.create_toast({
        title: "Error",
        message: "Organization was not deleted.",
        color: "bg-orange-500",
      });
      return;
    }

    console.log("Organization deleted successfully, displaying success toast.");
    api_store.create_toast({
      title: `Success`,
      message: "Organization has been deleted.",
      color: "bg-emerald-500",
    });

    // fetch the organizations again
    await fetch_organizations();
  } catch (err) {
    console.error("Unexpected error:", err);
    if (import.meta.client) {
      alert("An unexpected error occurred.");
      api_store.create_toast({
        title: "Error",
        message: "Unexpected error occurred. Please try again.",
        color: "bg-red-500",
      });
    }
  }
};

const organizations_table = useState("organizations_table", () => []);

const fetch_organizations = async () => {
  try {
    const response = await $fetch("/api/organizations/list", {
      method: "GET",
      params: {
        query: queryObject.value, // send the whole object as a single "query" param
        page: page.value || api_store.table_pagination_settings?.page,
        limit: limit.value || api_store.table_pagination_settings?.limit,
      },
    });

    console.log("ORGANIZATIONS RETURNED: ", response.organizations);

    organizations_table.value = response.organizations;
    total_count.value = response.total_count;
  } catch (err) {
    console.error("Unexpected error:", err);

    if (import.meta.client) {
      alert("An unexpected error occurred:", err);
    }
  }
};
onMounted(async () => {
  await fetch_organizations();
});

const queryObject = ref({});

const page = ref(api_store.table_pagination_settings?.page || 1);
const limit = ref(api_store.table_pagination_settings?.limit || 20); // default items per page
const total_count = ref(0);

watch([page, limit, queryObject], fetch_organizations, { immediate: true });
</script>

<template>
  <div class="bg-base-300 flex flex-col gap-3 flex-auto min-h-0 min-w-0">
    <div
      class="flex flex-row p-3 gap-3 bg-base-100 items-center w-full overflow-x-auto"
    >
      <!-- <button class="btn">All</button> -->

      <ExportCSV :data="organizations_table" dataset="Organizations" />

      <XModal shower="show_create_organization">
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
              <span> Create Organization </span>
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
            id="create-organization-form"
            type="form"
            incomplete-message="Please review the form and complete the required fields."
            incomplete-messages-class="text-base-content font-semibold"
            @submit="
              api_store.organizations_create_or_edit_mode === 'create'
                ? submit_create_organization()
                : submit_update_organization()
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
              <h1 class="text-xl">Create Organization</h1>
              <div class="grid grid-cols-2 gap-5">
                <FormKit
                  message-class="text-base-content"
                  type="text"
                  name="organization_name"
                  label="Name"
                  validation="required"
                  outer-class="$reset col-span-2"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_organization.name"
                />

                <!-- TODO: Need to make a reference -->
                <FormKit
                  name="organization_location"
                  message-class="text-base-content"
                  type="text"
                  label="Location"
                  outer-class="$reset col-span-2"
                  wrapper-class="$reset w-full"
                  :input-class="`input input-bordered w-full`"
                  v-model="creating_organization.location"
                />
                <FormKit
                  message-class="text-base-content"
                  type="select"
                  name="organization_type"
                  label="Type"
                  validation="required"
                  outer-class="$reset
                col-span-2"
                  wrapper-class="$reset w-full col-span-2"
                  :input-class="`select select-bordered w-full`"
                  v-model="creating_organization.type"
                  :options="[
                    {
                      label: 'Select Organization Type',
                      value: '',
                    },
                    { label: 'Harm Reduction', value: 'Harm Reduction' },
                    { label: 'Public Health', value: 'admin' },
                    {
                      label: 'Mutual Aid',
                      value: 'Mutual Aid',
                    },
                    {
                      label: 'Community Org/Non-Profit',
                      value: 'Community Org/Non-Profit',
                    },
                    {
                      label: 'Drug User Union',
                      value: 'Drug User Union',
                    },
                    {
                      label: 'Tribal',
                      value: 'Tribal',
                    },
                  ]"
                />

                <div class="col-span-2">
                  <XMultiSelect
                    v-model="creating_organization.populations_served"
                    fieldLabel="Populations Served"
                    :selectOptions="[
                      {
                        label: 'Unhoused People',
                        value: 'Unhoused People',
                      },
                      {
                        label: 'LGBTQIA+',
                        value: 'LGBTQIA+',
                      },
                      {
                        label: 'Party and Play',
                        value: 'Party and Play',
                      },
                      {
                        label: 'Sex Workers',
                        value: 'Sex Workers',
                      },
                      {
                        label: 'Recently Released from Incarceration',
                        value: 'Recently Released from Incarceration',
                      },
                      {
                        label: 'Recently Released from Treatment',
                        value: 'Recently Released from Treatment',
                      },
                      {
                        label: 'Youth(24 years and younger)',
                        value: 'Youth(24 years and younger)',
                      },
                      {
                        label: 'People in Recovery',
                        value: 'People in Recovery',
                      },
                    ]"
                  ></XMultiSelect>
                </div>

                <!-- <pre>
                  {{ creating_organization }}
                </pre> -->
              </div>
            </template>
          </FormKit>
        </template>
      </XModal>
    </div>

    <div class="w-full flex-auto min-h-0 min-w-0 overflow-auto bg-base-100">
      <!-- <Loading v-if="loading" /> -->
      <XTable
        belongsTo="organizations"
        :tableData="organizations_table"
        :totalCount="total_count"
        @edit="handle_edit_organization"
        @delete="handle_delete"
        @update:page="page = $event"
        @update:limit="limit = $event"
      ></XTable>
    </div>
  </div>
</template>
