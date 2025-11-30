<template>
  <div class="min-h-screen bg-base-100 text-base-content flex flex-col">
    <!-- hero full-screen image -->
    <section
      class="min-h-[70vh] w-full bg-cover bg-center bg-no-repeat flex items-center"
      :style="{ backgroundImage: `url('${hero_image_url}')` }"
    >
      <div class="w-full bg-black/60">
        <div
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row gap-10 md:gap-14 items-center"
        >
          <!-- hero copy -->
          <div class="flex-1">
            <p
              class="uppercase tracking-[0.25em] text-[0.65rem] md:text-xs text-primary/80 font-semibold mb-4"
            >
              contact • jt fitness
            </p>

            <h1
              class="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight md:leading-[1.1] max-w-2xl"
            >
              Ready to get started?
              <br />
              <span class="text-primary">Reach out</span> to Justin today.
            </h1>

            <p
              class="mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-base-100/80 max-w-xl"
            >
              Have questions about coaching, in-person sessions, or online
              programming? Send a message or call directly and Justin will
              follow up with next steps.
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <a
                :href="contact_phone_href"
                class="btn btn-primary rounded-full px-5 md:px-7 text-sm md:text-base font-semibold"
              >
                Call Justin: {{ contact_phone_display }}
              </a>

              <a
                :href="contact_email_href"
                class="btn btn-ghost border border-base-300 rounded-full px-5 md:px-7 text-sm md:text-base"
              >
                Email Justin
              </a>
            </div>

            <div
              class="mt-5 text-xs sm:text-sm text-base-100/70 flex flex-col sm:flex-row gap-2 sm:items-center"
            >
              <p>Typical response within 24 hours.</p>
              <span
                class="hidden sm:inline-block mx-2 h-1 w-1 rounded-full bg-base-100/50"
              />
              <p>In-person coaching available in Southern California.</p>
            </div>
          </div>

          <!-- hero contact summary card -->
          <div
            class="w-full md:w-[320px] lg:w-[360px] rounded-3xl border border-base-300/80 bg-base-100/95/80 shadow-xl p-5 sm:p-6"
          >
            <h2 class="text-lg sm:text-xl font-semibold mb-4">
              Direct contact details
            </h2>
            <div class="space-y-4 text-sm sm:text-base">
              <div class="space-y-1">
                <p class="text-xs uppercase tracking-[0.18em] text-primary/80">
                  phone
                </p>
                <a
                  :href="contact_phone_href"
                  class="link link-hover font-semibold"
                >
                  {{ contact_phone_display }}
                </a>
                <p class="text-xs text-base-content/70">
                  Tap to call or press and hold to copy.
                </p>
              </div>

              <div class="space-y-1">
                <p class="text-xs uppercase tracking-[0.18em] text-primary/80">
                  email
                </p>
                <a
                  :href="contact_email_href"
                  class="link link-hover font-semibold break-all"
                >
                  {{ contact_email }}
                </a>
                <p class="text-xs text-base-content/70">
                  Tap to start a new message.
                </p>
              </div>

              <div class="divider my-3" />

              <div class="space-y-1 text-xs text-base-content/70">
                <p class="font-semibold text-sm text-base-content">
                  Coaching hours
                </p>
                <p>Sessions by appointment only.</p>
                <p>Online check-ins available during the week.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <main class="flex-1">
      <!-- contact body -->
      <section class="bg-base-200/40 border-y border-base-300">
        <div
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16 grid lg:grid-cols-2 gap-10 md:gap-14 items-start"
        >
          <!-- left: text + quick info -->
          <div class="space-y-6">
            <div>
              <p
                class="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2"
              >
                how to reach us
              </p>
              <h2 class="text-2xl md:text-3xl font-bold tracking-tight">
                Tell us where you are and what you need help with.
              </h2>
              <p class="mt-4 text-sm sm:text-base text-base-content/80">
                Share your goals, training history, and any current limitations.
                Justin will review your message and reply with an honest
                recommendation on next steps – whether that is 1-on-1 coaching,
                online programming, or another option.
              </p>
            </div>

            <div class="grid sm:grid-cols-2 gap-4 text-sm sm:text-base">
              <div class="card bg-base-100/80 border border-base-300/80">
                <div class="card-body p-4 sm:p-5">
                  <p
                    class="text-[0.7rem] uppercase tracking-[0.18em] text-primary/80 font-semibold"
                  >
                    call or text
                  </p>
                  <a
                    :href="contact_phone_href"
                    class="mt-2 text-base font-semibold link link-hover"
                  >
                    {{ contact_phone_display }}
                  </a>
                  <p class="mt-2 text-xs text-base-content/70">
                    Best for quick questions, scheduling, or checking current
                    openings.
                  </p>
                </div>
              </div>

              <div class="card bg-base-100/80 border border-base-300/80">
                <div class="card-body p-4 sm:p-5">
                  <p
                    class="text-[0.7rem] uppercase tracking-[0.18em] text-primary/80 font-semibold"
                  >
                    email
                  </p>
                  <a
                    :href="contact_email_href"
                    class="mt-2 text-base font-semibold link link-hover break-all"
                  >
                    {{ contact_email }}
                  </a>
                  <p class="mt-2 text-xs text-base-content/70">
                    Best for sharing your background, goals, and preferred
                    coaching style.
                  </p>
                </div>
              </div>
            </div>

            <div class="text-xs sm:text-sm text-base-content/70 space-y-1.5">
              <p>
                Please include any injuries, training experience, and schedule
                constraints so we can recommend the right path for you.
              </p>
            </div>
          </div>

          <!-- right: contact form -->
          <div
            class="rounded-3xl border border-base-300/80 bg-base-100/90 p-5 sm:p-6 md:p-8 shadow-lg"
          >
            <h3 class="text-lg sm:text-xl font-semibold">Send a message</h3>
            <p class="mt-2 text-sm sm:text-base text-base-content/80">
              Fill this out and Justin will respond with follow-up questions and
              potential next steps.
            </p>

            <form class="mt-6 space-y-4" @submit.prevent>
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-sm">Name</span>
                </label>
                <input
                  v-model="form_data.name"
                  type="text"
                  placeholder="Your full name"
                  class="input input-bordered w-full text-sm"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text text-sm">Email</span>
                </label>
                <input
                  v-model="form_data.email"
                  type="email"
                  placeholder="you@example.com"
                  class="input input-bordered w-full text-sm"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text text-sm">Phone (optional)</span>
                </label>
                <input
                  v-model="form_data.phone"
                  type="tel"
                  placeholder="Where can we reach you?"
                  class="input input-bordered w-full text-sm"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text text-sm"
                    >What are you looking for?</span
                  >
                </label>
                <textarea
                  v-model="form_data.message"
                  rows="4"
                  placeholder="Share your goals, training history, and any current limitations."
                  class="textarea textarea-bordered w-full text-sm"
                />
              </div>

              <button type="submit" class="btn btn-primary w-full mt-2">
                Submit (placeholder)
              </button>

              <p class="mt-3 text-[0.7rem] text-base-content/70">
                This form is a front-end placeholder. Connect it to your
                preferred email, CRM, or backend endpoint when you are ready.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>

    <!-- footer -->
    <footer class="border-t border-base-300 bg-base-100">
      <div
        class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm text-base-content/70"
      >
        <div class="space-y-1">
          <p class="font-semibold text-base-content/80">
            JT FITNESS © {{ new Date().getFullYear() }}
          </p>
          <p>
            Coaching by Justin •
            <a :href="contact_phone_href" class="link link-hover">
              {{ contact_phone_display }}
            </a>
            •
            <a :href="contact_email_href" class="link link-hover">
              {{ contact_email }}
            </a>
          </p>
        </div>
        <div class="flex flex-wrap gap-3 md:gap-4">
          <NuxtLink to="/" class="link link-hover">Home</NuxtLink>
          <NuxtLink to="/method" class="link link-hover">Method</NuxtLink>
          <NuxtLink to="/coaches" class="link link-hover">Coaches</NuxtLink>
          <NuxtLink to="/results" class="link link-hover">Results</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const hero_image_url = "/images/squat_weights.jpg";

const contact_phone_display = "951-385-1941";
const contact_phone_href = "tel:19513851941";

const contact_email = "3jtfitness3@gmail.com";
const contact_email_href = `mailto:${contact_email}`;

const form_data = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});
</script>
