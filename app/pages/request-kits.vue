<script setup>
definePageMeta({
  ssr: true,
  title: "Request Drug Testing Kits",
  meta: [{ name: "description", content: "Request drug testing kits" }],
});

const api_store = useApiStore();
const websiteStore = useWebsiteStore();

const initial_form_state = () => ({
  how_can_we_assist: "",
  organization_type: "",
  role: "",
  organization_name: "",
  organization_street_address: "",
  organization_address_2: "",
  organization_city: "",
  organization_state: "",
  organization_zip: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  opt_in: false,
});

const creating_request_kit = ref(initial_form_state());
const is_submitting = ref(false);

const close_modal = () => websiteStore.toggleHideItem("show_request_kits");

const submit_create_request_kit = async () => {
  if (is_submitting.value) return;
  is_submitting.value = true;

  try {
    const response = await $fetch("/api/drug-tests/kit-requests/create", {
      method: "POST",
      body: creating_request_kit.value,
    });

    // expected shape: { status: "success" | "error", message: string }
    if (response?.status === "success") {
      close_modal();
      creating_request_kit.value = initial_form_state();

      api_store.create_toast({
        title: "Success",
        message: response?.message || "Kit request created successfully.",
        color: "bg-green-600",
      });
    } else {
      api_store.create_toast({
        title: "Error",
        message:
          response?.message ||
          "Kit request could not be created. Please try again.",
        color: "bg-orange-500",
      });
    }
  } catch (error) {
    console.error("Error submitting request kit:", error);
    api_store.create_toast({
      title: "Error",
      message: "A server error occurred while creating the kit request.",
      color: "bg-orange-500",
    });
  } finally {
    is_submitting.value = false;
  }
};
</script>

<template>
  <div
    class="w-screen min-h-screen flex flex-col items-center justify-center p-10 text-center"
  >
    <div class="flex flex-col items-center justify-center space-y-8">
      <h1 class="text-4xl font-bold">Request Kits</h1>
      <p class="text-lg">Get started by requesting a testing kit.</p>

      <div class="flex flex-row items-center">
        <button
          @click="websiteStore.toggleShowItem('show_request_kits')"
          class="btn btn-primary text-base-content"
        >
          <span> Start Request </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z"
            />
          </svg>
        </button>

        <XModal2 shower="show_request_kits">
          <template #body>
            <FormKit
              id="create-request-kit-form"
              type="form"
              :incomplete-message="false"
              @submit="submit_create_request_kit"
              form-class="w-full text-left flex flex-col gap-5 p-5 rounded-xl bg-base-100 shadow-md"
              wrapper-class="w-full max-w-full"
              :actions="false"
              :submit-attrs="{
                inputClass: 'btn btn-primary text-base-content ml-auto',
                wrapperClass: 'w-full flex flex-row gap-3',
                disabled: is_submitting,
                'data-theme': `dark`,
                help: '',
                ignore: true,
              }"
            >
              <template #default="{ state }">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
                  <h3 class="col-span-12 text-2xl font-bold text-left">
                    Request Kits
                  </h3>

                  <FormKit
                    message-class="text-base-content"
                    type="radio"
                    name="How can we assist you today?"
                    :label="'How can we assist you today?'"
                    validation="required"
                    outer-class="$reset col-span-12"
                    wrapper-class="$reset flex flex-row flex-wrap gap-3 w-full col-span-12"
                    :input-class="`radio radio-bordered`"
                    v-model="creating_request_kit.how_can_we_assist"
                    :options="[
                      {
                        label:
                          'Interested in a Startup Kit (for launching new programs)',
                        value:
                          'Interested in a Startup Kit (for launching new programs)',
                      },
                      {
                        label: 'Seeking general information',
                        value: 'Seeking general information',
                      },
                      {
                        label: 'Inquiring about a specific result',
                        value: 'Inquiring about a specific result',
                      },
                    ]"
                  />

                  <FormKit
                    message-class="text-base-content"
                    type="select"
                    name="Type of organization"
                    :label="'Which type of organization do you represent?'"
                    validation="required"
                    outer-class="$reset col-span-12"
                    wrapper-class="$reset w-full col-span-12"
                    :input-class="`select select-bordered w-full`"
                    v-model="creating_request_kit.organization_type"
                    :options="[
                      { label: '- Choose Option -', value: '' },
                      {
                        label: 'Harm Reduction Program',
                        value: 'Harm Reduction Program',
                      },
                      { label: 'Drug User Union', value: 'Drug User Union' },
                      { label: 'Media', value: 'Media' },
                      {
                        label: 'Health Department',
                        value: 'Health Department',
                      },
                      { label: 'Researchers', value: 'Researchers' },
                      { label: 'Someone else', value: 'Someone else' },
                    ]"
                  />

                  <FormKit
                    message-class="text-base-content"
                    type="select"
                    name="What is your role"
                    :label="'What is your role in the organization?'"
                    validation="required"
                    outer-class="$reset col-span-12"
                    wrapper-class="$reset w-full col-span-12"
                    :input-class="`select select-bordered w-full`"
                    v-model="creating_request_kit.role"
                    :options="[
                      { label: '- Choose Option -', value: '' },
                      { label: 'Staff', value: 'Staff' },
                      { label: 'Volunteer', value: 'Volunteer' },
                      { label: 'Student', value: 'Student' },
                      { label: 'Participant', value: 'Participant' },
                      { label: 'Other', value: 'Other' },
                    ]"
                  />

                  <FormKit
                    message-class="text-base-content"
                    type="text"
                    name="Organization Name"
                    :label="'Organization Name'"
                    validation="required"
                    outer-class="$reset col-span-12"
                    wrapper-class="$reset w-full col-span-12"
                    :input-class="`input input-bordered w-full`"
                    v-model="creating_request_kit.organization_name"
                  />

                  <div
                    class="col-span-12 grid-cols-1 md:grid md:grid-cols-12 gap-5"
                  >
                    <h3 class="col-span-12 text-2xl font-bold text-left">
                      Organization Address
                    </h3>

                    <FormKit
                      message-class="text-base-content"
                      type="text"
                      name="Organization Street Address"
                      :label="'Street Address'"
                      validation="required"
                      outer-class="$reset col-span-8"
                      wrapper-class="$reset w-full col-span-8"
                      :input-class="`input input-bordered w-full`"
                      v-model="creating_request_kit.organization_street_address"
                    />

                    <FormKit
                      message-class="text-base-content"
                      type="text"
                      name="Organization Street Address 2"
                      :label="'Suite / Unit'"
                      outer-class="$reset col-span-4"
                      wrapper-class="$reset w-full col-span-4"
                      :input-class="`input input-bordered w-full`"
                      v-model="creating_request_kit.organization_address_2"
                    />

                    <FormKit
                      message-class="text-base-content"
                      type="text"
                      name="Organization City"
                      :label="'City'"
                      validation="required"
                      outer-class="$reset col-span-5"
                      wrapper-class="$reset w-full col-span-5"
                      :input-class="`input input-bordered w-full`"
                      v-model="creating_request_kit.organization_city"
                    />

                    <FormKit
                      message-class="text-base-content"
                      type="text"
                      name="Organization State"
                      :label="'State'"
                      validation="required"
                      outer-class="$reset col-span-4"
                      wrapper-class="$reset w-full col-span-4"
                      :input-class="`input input-bordered w-full`"
                      v-model="creating_request_kit.organization_state"
                    />

                    <FormKit
                      message-class="text-base-content"
                      type="text"
                      name="Organization Zip"
                      :label="'Zip Code'"
                      validation="required"
                      outer-class="$reset col-span-3"
                      wrapper-class="$reset w-full col-span-3"
                      :input-class="`input input-bordered w-full`"
                      v-model="creating_request_kit.organization_zip"
                    />
                  </div>

                  <div
                    class="col-span-12 grid-cols-1 md:grid md:grid-cols-12 gap-5"
                  >
                    <h3 class="col-span-12 text-2xl font-bold text-left">
                      Who Should We Contact?
                    </h3>

                    <FormKit
                      message-class="text-base-content"
                      type="text"
                      name="First Name"
                      :label="'First Name'"
                      validation="required"
                      outer-class="$reset col-span-6"
                      wrapper-class="$reset w-full col-span-6"
                      :input-class="`input input-bordered w-full`"
                      v-model="creating_request_kit.first_name"
                    />

                    <FormKit
                      message-class="text-base-content"
                      type="text"
                      name="Last Name"
                      :label="'Last Name'"
                      validation="required"
                      outer-class="$reset col-span-6"
                      wrapper-class="$reset w-full col-span-6"
                      :input-class="`input input-bordered w-full`"
                      v-model="creating_request_kit.last_name"
                    />

                    <FormKit
                      message-class="text-base-content"
                      type="email"
                      name="Email"
                      :label="'Email'"
                      validation="required|email"
                      outer-class="$reset col-span-6"
                      wrapper-class="$reset w-full col-span-6"
                      :input-class="`input input-bordered w-full`"
                      v-model="creating_request_kit.email"
                    />

                    <FormKit
                      message-class="text-base-content"
                      type="tel"
                      name="Phone"
                      :label="'Phone'"
                      validation="required"
                      outer-class="$reset col-span-6"
                      wrapper-class="$reset w-full col-span-6"
                      :input-class="`input input-bordered w-full`"
                      v-model="creating_request_kit.phone"
                    />

                    <FormKit
                      message-class="text-base-content"
                      type="checkbox"
                      name="Opt In"
                      validation="required"
                      label="I consent to receive communications from IE Harm Reduction via: SMS, Email, and Phone Calls and that I can opt out at any time"
                      outer-class="$reset col-span-12"
                      :value="false"
                      wrapper-class="$reset flex flex-row gap-3 w-full col-span-12"
                      :input-class="`checkbox checkbox-circle text-base-content`"
                      v-model="creating_request_kit.opt_in"
                    />

                    <div
                      class="col-span-12 flex flex-row p-5 items-center gap-5 w-full"
                    >
                      <button
                        type="button"
                        @click="close_modal()"
                        class="ml-auto btn btn-error text-base-content"
                        :disabled="is_submitting"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        class="btn btn-success text-base-content"
                        :disabled="is_submitting"
                      >
                        <span v-if="!is_submitting">Submit</span>
                        <span
                          v-else
                          class="loading loading-spinner loading-sm"
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>
              </template>
            </FormKit>
          </template>
        </XModal2>
      </div>
    </div>
  </div>
</template>
