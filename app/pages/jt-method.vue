<template>
  <div class="min-h-screen bg-base-100 text-base-content flex flex-col">
    <!-- hero -->
    <section
      class="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center"
      :style="{ backgroundImage: `url('${hero_image_url}')` }"
    >
      <div class="w-full bg-black/60">
        <div
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-34 md:py-20 flex flex-col md:flex-row gap-10 md:gap-16 items-center"
        >
          <!-- hero copy -->
          <div class="flex-1">
            <p
              class="uppercase tracking-[0.25em] text-[0.65rem] md:text-xs text-primary/80 font-semibold mb-4"
            >
              the jt method • framework
            </p>

            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight md:leading-[1.1] max-w-3xl"
            >
              A step-by-step method
              <br />
              to <span class="text-primary">build results</span> that last.
            </h1>

            <p
              class="mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-white max-w-xl"
            >
              The JT Method is a four-phase coaching framework that takes you
              from scattered habits and guesswork to a stronger body, better
              routines, and a lifestyle you can actually maintain.
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <NuxtLink
                to="/work-with-us"
                class="btn btn-primary rounded-full px-5 md:px-7 text-sm text-white font-semibold"
              >
                See if the JT Method is right for you
              </NuxtLink>

              <NuxtLink
                to="/contact"
                class="btn btn-ghost border border-base-300 rounded-full px-5 md:px-7 text-sm text-white"
              >
                Talk with Justin
              </NuxtLink>
            </div>

            <div
              class="mt-6 grid grid-cols-2 gap-4 max-w-sm text-xs sm:text-sm text-base-100/80"
            >
              <div
                class="stat bg-base-100/10 rounded-2xl border border-base-300/40 p-4"
              >
                <div class="stat-title text-[0.7rem] sm:text-xs text-white">
                  Built for busy people
                </div>
                <div
                  class="stat-value text-lg sm:text-2xl font-extrabold text-white"
                >
                  Real life first
                </div>
                <div class="stat-desc text-[0.7rem] sm:text-xs text-white">
                  Plans that work with your schedule, not against it.
                </div>
              </div>

              <div
                class="stat bg-base-100/10 rounded-2xl border border-base-300/40 p-4"
              >
                <div class="stat-title text-[0.7rem] sm:text-xs text-white">
                  Education based
                </div>
                <div
                  class="stat-value text-lg sm:text-2xl font-extrabold text-white"
                >
                  Learn as you go
                </div>
                <div class="stat-desc text-[0.7rem] sm:text-xs text-white">
                  So you can keep progressing long after coaching ends.
                </div>
              </div>
            </div>
          </div>

          <!-- hero framework summary -->
          <div
            class="w-full md:w-[340px] lg:w-[380px] rounded-3xl border border-base-300/70 bg-base-100/95 shadow-xl p-5 sm:p-6 md:p-7"
          >
            <p
              class="text-[0.7rem] uppercase tracking-[0.18em] text-primary/80 font-semibold mb-2"
            >
              the 4 phases
            </p>
            <h2 class="text-lg sm:text-xl font-semibold">
              The JT Method at a glance
            </h2>
            <p class="mt-2 text-sm text-base-content/80">
              We move one phase at a time so you are never guessing what to do
              next.
            </p>

            <ul class="mt-4 space-y-3 text-sm">
              <li
                v-for="step in method_steps"
                :key="step.id"
                class="flex items-start gap-3"
              >
                <div
                  class="mt-0.5 h-7 w-7 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-[0.75rem] font-bold text-primary"
                >
                  {{ step.id }}
                </div>
                <div>
                  <p class="font-semibold">
                    {{ step.title }}
                  </p>
                  <p class="text-xs text-base-content/70 mt-1">
                    {{ step.short }}
                  </p>
                </div>
              </li>
            </ul>

            <p class="mt-4 text-xs text-base-content/70">
              Most clients move through every phase, but the pace and timeline
              are adjusted to your history, progress, and goals.
            </p>
          </div>
        </div>
      </div>
    </section>

    <main class="flex-1">
      <!-- framework explanation -->
      <section class="bg-base-200/40 border-y border-base-300">
        <div
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16 space-y-10 md:space-y-14"
        >
          <!-- intro -->
          <div class="max-w-3xl">
            <p
              class="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2"
            >
              why a method?
            </p>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight">
              Repeatable, predictable, and sustainable — on purpose.
            </h2>
            <p class="mt-4 text-sm sm:text-base text-base-content/80">
              Instead of tossing you into random workouts and strict meal rules,
              the JT Method walks you through a structured sequence. Each phase
              prepares you for the next, so progress feels smoother and your
              results are easier to maintain.
            </p>
          </div>

          <!-- step cards -->
          <div class="grid gap-6 md:gap-8 md:grid-cols-2">
            <article
              v-for="step in method_steps"
              :key="step.id"
              class="card bg-base-100/80 border border-base-300/80 hover:border-primary/70 transition-colors"
            >
              <div class="card-body p-5 sm:p-6 flex flex-col gap-3">
                <div class="flex items-center justify-between gap-3">
                  <p
                    class="text-[0.7rem] uppercase tracking-[0.18em] text-primary/80 font-semibold"
                  >
                    phase {{ step.id }}
                  </p>
                  <span class="badge badge-outline badge-primary badge-sm">
                    {{ step.label }}
                  </span>
                </div>

                <h3 class="text-lg font-semibold">
                  {{ step.title }}
                </h3>

                <p class="text-sm text-base-content/80">
                  {{ step.description }}
                </p>

                <ul
                  v-if="step.points && step.points.length"
                  class="mt-2 space-y-1.5 text-xs text-base-content/70"
                >
                  <li
                    v-for="point in step.points"
                    :key="point"
                    class="flex items-start gap-2"
                  >
                    <span
                      class="mt-0.5 mdi mdi-check-circle-outline text-primary text-sm"
                    />
                    <span>{{ point }}</span>
                  </li>
                </ul>

                <p
                  v-if="step.timeline"
                  class="mt-3 text-[0.7rem] text-base-content/60"
                >
                  {{ step.timeline }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- identity / mindset -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div class="grid lg:grid-cols-3 gap-8 md:gap-10 items-start">
          <div class="lg:col-span-2 space-y-4">
            <p
              class="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-1"
            >
              the real secret
            </p>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight">
              It is not just about what you do — it is who you become.
            </h2>
            <p class="text-sm sm:text-base text-base-content/80 mt-3">
              Methods and macros matter, but lasting change comes from building
              a new identity. The JT Method helps you shift from “trying to get
              in shape” to becoming the type of person who trains, eats, and
              recovers like it is simply part of their life.
            </p>
            <p class="text-sm sm:text-base text-base-content/80">
              Throughout coaching, Justin will come back to one question with
              you:
              <span class="font-semibold text-base-content">
                “Who do I need to become to keep these results for life?”
              </span>
              From there, we shape the habits, actions, and standards that fit
              that version of you.
            </p>

            <ul class="mt-4 space-y-2 text-sm text-base-content/80">
              <li class="flex items-start gap-2">
                <span class="mt-1 mdi mdi-target-variant text-primary"></span>
                <span>
                  Clarify the values, routines, and non-negotiables of your
                  “future you.”
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 mdi mdi-target-variant text-primary"></span>
                <span>
                  Align your training and nutrition with that identity instead
                  of short-term willpower.
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 mdi mdi-target-variant text-primary"></span>
                <span>
                  Leave with a blueprint and the confidence to keep progressing
                  on your own.
                </span>
              </li>
            </ul>
          </div>

          <!-- cta card -->
          <div
            class="rounded-3xl border border-base-300/80 bg-base-200/70 p-5 sm:p-6 flex flex-col gap-4"
          >
            <h3 class="text-lg sm:text-xl font-semibold">
              Want to see how this would look for you?
            </h3>
            <p class="text-sm text-base-content/80">
              Share your goals, training history, and current struggles. Justin
              will outline which phase you would start in and what the first
              6–12 weeks would focus on.
            </p>

            <div class="space-y-2 text-sm">
              <NuxtLink to="/work-with-us" class="btn btn-primary w-full">
                Start the JT Method
              </NuxtLink>
              <NuxtLink
                to="/contact"
                class="btn btn-ghost border border-base-300 w-full"
              >
                Ask a question first
              </NuxtLink>
            </div>

            <p class="text-[0.7rem] text-base-content/70">
              No pressure, no pushy sales calls — just an honest look at what is
              realistic for your life and timeline.
            </p>
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
          <NuxtLink to="/coaches" class="link link-hover">Coaches</NuxtLink>
          <NuxtLink to="/services" class="link link-hover">Services</NuxtLink>
          <NuxtLink to="/results" class="link link-hover">Results</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const hero_image_url = "/images/clean.jpg"; // swap if you have a dedicated Method hero

const method_steps = [
  {
    id: 1,
    label: "foundation",
    title: "Master the basics that move the needle.",
    short:
      "Dial in what you eat and how you move so your daily routine supports progress instead of fighting it.",
    description:
      "We start by looking at what you can control every day: your food choices, activity, and simple lifestyle habits. From there we clean up the biggest leaks and build a solid rhythm you can actually stick to.",
    points: [
      "Clarify your starting point, goals, and non-negotiables.",
      "Improve habits around sleep, stress, hydration, and movement.",
      "Get clear, simple targets for protein, steps, and training.",
    ],
    timeline:
      "Typical timeframe: about 1–4 weeks, depending on your starting point.",
  },
  {
    id: 2,
    label: "build the engine",
    title: "Turn your body into a calorie-burning machine.",
    short:
      "Before chasing fat loss hard, we prepare your body by building muscle and improving how much you can eat and maintain.",
    description:
      "Instead of endless cardio and aggressive cuts, we slowly increase calories and protein while pushing smart strength training. The goal is to add or maintain muscle so your body burns more calories around the clock.",
    points: [
      "Progressive strength training tailored to your level and equipment.",
      "Gradual increases in food so your body can handle more without fat gain.",
      "Focus on performance and muscle so you feel stronger, not depleted.",
    ],
    timeline:
      "Typical timeframe: roughly 2–4 months, depending on your diet history and recovery.",
  },
  {
    id: 3,
    label: "accelerated fat loss",
    title: "Supercharge your results without extreme dieting.",
    short:
      "Once you are prepared, we finally push fat loss — while protecting the muscle and strength you have built.",
    description:
      "Now that your habits and metabolism are in a better spot, we can reduce calories in a controlled way. You will lose weight while keeping muscle, enjoying social events, and avoiding the all-or-nothing cycle.",
    points: [
      "Targeted fat-loss phase built around your lifestyle and preferences.",
      "Flexible structure so you can still enjoy events, date nights, and trips.",
      "Weekly reviews to adjust pace, macros, and training as needed.",
    ],
    timeline:
      "Typical rate of progress: around 0.5–1 lb per week, depending on your starting point and goals.",
  },
  {
    id: 4,
    label: "live the lifestyle",
    title: "Make your new normal feel automatic.",
    short:
      "We shift from “being in a phase” to living a lifestyle you can keep without tracking every detail forever.",
    description:
      "This is where we zoom out. Together we design the habits, routines, and mindset that will keep your results. You will learn how to maintain, when to push harder, and how to get back on track quickly when life happens.",
    points: [
      "Return to a sustainable maintenance intake without rebounding.",
      "Create a simple blueprint you can follow on your own.",
      "Build the confidence and identity to keep training like the person you became.",
    ],
    timeline:
      "Typical timeframe: about 6–8 weeks to solidify maintenance and exit coaching with clarity.",
  },
];
</script>
