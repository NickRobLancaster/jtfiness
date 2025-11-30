<template>
  <div class="min-h-screen bg-base-100 text-base-content flex flex-col">
    <!-- hero -->
    <section
      class="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center"
      :style="{ backgroundImage: `url('${hero_image_url}')` }"
    >
      <!-- dark overlay -->
      <div class="w-full bg-black/70">
        <div
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row gap-10 md:gap-16 items-center text-base-100"
        >
          <!-- hero copy -->
          <div class="flex-1">
            <p
              class="uppercase tracking-[0.25em] text-[0.65rem] md:text-xs text-primary/80 font-semibold mb-4"
            >
              results • transformations
            </p>

            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight md:leading-[1.1] max-w-3xl"
            >
              Results that come from
              <span class="text-primary">a real plan</span>, not guesswork.
            </h1>

            <p
              class="mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-base-100/90 max-w-xl"
            >
              See what happens when structured training, clear nutrition, and
              consistent coaching come together. These are real people who
              followed a tailored plan — not filters, crash diets, or quick
              fixes.
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <NuxtLink
                to="/work-with-us"
                class="btn btn-primary rounded-full px-5 md:px-7 text-sm md:text-base font-semibold"
              >
                Start your own transformation
              </NuxtLink>

              <NuxtLink
                to="/method"
                class="btn btn-ghost border border-base-300 rounded-full px-5 md:px-7 text-sm md:text-base"
              >
                See how the JT Method works
              </NuxtLink>
            </div>

            <div
              class="mt-6 grid grid-cols-2 gap-4 max-w-sm text-xs sm:text-sm text-base-100/80"
            >
              <div
                class="stat bg-base-100/10 rounded-2xl border border-base-100/40 p-4"
              >
                <div
                  class="stat-title text-[0.7rem] sm:text-xs text-base-100/80"
                >
                  Not just before-and-after photos
                </div>
                <div class="stat-value text-lg sm:text-2xl font-extrabold">
                  Whole-life wins
                </div>
                <div
                  class="stat-desc text-[0.7rem] sm:text-xs text-base-100/80"
                >
                  Strength, energy, confidence, and a routine you can keep.
                </div>
              </div>

              <div
                class="stat bg-base-100/10 rounded-2xl border border-base-100/40 p-4"
              >
                <div
                  class="stat-title text-[0.7rem] sm:text-xs text-base-100/80"
                >
                  Personalized coaching
                </div>
                <div class="stat-value text-lg sm:text-2xl font-extrabold">
                  1:1 attention
                </div>
                <div
                  class="stat-desc text-[0.7rem] sm:text-xs text-base-100/80"
                >
                  Programs built around your schedule, history, and goals.
                </div>
              </div>
            </div>
          </div>

          <!-- hero sidebar card -->
          <div
            class="w-full md:w-[340px] lg:w-[380px] rounded-3xl border border-base-100/40 bg-base-100 text-base-content shadow-xl p-5 sm:p-6 md:p-7"
          >
            <p
              class="text-[0.7rem] uppercase tracking-[0.18em] text-primary/80 font-semibold mb-2"
            >
              what “results” means here
            </p>
            <h2 class="text-lg sm:text-xl font-semibold">
              More than a number on the scale.
            </h2>
            <p class="mt-2 text-sm text-base-content/80">
              We track photos, strength, measurements, and how you feel — not
              just weight. The goal is a stronger, leaner, more confident
              version of you that actually fits your life.
            </p>

            <ul class="mt-4 space-y-2 text-sm text-base-content/80">
              <li class="flex items-start gap-2">
                <span class="mt-1 mdi mdi-check-circle-outline text-primary" />
                <span>Customized training and nutrition protocols.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 mdi mdi-check-circle-outline text-primary" />
                <span
                  >Coaching that explains the “why”, not just the “what”.</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 mdi mdi-check-circle-outline text-primary" />
                <span>Accountability so you stay consistent, not perfect.</span>
              </li>
            </ul>

            <p class="mt-4 text-xs text-base-content/70">
              Your results will look different depending on your starting point,
              effort, and life situation — and that is exactly how it should be.
            </p>
          </div>
        </div>
      </div>
    </section>

    <main class="flex-1">
      <!-- transformations grid -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div
          class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6"
        >
          <div>
            <p
              class="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2"
            >
              client transformations
            </p>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight">
              Real people with busy lives — real progress.
            </h2>
          </div>
          <p class="text-xs sm:text-sm md:max-w-md text-base-content/70">
            These stories represent what happens when you commit to a plan that
            fits your lifestyle. Results vary from person to person, but the
            process — education, structure, and support — stays the same.
          </p>
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
            v-for="item in transformation_items"
            :key="item.name"
            class="card bg-base-200/80 border border-base-300/80"
          >
            <div class="card-body p-5 sm:p-6 flex flex-col gap-3">
              <!-- before/after image area -->
              <div class="grid grid-cols-2 gap-2 mb-2">
                <div class="flex flex-col gap-1">
                  <div
                    class="aspect-[3/4] rounded-xl overflow-hidden bg-base-300 flex items-center justify-center"
                  >
                    <img
                      :src="item.before_image_url"
                      alt="Before photo"
                      class="h-full w-full object-cover"
                    />
                  </div>
                  <span
                    class="text-[0.65rem] uppercase tracking-[0.16em] text-base-content/70"
                  >
                    Before
                  </span>
                </div>
                <div class="flex flex-col gap-1">
                  <div
                    class="aspect-[3/4] rounded-xl overflow-hidden bg-base-300 flex items-center justify-center"
                  >
                    <img
                      :src="item.after_image_url"
                      alt="After photo"
                      class="h-full w-full object-cover"
                    />
                  </div>
                  <span
                    class="text-[0.65rem] uppercase tracking-[0.16em] text-base-content/70"
                  >
                    After
                  </span>
                </div>
              </div>

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
                {{ item.summary }}
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

              <p class="mt-2 text-[0.65rem] text-base-content/60">
                {{ item.disclaimer }}
              </p>
            </div>
          </article>
        </transition-group>

        <div
          class="mt-8 rounded-2xl bg-base-200/60 border border-base-300/80 p-5 sm:p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h3 class="text-lg md:text-xl font-semibold">
              Want to know what is realistic for you?
            </h3>
            <p class="mt-2 text-sm sm:text-base text-base-content/80 max-w-xl">
              Share your goals, training history, and schedule. Justin will give
              you an honest breakdown of what kind of results you can expect
              over the next 3–6 months — no hype, no “magic” promises.
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

      <!-- what results include -->
      <section class="bg-base-200/40 border-y border-base-300">
        <div
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8 md:space-y-10"
        >
          <div class="max-w-3xl">
            <p
              class="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2"
            >
              beyond the photos
            </p>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight">
              The wins we care about most.
            </h2>
            <p class="mt-4 text-sm sm:text-base text-base-content/80">
              The scale is one data point. We also pay attention to how you
              move, how you feel, how you eat, and how confidently you can keep
              doing this on your own.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-4 md:gap-6 text-sm">
            <div class="card bg-base-100/80 border border-base-300/80">
              <div class="card-body p-4 sm:p-5">
                <h3 class="text-base font-semibold mb-2">Body composition</h3>
                <p class="text-sm text-base-content/80">
                  Fat loss, muscle gain, and physique changes measured through
                  photos, progress metrics, and how your clothes fit — not just
                  the number on the scale.
                </p>
              </div>
            </div>
            <div class="card bg-base-100/80 border border-base-300/80">
              <div class="card-body p-4 sm:p-5">
                <h3 class="text-base font-semibold mb-2">
                  Performance & energy
                </h3>
                <p class="text-sm text-base-content/80">
                  Stronger lifts, better stamina, improved recovery, and more
                  energy for work, family, and everything else outside the gym.
                </p>
              </div>
            </div>
            <div class="card bg-base-100/80 border border-base-300/80">
              <div class="card-body p-4 sm:p-5">
                <h3 class="text-base font-semibold mb-2">Habits & mindset</h3>
                <p class="text-sm text-base-content/80">
                  Less all-or-nothing thinking, fewer “start over Monday”
                  cycles, and more calm confidence in how you train and eat.
                </p>
              </div>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-base-content/70">
            <span class="font-semibold">Important:</span> individual results are
            always different. Your outcome will depend on your starting point,
            consistency, and adherence to the plan — we will always be
            transparent about that from day one.
          </p>
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
          <NuxtLink to="/services" class="link link-hover">Services</NuxtLink>
          <NuxtLink to="/work-with-us" class="link link-hover">
            Work With Us
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const hero_image_url = "/images/dead_lift.jpg"; // swap to a dedicated results hero if you want

const transformation_items = [
  {
    name: "Claire C.",
    tagline: "Down fat, up strength, more confident in her routine",
    result_badge: "6 months",
    before_image_url: "/images/results/claire_before.jpg", // replace with real paths
    after_image_url: "/images/results/claire_after.jpg",
    summary:
      "Claire came in wanting to lose body fat without feeling obsessed with food. We focused on simple nutrition structure, progressive training, and weekly pattern reviews. She left with a leaner physique, stronger lifts, and a plan she can keep running on her own.",
    pills: ["Busy professional", "Fat loss", "Strength & confidence"],
    disclaimer:
      "Claire’s results came from consistent training and nutrition over several months. Your timeline and outcome may look different based on your own starting point.",
  },
  {
    name: "Matthieu T.",
    tagline: "Returned to lifting after injuries with more confidence",
    result_badge: "Performance focused",
    before_image_url: "/images/results/matthieu_before.jpg",
    after_image_url: "/images/results/matthieu_after.jpg",
    summary:
      "After dealing with nagging injuries and inconsistent workouts, Matthieu needed structure that respected his joints but still pushed progress. We rebuilt his movement patterns, added smart progressions, and dialed in recovery so he could train hard again without fear.",
    pills: ["Injury history", "Strength", "Technique work"],
    disclaimer:
      "Pain, injury history, and progress are highly individual. Matthieu’s plan was tailored to his situation — yours will be designed around your needs and limitations.",
  },
  {
    name: "Kaylee K.",
    tagline: "Lost weight, gained muscle, dropped the all-or-nothing mindset",
    result_badge: "Lifestyle shift",
    before_image_url: "/images/results/kaylee_before.jpg",
    after_image_url: "/images/results/kaylee_after.jpg",
    summary:
      "Kaylee wanted to stop bouncing between extremes. Together we built a routine that allowed social events, travel, and real life while still moving the needle. She finished feeling leaner, stronger, and far more relaxed around food and training.",
    pills: ["Mindset shift", "Body recomposition", "Habit building"],
    disclaimer:
      "Mindset and lifestyle changes are gradual. Kaylee’s transformation came from patience, honesty, and consistent effort over time.",
  },
];
</script>
