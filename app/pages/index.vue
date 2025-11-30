<script setup>
// import the useWebsiteStore pinia store
import { useWebsiteStore } from "../stores/websiteStore";

definePageMeta({
  ssr: true,
  //title
  title: "JT Fitness",
  //meta tags
  meta: [
    {
      name: "description",
      content: "JT Fitness",
    },
  ],
});

const router = useRouter();

//defineRouteRules({
//  prerender: true,
//});

const websiteStore = useWebsiteStore();

const newsletter_email = ref("");
const newsletter_submitted = ref(false);

const handle_newsletter_submit = () => {
  // placeholder logic – wire to your API or email service
  if (newsletter_email.value.trim()) {
    newsletter_submitted.value = true;
    setTimeout(() => {
      newsletter_submitted.value = false;
    }, 4000);
  }
};
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content flex flex-col">
    <!-- main content -->
    <main class="flex-1">
      <!-- hero -->
      <section class="overflow-hidden border-b border-base-200">
        <div
          class="max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center"
        >
          <div class="space-y-6">
            <p
              class="text-xs tracking-[0.3em] uppercase text-primary font-semibold"
            >
              JT FITNESS • ONLINE COACHING
            </p>
            <h1
              class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            >
              It starts with a choice.
            </h1>
            <p class="text-base md:text-lg text-base-content/80">
              JT Fitness helps you trade excuses for action, build discipline,
              and create a life that feels as strong as it looks.
            </p>
            <p class="text-sm md:text-base text-base-content/70">
              If you want change, you commit to change. We give you the plan,
              coaching, and community. You bring the decision.
            </p>

            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="#consult" class="btn btn-primary w-full sm:w-auto">
                Book A Coaching Consult
              </a>
              <a href="#about" class="btn btn-outline w-full sm:w-auto">
                Meet JT
              </a>
            </div>
          </div>

          <!-- hero image placeholder -->
          <div class="relative">
            <div
              class="aspect-[4/5] w-full max-w-sm mx-auto rounded-3xl bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20 border border-base-300 shadow-xl flex items-end p-6"
            >
              <div>
                <p
                  class="text-xs uppercase tracking-[0.25em] text-base-content/70"
                >
                  Coach
                </p>
                <p class="text-2xl font-bold">JT</p>
                <p class="text-sm text-base-content/70 mt-1">
                  Strength • Discipline • Recovery • Lifestyle
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- community / partners teaser -->
      <section id="partners" class="border-b border-base-200 bg-base-200/40">
        <div
          class="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center"
        >
          <div class="space-y-4">
            <h2 class="text-2xl md:text-3xl font-bold">We train as a team.</h2>
            <p class="text-base text-base-content/80">
              JT Fitness is built on community. You are surrounded by people who
              are serious about growth in and out of the gym.
            </p>
            <p class="text-sm text-base-content/70">
              We work with partners we trust, tools we actually use, and brands
              that fuel the lifestyle we coach.
            </p>
            <a
              href="#partners_list"
              class="btn btn-secondary btn-sm mt-2 w-full sm:w-auto"
            >
              Save With Partner Codes
            </a>
          </div>

          <!-- partner logo grid placeholder -->
          <div
            class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs uppercase tracking-wide"
          >
            <div class="card bg-base-100 border border-base-300">
              <div class="card-body py-4 px-4">
                <p class="font-semibold">PrimeFuel</p>
                <p class="text-[11px] text-base-content/70">
                  Supplements JT trusts.
                </p>
              </div>
            </div>
            <div class="card bg-base-100 border border-base-300">
              <div class="card-body py-4 px-4">
                <p class="font-semibold">Elevate Labs</p>
                <p class="text-[11px] text-base-content/70">
                  Performance blood work.
                </p>
              </div>
            </div>
            <div class="card bg-base-100 border border-base-300">
              <div class="card-body py-4 px-4">
                <p class="font-semibold">ColdCore</p>
                <p class="text-[11px] text-base-content/70">
                  Cold plunge recovery.
                </p>
              </div>
            </div>
            <div class="card bg-base-100 border border-base-300">
              <div class="card-body py-4 px-4">
                <p class="font-semibold">HeartStrong</p>
                <p class="text-[11px] text-base-content/70">
                  Cardio & endurance.
                </p>
              </div>
            </div>
            <div class="card bg-base-100 border border-base-300">
              <div class="card-body py-4 px-4">
                <p class="font-semibold">Origin Whey</p>
                <p class="text-[11px] text-base-content/70">
                  Clean protein sources.
                </p>
              </div>
            </div>
            <div class="card bg-base-100 border border-base-300">
              <div class="card-body py-4 px-4">
                <p class="font-semibold">EveryBody Fuel</p>
                <p class="text-[11px] text-base-content/70">
                  Everyday essentials.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- anchor for "partners_list" used above -->
        <div id="partners_list"></div>
      </section>

      <!-- email subscribe block (mirrors home-page newsletter CTA) -->
      <section
        class="border-b border-base-200 bg-base-100"
        id="join_newsletter"
      >
        <div
          class="max-w-3xl mx-auto px-4 py-12 md:py-16 text-center space-y-6"
        >
          <h2
            class="text-sm tracking-[0.3em] uppercase text-primary font-semibold"
          >
            Subscribe Now
          </h2>
          <p class="text-2xl md:text-3xl font-bold">
            Sign up for JT Fitness emails
          </p>
          <p class="text-sm md:text-base text-base-content/70">
            Weekly training thoughts, mindset prompts, and updates from the JT
            Fitness team.
          </p>

          <form
            class="max-w-md mx-auto flex flex-col sm:flex-row gap-3 mt-4"
            @submit.prevent="handle_newsletter_submit"
          >
            <label class="form-control w-full sm:flex-1">
              <span class="label">
                <span class="label-text text-xs uppercase tracking-wide">
                  Email Address
                </span>
              </span>
              <input
                v-model="newsletter_email"
                type="email"
                required
                placeholder="you@example.com"
                class="input input-bordered w-full"
              />
            </label>
            <button
              type="submit"
              class="btn btn-primary w-full sm:w-auto mt-1 sm:mt-7"
            >
              Sign Up
            </button>
          </form>

          <p v-if="newsletter_submitted" class="text-xs text-success mt-2">
            Thank you for subscribing to JT Fitness.
          </p>
        </div>
      </section>

      <!-- about + sobriety / commitment theme -->
      <section id="about" class="border-b border-base-200 bg-base-200/40">
        <div
          class="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-start"
        >
          <div class="space-y-4">
            <h2
              class="text-sm tracking-[0.3em] uppercase text-primary font-semibold"
            >
              About JT
            </h2>
            <h3 class="text-2xl md:text-3xl font-bold">
              Fitness and sobriety built the coach JT is today.
            </h3>
            <p class="text-base text-base-content/80">
              JT knows what it feels like to start over. To rebuild your body,
              your habits, and your circle. That is the lens every program is
              built from.
            </p>
            <p class="text-sm text-base-content/70">
              Coach, husband, father, and athlete — JT uses his own story to
              show what is possible when you remove the things that hold you
              back and replace them with what makes you stronger.
            </p>
            <div
              class="flex flex-wrap gap-2 text-xs uppercase tracking-wide mt-3"
            >
              <span class="badge badge-outline">Coach</span>
              <span class="badge badge-outline">Mentor</span>
              <span class="badge badge-outline">Athlete</span>
              <span class="badge badge-outline">Sober Lifestyle</span>
            </div>
            <a
              href="#media"
              class="btn btn-outline btn-sm mt-4 w-full sm:w-auto"
            >
              Hear More From JT
            </a>
          </div>

          <!-- stacked images / cards placeholder -->
          <div class="grid grid-cols-2 gap-4">
            <div
              class="col-span-2 aspect-[16/9] rounded-2xl bg-gradient-to-r from-primary/20 via-base-200 to-secondary/20 border border-base-300 flex items-center justify-center text-sm text-base-content/70"
            >
              Training day snapshots
            </div>
            <div
              class="aspect-square rounded-2xl bg-base-100 border border-base-300 flex items-center justify-center text-xs text-base-content/70"
            >
              Before / After
            </div>
            <div
              class="aspect-square rounded-2xl bg-base-100 border border-base-300 flex items-center justify-center text-xs text-base-content/70"
            >
              Community events
            </div>
          </div>
        </div>
      </section>

      <!-- join section (mirroring "Join the team") -->
      <section id="join" class="border-b border-base-200 bg-base-100">
        <div class="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div class="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-start">
            <div class="space-y-4">
              <h2
                class="text-sm tracking-[0.3em] uppercase text-primary font-semibold"
              >
                Join The JT Fitness Team
              </h2>
              <p class="text-2xl md:text-3xl font-bold">
                Become the strongest version of you.
              </p>
              <p class="text-base text-base-content/80">
                Hundreds of athletes have committed to JT Fitness coaching to
                take control of their health, mindset, and life.
              </p>
              <p class="text-sm text-base-content/70">
                This is more than a workout plan. It is structure, support, and
                accountability designed to help you become who you keep saying
                you want to be.
              </p>

              <div class="grid sm:grid-cols-2 gap-4 pt-4">
                <div class="space-y-2">
                  <p class="font-semibold text-sm">Custom Workout Programs</p>
                  <p class="text-xs text-base-content/70">
                    Training plans tailored to your goals, schedule, and
                    equipment with video guidance for every movement.
                  </p>
                </div>
                <div class="space-y-2">
                  <p class="font-semibold text-sm">Personalized Nutrition</p>
                  <p class="text-xs text-base-content/70">
                    Macros and meal structure built for your lifestyle, not
                    against it.
                  </p>
                </div>
                <div class="space-y-2">
                  <p class="font-semibold text-sm">Live Coaching Calls</p>
                  <p class="text-xs text-base-content/70">
                    Weekly Zoom calls focused on progress, mindset, discipline,
                    recovery, and service.
                  </p>
                </div>
                <div class="space-y-2">
                  <p class="font-semibold text-sm">Team Community</p>
                  <p class="text-xs text-base-content/70">
                    Group chat, events, and team workouts — because growth is
                    easier when you are not doing it alone.
                  </p>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-3 pt-6">
                <a href="#consult" class="btn btn-primary w-full sm:w-auto">
                  Click Here To Book Your Call
                </a>
                <a href="#challenge" class="btn btn-outline w-full sm:w-auto">
                  Join The JT Challenge
                </a>
              </div>
            </div>

            <!-- membership tiers -->
            <div class="space-y-4">
              <!-- elite 1:1 -->
              <div class="card bg-base-200 border border-base-300">
                <div class="card-body gap-2">
                  <p
                    class="text-xs uppercase tracking-[0.25em] text-primary font-semibold"
                  >
                    Elite 1:1
                  </p>
                  <p class="text-lg font-bold">Coaching & Mentorship</p>
                  <p class="text-xs text-base-content/70">
                    Built for those ready to go all in. Direct access to JT,
                    custom programming, and full accountability.
                  </p>
                  <p class="text-xs text-base-content/70">
                    Commitment options: 1 month • 6 months • 12 months Pricing
                    discussed on your consult call.
                  </p>
                  <a href="#consult" class="btn btn-sm btn-primary mt-2 w-full">
                    Book Elite Consult
                  </a>
                </div>
              </div>

              <!-- premium -->
              <div class="card bg-base-100 border border-base-300">
                <div class="card-body gap-2">
                  <p
                    class="text-xs uppercase tracking-[0.25em] text-secondary font-semibold"
                  >
                    Premium Subscription
                  </p>
                  <p class="text-lg font-bold">$99 / month</p>
                  <ul class="text-xs text-base-content/70 space-y-1">
                    <li>Weekly team Zoom calls</li>
                    <li>Team chat and support</li>
                    <li>Program and event access</li>
                  </ul>
                  <a
                    href="#contact"
                    class="btn btn-sm btn-secondary mt-2 w-full"
                  >
                    Click Here For Premium
                  </a>
                </div>
              </div>

              <!-- basic -->
              <div
                class="card bg-base-100 border border-dashed border-base-300"
              >
                <div class="card-body gap-2">
                  <p
                    class="text-xs uppercase tracking-[0.25em] text-base-content/70 font-semibold"
                  >
                    Basic Subscription
                  </p>
                  <p class="text-lg font-bold">$49 / month</p>
                  <ul class="text-xs text-base-content/70 space-y-1">
                    <li>Guided training and meal plan</li>
                    <li>No live Zooms or chat</li>
                    <li>Independent pace, with structure</li>
                  </ul>
                  <a href="#contact" class="btn btn-sm btn-outline mt-2 w-full">
                    Click Here For Basic
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- challenge section (mirrors Workman Would Challenge feel) -->
      <section id="challenge" class="border-b border-base-200 bg-base-200/40">
        <div
          class="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center"
        >
          <div class="space-y-4">
            <h2
              class="text-sm tracking-[0.3em] uppercase text-primary font-semibold"
            >
              The JT Challenge
            </h2>
            <p class="text-2xl md:text-3xl font-bold">
              Built to sharpen your body, mind, and spirit.
            </p>
            <p class="text-base text-base-content/80">
              This challenge is designed to demand more from you in every
              category — training, mindset, discipline, and how you show up for
              the people around you.
            </p>
            <p class="text-sm text-base-content/70">
              You will push your limits in the gym, strengthen your thinking,
              and rebuild the way you talk to yourself. The point is not to
              break you — it is to build you.
            </p>
            <div class="space-y-2 pt-3 text-xs text-base-content/80">
              <p>
                <span class="font-semibold">Daily journaling:</span> micro
                goals, gratitude, and nightly inventory.
              </p>
              <p>
                <span class="font-semibold">Daily connection:</span> reach out
                to 3 people every day.
              </p>
              <p>
                <span class="font-semibold">Training:</span> 5 lifting days each
                week or structured bodyweight work.
              </p>
              <p>
                <span class="font-semibold">Movement:</span> daily cardio and
                one weekly activity you genuinely enjoy.
              </p>
              <p>
                <span class="font-semibold">Nutrition:</span> real food focus,
                simple options to handle cravings.
              </p>
            </div>
            <a href="#join" class="btn btn-primary mt-4 w-full sm:w-auto">
              Join The Challenge
            </a>
          </div>

          <div
            class="rounded-3xl bg-base-100 border border-base-300 shadow-sm p-6 space-y-4 text-sm text-base-content/80"
          >
            <p class="font-semibold text-sm">
              This is chapter one of a new beginning.
            </p>
            <p>
              If you have been asking for change, this is where you start
              proving you mean it. Show up when it is easy, and especially when
              it is not.
            </p>
            <p>
              Track your work, check in with your people, and ask for help when
              you need it. That is how we win here.
            </p>
            <p class="text-xs text-base-content/60">
              Note: This section can be wired into your app or CRM for tracking
              points, streaks, and check-ins.
            </p>
          </div>
        </div>
      </section>

      <!-- results / transformations strip -->
      <section id="results" class="border-b border-base-200 bg-base-100">
        <div class="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div
            class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
          >
            <div>
              <h2
                class="text-sm tracking-[0.3em] uppercase text-primary font-semibold"
              >
                Results
              </h2>
              <p class="text-2xl md:text-3xl font-bold">
                The results speak for themselves.
              </p>
            </div>
            <a href="#consult" class="btn btn-sm btn-outline w-full md:w-auto">
              Book A Consult To Start Yours
            </a>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="card bg-base-200/60 border border-base-300">
              <div class="card-body gap-2">
                <p class="text-xs uppercase tracking-wide text-base-content/70">
                  3 Month Cut
                </p>
                <p class="font-bold text-sm">Alex — 203lbs to 188lbs</p>
                <p class="text-xs text-base-content/70">
                  More energy, more confidence, and a sustainable rhythm with
                  work and family.
                </p>
              </div>
            </div>
            <div class="card bg-base-200/60 border border-base-300">
              <div class="card-body gap-2">
                <p class="text-xs uppercase tracking-wide text-base-content/70">
                  Mindset Shift
                </p>
                <p class="font-bold text-sm">JP — From stuck to leader</p>
                <p class="text-xs text-base-content/70">
                  Built muscle, built discipline, and became a voice of
                  encouragement for the entire team.
                </p>
              </div>
            </div>
            <div class="card bg-base-200/60 border border-base-300">
              <div class="card-body gap-2">
                <p class="text-xs uppercase tracking-wide text-base-content/70">
                  42 Day Sprint
                </p>
                <p class="font-bold text-sm">Nate — 6 week overhaul</p>
                <p class="text-xs text-base-content/70">
                  100% compliance to training and nutrition — proof of what
                  happens when you commit fully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- media section -->
      <section id="media" class="border-b border-base-200 bg-base-200/40">
        <div class="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div
            class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
          >
            <div>
              <h2
                class="text-sm tracking-[0.3em] uppercase text-primary font-semibold"
              >
                Media
              </h2>
              <p class="text-2xl md:text-3xl font-bold">Hear more from JT.</p>
              <p class="text-sm text-base-content/70 mt-2">
                Long-form conversations on recovery, discipline, and earning
                your confidence every day.
              </p>
            </div>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="card bg-base-100 border border-base-300">
              <div class="card-body gap-2">
                <p class="text-xs uppercase tracking-wide text-base-content/70">
                  Podcast
                </p>
                <p class="font-bold text-sm">
                  Discovering hope in hard seasons
                </p>
                <p class="text-xs text-base-content/70">
                  JT breaks down the early days of his journey and what keeps
                  him showing up now.
                </p>
                <button class="btn btn-sm btn-outline mt-2">Watch Now</button>
              </div>
            </div>
            <div class="card bg-base-100 border border-base-300">
              <div class="card-body gap-2">
                <p class="text-xs uppercase tracking-wide text-base-content/70">
                  Podcast
                </p>
                <p class="font-bold text-sm">Standing out in a crowded space</p>
                <p class="text-xs text-base-content/70">
                  How JT built a coaching brand rooted in service, not
                  shortcuts.
                </p>
                <button class="btn btn-sm btn-outline mt-2">Watch Now</button>
              </div>
            </div>
            <div class="card bg-base-100 border border-base-300">
              <div class="card-body gap-2">
                <p class="text-xs uppercase tracking-wide text-base-content/70">
                  Podcast
                </p>
                <p class="font-bold text-sm">Fitness, sobriety, and service</p>
                <p class="text-xs text-base-content/70">
                  A conversation about using your story to help other people
                  win.
                </p>
                <button class="btn btn-sm btn-outline mt-2">Watch Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- consult + contact section -->
      <section id="consult" class="border-b border-base-200 bg-base-100">
        <div
          class="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10"
        >
          <div class="space-y-4">
            <h2
              class="text-sm tracking-[0.3em] uppercase text-primary font-semibold"
            >
              Book A Consult
            </h2>
            <p class="text-2xl md:text-3xl font-bold">
              Ready to talk through your goals?
            </p>
            <p class="text-base text-base-content/80">
              Use the form to request a coaching consult. We will cover your
              goals, training history, and what it will take to get there.
            </p>
            <p class="text-sm text-base-content/70">
              This is not a sales pitch. It is an honest conversation about the
              work ahead, the support you will get, and whether it is the right
              fit on both sides.
            </p>
            <a href="#contact" class="btn btn-primary w-full sm:w-auto mt-4">
              Go To Contact
            </a>
          </div>

          <!-- simple contact form (static for now) -->
          <div id="contact" class="card bg-base-200/60 border border-base-300">
            <div class="card-body gap-3">
              <h3 class="font-semibold text-sm uppercase tracking-[0.25em]">
                Contact JT Fitness
              </h3>
              <form class="space-y-3" @submit.prevent>
                <label class="form-control">
                  <span class="label">
                    <span class="label-text text-xs uppercase tracking-wide">
                      Name
                    </span>
                  </span>
                  <input
                    type="text"
                    placeholder="Full name"
                    class="input input-bordered input-sm"
                  />
                </label>

                <label class="form-control">
                  <span class="label">
                    <span class="label-text text-xs uppercase tracking-wide">
                      Email
                    </span>
                  </span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    class="input input-bordered input-sm"
                  />
                </label>

                <label class="form-control">
                  <span class="label">
                    <span class="label-text text-xs uppercase tracking-wide">
                      Message
                    </span>
                  </span>
                  <textarea
                    class="textarea textarea-bordered textarea-sm min-h-[96px]"
                    placeholder="Share a bit about your goals and where you are starting from."
                  ></textarea>
                </label>

                <button
                  type="submit"
                  class="btn btn-primary btn-sm w-full mt-2"
                >
                  Submit Inquiry
                </button>
              </form>

              <div class="pt-3 text-xs text-base-content/70">
                <p>
                  For media inquiries:
                  <span class="font-mono">media@jtfitness.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- footer -->
    <footer class="bg-base-100 border-t border-base-200">
      <div
        class="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div class="text-xs text-base-content/70 text-center md:text-left">
          <p class="font-semibold tracking-[0.25em] uppercase">JT Fitness</p>
          <p>Online coaching • Community • Lifestyle</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <p class="text-xs uppercase tracking-[0.25em] text-base-content/60">
            Follow Me
          </p>
          <div class="flex gap-3 text-xs">
            <a href="#" class="link link-hover">Instagram</a>
            <a href="#" class="link link-hover">TikTok</a>
            <a href="#" class="link link-hover">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
