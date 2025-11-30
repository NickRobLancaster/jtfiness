<template>
  <div class="min-h-screen bg-base-100 text-base-content flex flex-col">
    <!-- hero -->
    <section
      class="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center"
      :style="{ backgroundImage: `url('${hero_image_url}')` }"
    >
      <div class="w-full bg-black/70">
        <div
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row gap-10 md:gap-16 items-center text-base-100"
        >
          <!-- hero copy -->
          <div class="flex-1">
            <p
              class="uppercase tracking-[0.25em] text-[0.65rem] md:text-xs text-primary/80 font-semibold mb-4"
            >
              jt fitness • free guides
            </p>

            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight md:leading-[1.1] max-w-3xl"
            >
              Download free guides
              <br />
              that actually move the needle.
            </h1>

            <p
              class="mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-base-100/90 max-w-xl"
            >
              These resources walk you through the same principles we use with
              coaching clients – so you can start getting better results in the
              gym, the kitchen, and your day-to-day routine.
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <NuxtLink
                to="/work-with-us"
                class="btn btn-primary rounded-full px-5 md:px-7 text-sm md:text-base font-semibold"
              >
                See coaching options
              </NuxtLink>

              <NuxtLink
                to="/method"
                class="btn btn-ghost border border-base-300 rounded-full px-5 md:px-7 text-sm md:text-base"
              >
                Learn the JT Method
              </NuxtLink>
            </div>
          </div>

          <!-- hero side note -->
          <div
            class="w-full md:w-[340px] lg:w-[380px] rounded-3xl border border-base-100/40 bg-base-100 text-base-content shadow-xl p-5 sm:p-6 md:p-7"
          >
            <p
              class="text-[0.7rem] uppercase tracking-[0.18em] text-primary/80 font-semibold mb-2"
            >
              what you get
            </p>
            <h2 class="text-lg sm:text-xl font-semibold">
              Practical, no-fluff PDFs you can use right away.
            </h2>
            <p class="mt-2 text-sm text-base-content/80">
              Each guide is built to be simple to read and easy to apply – no
              crash diets, no “secret hack” hype. Just clear explanations and
              action steps.
            </p>

            <ul class="mt-4 space-y-2 text-sm text-base-content/80">
              <li class="flex items-start gap-2">
                <span class="mt-1 mdi mdi-check-circle-outline text-primary" />
                <span
                  >Save them to your phone or laptop for quick reference.</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 mdi mdi-check-circle-outline text-primary" />
                <span>Use them on your own or alongside coaching.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 mdi mdi-check-circle-outline text-primary" />
                <span
                  >All built from real client experience, not theory
                  alone.</span
                >
              </li>
            </ul>

            <p class="mt-4 text-xs text-base-content/70">
              New guides may be added over time – check back periodically if you
              want to see what is new.
            </p>
          </div>
        </div>
      </div>
    </section>

    <main class="flex-1">
      <!-- guides grid -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div
          class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6"
        >
          <div>
            <p
              class="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2"
            >
              free resources
            </p>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight">
              Download the guide that matches your next step.
            </h2>
          </div>
          <p class="text-xs sm:text-sm md:max-w-md text-base-content/70">
            Pick one area to focus on first – habits, muscle gain, binge
            control, reverse dieting, sleep, or protein. You can always come
            back for the others.
          </p>
        </div>

        <div class="grid gap-5 md:gap-6 md:grid-cols-2">
          <article
            v-for="guide in free_guides"
            :key="guide.slug"
            class="card bg-base-200/70 border border-base-300/80"
          >
            <div class="card-body p-5 sm:p-6 flex flex-col gap-4">
              <!-- image -->
              <div
                class="rounded-2xl overflow-hidden bg-base-300 aspect-[16/9] flex items-center justify-center"
              >
                <img
                  :src="guide.image_url"
                  :alt="guide.title"
                  class="h-full w-full object-cover"
                />
              </div>

              <!-- content -->
              <div class="space-y-2">
                <h3 class="text-lg font-semibold">
                  {{ guide.title }}
                </h3>
                <p class="text-sm text-base-content/80">
                  {{ guide.description }}
                </p>
              </div>

              <div class="mt-2 flex items-center justify-between text-xs">
                <p class="text-base-content/60">
                  {{ guide.meta }}
                </p>
                <a
                  :href="guide.download_url"
                  class="btn btn-primary btn-sm rounded-full px-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download guide
                </a>
              </div>
            </div>
          </article>
        </div>

        <div
          class="mt-8 rounded-2xl bg-base-200/60 border border-base-300/80 p-5 sm:p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h3 class="text-lg md:text-xl font-semibold">
              Want help applying what you read?
            </h3>
            <p class="mt-2 text-sm sm:text-base text-base-content/80 max-w-xl">
              If you do better with a coach in your corner, we can take what is
              inside these guides and turn it into a step-by-step plan tailored
              to your schedule and goals.
            </p>
          </div>
          <NuxtLink
            to="/work-with-us"
            class="btn btn-primary rounded-full px-6 text-sm sm:text-base"
          >
            Apply for coaching
          </NuxtLink>
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
            <NuxtLink to="/contact" class="link link-hover">
              Get in touch
            </NuxtLink>
          </p>
        </div>
        <div class="flex flex-wrap gap-3 md:gap-4">
          <NuxtLink to="/" class="link link-hover">Home</NuxtLink>
          <NuxtLink to="/method" class="link link-hover"
            >The JT Method</NuxtLink
          >
          <NuxtLink to="/results" class="link link-hover">Results</NuxtLink>
          <NuxtLink to="/work-with-us" class="link link-hover">
            Work With Us
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const hero_image_url = "/images/dead_lift.jpg";

const free_guides = [
  {
    slug: "five-pillars",
    title: "5 Pillars To Sustainable Results",
    description:
      "Learn five core principles that help you create results that last instead of chasing short-term fixes.",
    meta: "Habits • Lifestyle • Long-term change",
    image_url: "/images/guides/5_pillars.jpg", // replace with your asset
    download_url: "#", // replace with real download link
  },
  {
    slug: "six-ways-muscle-gain",
    title: "6 Ways To Maximize Muscle Gain",
    description:
      "Discover six beginner-friendly strategies to build muscle by dialing in your training, nutrition, and recovery.",
    meta: "Muscle gain • Training • Recovery",
    image_url: "/images/guides/6_ways_muscle_gain.jpg",
    download_url: "#",
  },
  {
    slug: "stop-binge-eating",
    title: "How To Stop Yourself From Binge Eating",
    description:
      "Get practical tools to break out of binge cycles, manage urges, and build a calmer relationship with food.",
    meta: "Nutrition • Mindset • Binge control",
    image_url: "/images/guides/stop_binge_eating.jpg",
    download_url: "#",
  },
  {
    slug: "reverse-dieting",
    title: "Reverse Dieting",
    description:
      "Use a structured reverse-dieting approach to support your metabolism and body composition after dieting.",
    meta: "Metabolism • Post-diet • Maintenance",
    image_url: "/images/guides/reverse_dieting.jpg",
    download_url: "#",
  },
  {
    slug: "sleep-guide",
    title: "Sleep Guide",
    description:
      "Learn science-backed strategies and simple lifestyle tweaks to improve your sleep quality and recovery.",
    meta: "Sleep • Recovery • Energy",
    image_url: "/images/guides/sleep_guide.jpg",
    download_url: "#",
  },
  {
    slug: "protein-cheat-sheet",
    title: "Protein Cheat Sheet",
    description:
      "A quick reference for protein sources and portions so you can support muscle, recovery, and body composition.",
    meta: "Protein • Nutrition • Cheat sheet",
    image_url: "/images/guides/protein_cheat_sheet.jpg",
    download_url: "#",
  },
];
</script>
