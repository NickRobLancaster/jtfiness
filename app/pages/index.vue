<template>
  <div class="min-h-screen bg-base-100 text-base-content flex flex-col">
    <!-- hero full-screen image -->
    <section
      class="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center"
      :style="{ backgroundImage: `url('${hero_image_url}')` }"
    >
      <div
        class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-black/50"
      >
        <div class="flex flex-col justify-center py-20">
          <p
            class="uppercase tracking-[0.25em] text-[0.65rem] md:text-xs text-primary/80 font-semibold mb-4"
          >
            taught not told • coaching
          </p>

          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight md:leading-[1.1] max-w-2xl"
          >
            Stop guessing.
            <br />
            <span class="text-primary">Train</span>
            with a plan.
          </h1>

          <p
            class="mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-base-content/80 max-w-xl"
          >
            We help busy people lose fat, build muscle, and gain confidence
            through education-based coaching — so you finally understand what
            works for your body.
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <NuxtLink
              to="/waitlist"
              class="btn btn-primary rounded-full px-5 md:px-7 text-sm md:text-base font-semibold"
            >
              Join the coaching waitlist
            </NuxtLink>

            <NuxtLink
              to="/method"
              class="btn btn-ghost border border-base-300 rounded-full px-5 md:px-7 text-sm md:text-base"
            >
              See the coaching method
            </NuxtLink>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4 max-w-sm text-xs sm:text-sm">
            <div
              class="stat bg-base-200/60 rounded-2xl border border-base-300/60 p-4"
            >
              <div
                class="stat-title text-[0.7rem] sm:text-xs text-base-content/60"
              >
                Clients coached
              </div>
              <div class="stat-value text-lg sm:text-2xl font-extrabold">
                300+
              </div>
              <div
                class="stat-desc text-[0.7rem] sm:text-xs text-base-content/60"
              >
                Online and in-person transformations
              </div>
            </div>

            <div
              class="stat bg-base-200/60 rounded-2xl border border-base-300/60 p-4"
            >
              <div
                class="stat-title text-[0.7rem] sm:text-xs text-base-content/60"
              >
                Average program length
              </div>
              <div class="stat-value text-lg sm:text-2xl font-extrabold">
                12–24 wks
              </div>
              <div
                class="stat-desc text-[0.7rem] sm:text-xs text-base-content/60"
              >
                Enough time to build real habits
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <main class="flex-1">
      <!-- mission -->
      <section class="bg-base-200/40 border-y border-base-300">
        <div
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16 grid md:grid-cols-2 gap-10 md:gap-16 items-center"
        >
          <div>
            <p
              class="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2"
            >
              mission
            </p>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight">
              Coaching that teaches you how to coach yourself.
            </h2>
            <p class="mt-4 text-sm sm:text-base text-base-content/80">
              You do not need another random workout plan. You need structure,
              feedback, and clear explanations so you understand exactly what to
              do – and why it works – in the gym and the kitchen.
            </p>
            <p class="mt-3 text-sm sm:text-base text-base-content/70">
              We blend training, nutrition, and accountability so that you can
              finally build a lifestyle that supports your goals instead of
              fighting against them.
            </p>
            <ul
              class="mt-5 space-y-2 text-sm sm:text-base text-base-content/80"
            >
              <li class="flex items-start gap-2">
                <span
                  class="mt-1 mdi mdi-check-circle-outline text-primary"
                ></span>
                <span
                  >Education-first coaching instead of generic templates.</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="mt-1 mdi mdi-check-circle-outline text-primary"
                ></span>
                <span>Honest check-ins, clear adjustments, and no fluff.</span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="mt-1 mdi mdi-check-circle-outline text-primary"
                ></span>
                <span>Tools you can keep using long after coaching ends.</span>
              </li>
            </ul>
          </div>

          <div
            class="rounded-3xl border border-base-300/70 bg-base-300/50 p-5 sm:p-6 md:p-8 flex flex-col gap-4"
          >
            <h3 class="text-lg sm:text-xl font-semibold">
              Inside Taught Not Told Coaching
            </h3>
            <div class="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div class="card bg-base-100/70 border border-base-300/70">
                <div class="card-body p-4">
                  <h4 class="font-semibold mb-1">Custom training plan</h4>
                  <p class="text-base-content/70">
                    Programming tailored to your level, schedule, equipment, and
                    injury history.
                  </p>
                </div>
              </div>
              <div class="card bg-base-100/70 border border-base-300/70">
                <div class="card-body p-4">
                  <h4 class="font-semibold mb-1">Simple nutrition guidance</h4>
                  <p class="text-base-content/70">
                    Flexible guidelines that fit eating out, events, and family
                    life.
                  </p>
                </div>
              </div>
              <div class="card bg-base-100/70 border border-base-300/70">
                <div class="card-body p-4">
                  <h4 class="font-semibold mb-1">Weekly pattern reviews</h4>
                  <p class="text-base-content/70">
                    We look at trends in your training, nutrition and lifestyle
                    to decide next steps.
                  </p>
                </div>
              </div>
              <div class="card bg-base-100/70 border border-base-300/70">
                <div class="card-body p-4">
                  <h4 class="font-semibold mb-1">Messaging access</h4>
                  <p class="text-base-content/70">
                    Ask questions, send form videos, and get feedback between
                    check-ins.
                  </p>
                </div>
              </div>
            </div>

            <NuxtLink
              to="/work-with-us"
              class="btn btn-outline btn-primary mt-2 w-full sm:w-auto"
            >
              See if coaching is right for you
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- outcomes grid -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div
          class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6"
        >
          <div>
            <p
              class="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2"
            >
              goals we work on
            </p>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight">
              What we help you build (and keep).
            </h2>
          </div>
          <p class="text-xs sm:text-sm md:max-w-md text-base-content/70">
            Whether you want to lean out, add muscle, or simply feel more
            confident in your body, we design your plan around what matters most
            to you.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-sm">
          <article
            v-for="card in goal_cards"
            :key="card.title"
            class="card bg-base-200/60 border border-base-300/80 hover:border-primary/70 hover:bg-base-200 transition-colors"
          >
            <div class="card-body p-4 sm:p-5">
              <p
                class="text-[0.7rem] uppercase tracking-[0.18em] text-primary/80 font-semibold"
              >
                {{ card.label }}
              </p>
              <h3 class="mt-2 text-sm sm:text-base font-semibold">
                {{ card.title }}
              </h3>
              <p class="mt-2 text-[0.7rem] sm:text-xs text-base-content/70">
                {{ card.description }}
              </p>
              <NuxtLink
                to="/services"
                class="mt-3 text-xs sm:text-sm link link-primary inline-flex items-center gap-1"
              >
                Learn more
                <span class="mdi mdi-arrow-right text-sm" />
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>

      <!-- coaches -->
      <section class="bg-base-200/40 border-y border-base-300">
        <div
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8 md:space-y-10"
        >
          <div
            class="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <p
                class="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2"
              >
                coaching team
              </p>
              <h2 class="text-2xl md:text-3xl font-bold tracking-tight">
                Coaches who live the lifestyle they teach.
              </h2>
              <p
                class="mt-3 text-sm sm:text-base text-base-content/80 max-w-xl"
              >
                Our coaches are lifters, students of nutrition, and people with
                real responsibilities – just like you. You get clear guidance
                and realistic expectations, not perfectionism.
              </p>
            </div>
            <NuxtLink
              to="/coaches"
              class="btn btn-ghost border border-base-300 rounded-full text-sm sm:text-base self-start"
            >
              Meet the coaches
            </NuxtLink>
          </div>

          <div class="grid md:grid-cols-3 gap-5 md:gap-6">
            <article
              v-for="coach in coach_cards"
              :key="coach.name"
              class="card bg-base-100/80 border border-base-300/80 hover:border-primary/70 transition-colors"
            >
              <div class="card-body p-5 sm:p-6 flex flex-col gap-4">
                <div
                  class="rounded-2xl bg-gradient-to-tr from-primary/40 to-base-200 aspect-[4/5] mb-2 flex items-end overflow-hidden"
                >
                  <div class="w-full p-4">
                    <p class="badge badge-outline badge-sm mb-2">
                      {{ coach.badge }}
                    </p>
                    <p class="text-xs text-base-content/70">
                      {{ coach.photo_caption }}
                    </p>
                  </div>
                </div>
                <div>
                  <p
                    class="text-xs uppercase tracking-[0.18em] text-primary/80 font-semibold"
                  >
                    {{ coach.role }}
                  </p>
                  <h3 class="mt-1 text-lg font-semibold">
                    {{ coach.name }}
                  </h3>
                </div>
                <p class="text-sm text-base-content/80">
                  {{ coach.bio }}
                </p>
                <ul class="text-xs text-base-content/70 space-y-1.5">
                  <li
                    v-for="point in coach.highlights"
                    :key="point"
                    class="flex items-start gap-2"
                  >
                    <span
                      class="mt-0.5 mdi mdi-dot-circle text-primary/80 text-sm"
                    />
                    <span>{{ point }}</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- testimonials with transition-group -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div
          class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6"
        >
          <div>
            <p
              class="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2"
            >
              client stories
            </p>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight">
              Real people, real routines, real changes.
            </h2>
            <p class="mt-3 text-sm sm:text-base text-base-content/80 max-w-xl">
              Our clients are parents, professionals, and students with busy
              lives – not full-time athletes. Their results come from realistic
              plans and consistent execution.
            </p>
          </div>
          <NuxtLink
            to="/results"
            class="btn btn-outline btn-primary btn-sm rounded-full self-start"
          >
            See more transformations
          </NuxtLink>
        </div>

        <transition-group
          tag="div"
          class="grid gap-4 md:gap-6 md:grid-cols-3"
          enter-active-class="transition ease-out duration-200"
          enter-from-class="translate-x-full opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="translate-x-0 opacity-100"
          leave-to-class="opacity-0"
        >
          <article
            v-for="item in testimonial_items"
            :key="item.name"
            class="card bg-base-200/70 border border-base-300/80"
          >
            <div class="card-body p-5 sm:p-6 flex flex-col gap-3">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <h3 class="text-sm sm:text-base font-semibold">
                    {{ item.name }}
                  </h3>
                  <p class="text-xs text-base-content/60">
                    {{ item.tagline }}
                  </p>
                </div>
                <div class="badge badge-primary badge-outline badge-sm">
                  {{ item.result_badge }}
                </div>
              </div>

              <p class="text-xs sm:text-sm text-base-content/80">
                “{{ item.quote }}”
              </p>

              <div
                class="mt-2 flex flex-wrap gap-2 text-[0.7rem] text-base-content/70"
              >
                <span
                  v-for="pill in item.pills"
                  :key="pill"
                  class="badge badge-ghost badge-xs py-2 px-3 rounded-full"
                >
                  {{ pill }}
                </span>
              </div>
            </div>
          </article>
        </transition-group>

        <div
          class="mt-8 rounded-2xl bg-base-200/60 border border-base-300/80 p-5 sm:p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h3 class="text-lg md:text-xl font-semibold">
              Want a realistic plan for the next 12 weeks?
            </h3>
            <p class="mt-2 text-sm sm:text-base text-base-content/80 max-w-xl">
              Tell us about your schedule, training history, and goals. We’ll
              walk you through what we’d focus on first – no obligation to sign
              up.
            </p>
          </div>
          <NuxtLink
            to="/free-guides"
            class="btn btn-primary rounded-full px-6 text-sm sm:text-base"
          >
            Get a free game plan
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
            TAUGHT NOT TOLD © 2018 – {{ new Date().getFullYear() }}
          </p>
          <p>1900 N Tustin St. Orange, CA • 1-805-428-9365</p>
        </div>
        <div class="flex flex-wrap gap-3 md:gap-4">
          <NuxtLink to="/privacy" class="link link-hover"
            >Privacy Policy</NuxtLink
          >
          <NuxtLink to="/community" class="link link-hover">Community</NuxtLink>
          <NuxtLink to="/podcast" class="link link-hover">Podcast</NuxtLink>
          <NuxtLink to="/blog" class="link link-hover">Blog</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const hero_image_url = "/images/dead_lift.jpg"; // replace with your asset path

const goal_cards = [
  {
    label: "fat loss",
    title: "Lose body fat without losing strength",
    description:
      "Dial in your intake and training so the scale moves while you still feel strong and fueled.",
  },
  {
    label: "muscle gain",
    title: "Build lean, defined muscle",
    description:
      "Grow the muscle groups you care about most through progressive, well-structured training.",
  },
  {
    label: "confidence",
    title: "Feel better in and out of the gym",
    description:
      "Improve energy, performance, and body image so confidence shows up in everyday life.",
  },
  {
    label: "strength",
    title: "Hit numbers you are proud of",
    description:
      "Track your lifts, celebrate small wins, and watch your performance steadily climb.",
  },
];

const coach_cards = [
  {
    name: "Coach Tyler",
    role: "Head Coach / Founder",
    badge: "Food Freedom Blueprint",
    photo_caption:
      "Leading clients through fat loss, performance, and lifestyle change.",
    bio: "Tyler focuses on sustainable fat loss and muscle gain, using pattern-based coaching instead of all-or-nothing plans.",
    highlights: [
      "6+ years of in-person and online coaching",
      "Specializes in lifestyle-friendly fat loss",
      "Known for direct, practical feedback",
    ],
  },
  {
    name: "Coach Jake",
    role: "Fat Loss & Injury-Aware Coach",
    badge: "Rehab-informed training",
    photo_caption: "Blending strength work with smart movement progressions.",
    bio: "Jake helps clients train around old injuries while still making meaningful strength and physique progress.",
    highlights: [
      "Background in physical therapy environments",
      "Focus on joint-friendly exercise selection",
      "Ideal for post-injury or cautious lifters",
    ],
  },
  {
    name: "Coach Nate",
    role: "Physique & Strength Coach",
    badge: "Muscle-focused programming",
    photo_caption: "Detail-oriented training for targeted physique goals.",
    bio: "Nate designs training blocks that bring up lagging muscle groups, with attention to technique and progression.",
    highlights: [
      "Emphasis on form, tempo, and intent",
      "Great for clients seeking a “shaped” look",
      "Provides high-detail form breakdowns",
    ],
  },
];

const testimonial_items = [
  {
    name: "Claire C.",
    tagline: "Down 22 lbs, stronger than ever",
    result_badge: "12 weeks",
    quote:
      "This was the first time a coach actually explained what we were doing and why. I feel equipped to keep this going on my own.",
    pills: ["Busy professional", "Fat loss", "Education focused"],
  },
  {
    name: "Matthieu T.",
    tagline: "Back to lifting after injuries",
    result_badge: "+40 lb on key lifts",
    quote:
      "They built my plan around old injuries instead of ignoring them. I feel stronger and more confident under the bar than I have in years.",
    pills: ["Injury history", "Strength", "Form coaching"],
  },
  {
    name: "Kaylee K.",
    tagline: "More strength, less obsession",
    result_badge: "Lifestyle shift",
    quote:
      "I stopped bouncing between extremes and finally found a routine that fits my life. The weekly check-ins kept me grounded, not guilty.",
    pills: ["Mindset shift", "Habit building", "Sustainable"],
  },
];
</script>
