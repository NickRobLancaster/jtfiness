<template>
  <div class="min-h-screen bg-base-100 text-base-content flex flex-col">
    <!-- hero -->
    <section
      class="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center"
      :style="{ backgroundImage: `url('${hero_image_url}')` }"
    >
      <div class="w-full bg-black/70">
        <div
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-34 md:py-20 flex flex-col md:flex-row gap-10 md:gap-16 items-center text-base-100"
        >
          <!-- hero copy -->
          <div class="flex-1">
            <p
              class="uppercase tracking-[0.25em] text-[0.65rem] md:text-xs text-primary/80 font-semibold mb-4"
            >
              jt fitness • services
            </p>

            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight md:leading-[1.1] max-w-3xl text-white"
            >
              Coaching that covers
              <span class="text-primary">your whole life</span>, not just your
              workouts.
            </h1>

            <p
              class="mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-base-100/90 max-w-xl text-white"
            >
              Our coaching brings together training, nutrition, and lifestyle so
              your plan matches your goals, schedule, and experience level –
              whether you are chasing fat loss, strength, muscle, or simply
              feeling better day to day.
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <NuxtLink
                to="/work-with-us"
                class="btn btn-primary rounded-full px-5 md:px-7 text-sm md:text-base font-semibold text-white"
              >
                Apply for coaching
              </NuxtLink>

              <NuxtLink
                to="/method"
                class="btn btn-ghost border border-base-300 rounded-full px-5 md:px-7 text-sm text-white"
              >
                Learn the JT Method
              </NuxtLink>
            </div>
          </div>

          <!-- hero side summary -->
          <div
            class="w-full md:w-[340px] lg:w-[380px] rounded-3xl border border-base-100/40 bg-base-100 text-base-content shadow-xl p-5 sm:p-6 md:p-7"
          >
            <p
              class="text-[0.7rem] uppercase tracking-[0.18em] text-primary/80 font-semibold mb-2"
            >
              what is included
            </p>
            <h2 class="text-lg sm:text-xl font-semibold">
              A complete approach to training and lifestyle.
            </h2>
            <p class="mt-2 text-sm text-base-content/80">
              No cookie-cutter templates. Every plan is built around your main
              goal, training history, and what real life looks like for you.
            </p>

            <ul class="mt-4 space-y-2 text-sm text-base-content/80">
              <li class="flex items-start gap-2">
                <span class="mt-1 mdi mdi-check-circle-outline text-primary" />
                <span
                  >Custom training program based on your experience and
                  equipment.</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 mdi mdi-check-circle-outline text-primary" />
                <span
                  >Nutrition guidance tailored to your preferences and
                  lifestyle.</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 mdi mdi-check-circle-outline text-primary" />
                <span>Ongoing support, check-ins, and lifestyle coaching.</span>
              </li>
            </ul>

            <p class="mt-4 text-xs text-base-content/70">
              You choose whether to work together in-person (Orange County, CA)
              or online from anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>

    <main class="flex-1">
      <!-- goal categories with collapsibles -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div
          class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6"
        >
          <div>
            <p
              class="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2"
            >
              what is your main goal?
            </p>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight">
              Pick the area you care about most right now.
            </h2>
          </div>
          <p class="text-xs sm:text-sm md:max-w-md text-base-content/70">
            Most clients fall into one or two of these categories. We use your
            primary goal to shape your plan – then we support everything else
            (energy, confidence, performance, and longevity) along the way.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <!-- simple tiles -->
          <div
            v-for="goal in goal_cards"
            :key="goal.title"
            class="card bg-base-200/70 border border-base-300/80"
          >
            <div class="card-body p-5 sm:p-6">
              <h3 class="text-base sm:text-lg font-semibold mb-1">
                {{ goal.title }}
              </h3>
              <p class="text-sm text-base-content/80">
                {{ goal.description }}
              </p>
            </div>
          </div>

          <!-- collapsible: injury prevention + recovery -->
          <div class="md:col-span-2 space-y-3 mt-4 md:mt-0">
            <div
              v-for="section in collapsible_sections"
              :key="section.title"
              class="collapse collapse-arrow bg-base-200 border border-base-300"
            >
              <input type="checkbox" />
              <div
                class="collapse-title text-sm sm:text-base font-semibold flex items-center gap-2"
              >
                <span class="mdi mdi-chevron-down text-base-content/70" />
                <span>{{ section.title }}</span>
              </div>
              <div class="collapse-content">
                <p class="text-sm text-base-content/80 mb-2">
                  {{ section.intro }}
                </p>
                <div
                  class="flex flex-wrap gap-2 text-xs sm:text-sm text-base-content/80"
                >
                  <span
                    v-for="item in section.items"
                    :key="item"
                    class="badge badge-ghost badge-xs py-2 px-3 rounded-full"
                  >
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- online vs in-person coaching -->
      <section class="bg-base-200/40 border-y border-base-300">
        <div
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8 md:space-y-10"
        >
          <div class="text-center max-w-2xl mx-auto">
            <p
              class="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2"
            >
              coaching formats
            </p>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight">
              Online coaching vs. in-person coaching.
            </h2>
            <p class="mt-4 text-sm sm:text-base text-base-content/80">
              Same philosophy, different delivery. Choose the format that fits
              your schedule, location, and comfort level – and we will handle
              the structure and accountability.
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <article
              v-for="option in coaching_options"
              :key="option.slug"
              class="card bg-base-100/90 border text-white"
            >
              <div class="card-body p-5 sm:p-6 md:p-7 flex flex-col gap-4">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h3 class="text-lg font-semibold">
                      {{ option.title }}
                    </h3>
                    <p
                      class="text-xs text-primary/80 uppercase tracking-[0.16em] mt-1"
                    >
                      {{ option.label }}
                    </p>
                  </div>
                  <span class="badge badge-outline badge-primary badge-sm">
                    {{ option.badge }}
                  </span>
                </div>

                <div class="space-y-3 text-sm">
                  <div>
                    <p class="font-semibold text-base-content">Location</p>
                    <p class="text-base-content/80">
                      {{ option.location }}
                    </p>
                  </div>

                  <div>
                    <p class="font-semibold text-base-content">Best for</p>
                    <p class="text-base-content/80">
                      {{ option.best_for }}
                    </p>
                  </div>

                  <div>
                    <p class="font-semibold text-base-content">
                      What is included
                    </p>
                    <ul class="mt-1 space-y-1.5 text-base-content/80">
                      <li
                        v-for="item in option.includes"
                        :key="item"
                        class="flex items-start gap-2 text-sm"
                      >
                        <span
                          class="mt-0.5 mdi mdi-check-circle-outline text-primary text-sm"
                        />
                        <span>{{ item }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <NuxtLink
                  to="/work-with-us"
                  class="btn btn-primary btn-sm w-full mt-2 rounded-full"
                >
                  Learn more & apply
                </NuxtLink>
              </div>
            </article>
          </div>

          <div
            class="rounded-2xl bg-base-200/80 border border-base-300/80 p-5 sm:p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h3 class="text-lg md:text-xl font-semibold">
                Not sure which option fits you best?
              </h3>
              <p
                class="mt-2 text-sm sm:text-base text-base-content/80 max-w-xl"
              >
                If you are on the fence between online and in-person coaching,
                reach out and share your goals, schedule, and training
                experience. We will recommend the format that gives you the best
                chance of long-term success.
              </p>
            </div>
            <NuxtLink
              to="/contact"
              class="btn btn-ghost border border-base-300 rounded-full px-6 text-sm sm:text-base"
            >
              Ask a question
            </NuxtLink>
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
          <NuxtLink to="/free-guides" class="link link-hover">
            Free Guides
          </NuxtLink>
          <NuxtLink to="/work-with-us" class="link link-hover">
            Work With Us
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const hero_image_url = "/images/services.jpg";

// top simple goal cards (weight loss, muscle gain, strength)
const goal_cards = [
  {
    title: "Weight loss",
    description:
      "Lose body fat in a way that respects your lifestyle, protects your muscle, and does not rely on extreme restrictions.",
  },
  {
    title: "Muscle gain",
    description:
      "Build lean muscle with progressive training and nutrition that supports recovery, performance, and growth.",
  },
  {
    title: "Increase strength",
    description:
      "Get stronger on key lifts with technique-focused programming, smart progression, and appropriate recovery.",
  },
];

// collapsible sections, including injury prevention + recovery
const collapsible_sections = [
  {
    title: "Injury prevention + recovery",
    intro:
      "Support your joints, move with more confidence, and come back stronger from nagging aches or past injuries.",
    items: [
      "Mobility and flexibility work",
      "Shoulder, back, neck, and hip pain support",
      "Cardiovascular conditioning",
      "Improved range of motion",
      "Joint strength and stability",
      "Postpartum recovery support",
      "Prenatal strength and mobility",
      "And more, based on your needs",
    ],
  },
  {
    title: "Improve quality of life",
    intro:
      "Use training and nutrition as tools to improve how you feel in everyday life, not just how you look.",
    items: [
      "Balancing work, life, and health",
      "Stress management strategies",
      "Sleep hygiene support",
      "Hydration habits",
      "Energy and mood support",
      "Hormone-friendly lifestyle habits",
      "Longevity and healthy aging focus",
    ],
  },
  {
    title: "Competition prep",
    intro:
      "Dial in a plan for a specific event or competition with structured training, nutrition, and peaking strategies.",
    items: [
      "Powerlifting meet prep",
      "Bodybuilding & physique-focused goals",
      "Bikini / physique competition prep",
      "Marathon or endurance event training",
      "Strongman-style training",
      "Obstacle course & hybrid events",
      "And more specialty goals",
    ],
  },
  {
    title: "Sports performance",
    intro:
      "Train to perform better in your sport with focused strength, power, and movement work.",
    items: [
      "Speed and acceleration work",
      "Improved golf performance",
      "Vertical and lateral jump training",
      "Muscular endurance",
      "Balance and coordination",
      "Symmetry and weak-point training",
      "Sport-specific strength and conditioning",
    ],
  },
];

const coaching_options = [
  {
    slug: "online",
    title: "Online Coaching",
    label: "remote • worldwide",
    badge: "Most flexible",
    location: "Work with Justin from anywhere in the world.",
    best_for:
      "People who want structure, education, and accountability but need the flexibility to train on their own schedule.",
    includes: [
      "Custom workout program built around your level and equipment",
      "Personalized nutrition targets and guidelines",
      "Lifestyle coaching to align habits with your goals",
      "Weekly check-ins to review progress and adjust the plan",
      "Ongoing access for questions and support between check-ins",
    ],
  },
  {
    slug: "in-person",
    title: "In-Person Coaching",
    label: "orange county, ca",
    badge: "Hands-on coaching",
    location:
      "Sessions available locally in Orange County, California (gym setting).",
    best_for:
      "People with a consistent schedule who want in-person guidance, form checks, and confidence on compound lifts.",
    includes: [
      "1-on-1 personal training sessions (typically 1–3x per week)",
      "Customized training program and in-session coaching",
      "Personalized nutrition guidance",
      "In-depth lifestyle coaching and goal setting",
      "Travel or vacation workout plans when needed",
    ],
  },
];
</script>
