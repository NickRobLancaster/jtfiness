<template>
  <div class="min-h-screen bg-base-100 text-base-content flex flex-col">
    <!-- hero -->
    <section
      class="h-[60vh] w-full bg-cover bg-center bg-no-repeat flex items-center"
      :style="{ backgroundImage: `url('${hero_image_url}')` }"
    >
      <div class="w-full bg-black/70">
        <div
          class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-base-100"
        >
          <p
            class="uppercase tracking-[0.25em] text-[0.65rem] md:text-xs text-primary/80 font-semibold mb-3"
          >
            jt fitness
          </p>

          <h1
            class="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl"
          >
            Privacy Policy
          </h1>

          <p class="mt-4 text-sm sm:text-base max-w-xl text-base-100/90">
            How we handle your data, protect your information, and keep your
            privacy a priority.
          </p>
        </div>
      </div>
    </section>

    <main class="flex-1">
      <section
        class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10 md:space-y-14"
      >
        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">1. Overview</h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            This Privacy Policy describes how JT Fitness collects, uses, stores,
            and protects your personal information when you visit our website,
            purchase coaching services, download guides, or communicate with us.
            By using this website, you agree to the practices outlined here.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">2. Information We Collect</h2>

          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            We collect information in the following ways:
          </p>

          <ul class="space-y-2 text-sm sm:text-base text-base-content/80">
            <li>
              <strong>Information you provide directly:</strong> such as your
              name, email, phone number, and details you submit through forms,
              applications, or coaching questionnaires.
            </li>
            <li>
              <strong>Payment information:</strong> processed securely through
              third-party providers. We do not store your full payment details.
            </li>
            <li>
              <strong>Usage data:</strong> including pages visited, device type,
              browser information, and interactions collected through analytics
              tools.
            </li>
            <li>
              <strong>Communication data:</strong> such as messages, emails, or
              support requests.
            </li>
          </ul>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">3. How We Use Your Information</h2>

          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            Your information is used for:
          </p>

          <ul class="space-y-2 text-sm sm:text-base text-base-content/80">
            <li>Providing coaching services and program updates.</li>
            <li>Sending requested resources or free guides.</li>
            <li>Improving the website experience and service quality.</li>
            <li>Communicating about your account, services, or inquiries.</li>
            <li>
              Marketing messages (only if you voluntarily opt-in; you may
              unsubscribe at any time).
            </li>
          </ul>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">4. How We Protect Your Data</h2>

          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            We use industry-standard measures to safeguard your information,
            including encrypted transmission, password-secured access, and
            reputable third-party service providers. While no system is 100%
            secure, we take reasonable steps to prevent unauthorized access,
            loss, or misuse of your data.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">
            5. Sharing of Information
          </h2>

          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            We do not sell or rent your personal information. We only share data
            with:
          </p>

          <ul class="space-y-2 text-sm sm:text-base text-base-content/80">
            <li>
              <strong>Service providers</strong> (such as payment processors or
              email systems) that support our operations.
            </li>
            <li>
              <strong>Legal authorities</strong> if required by law or to
              protect our rights, safety, or compliance obligations.
            </li>
          </ul>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">6. Cookies & Tracking</h2>

          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            Our website uses cookies and analytics tools to understand how users
            interact with our pages, improve performance, and ensure smooth user
            experience. You may disable cookies in your browser settings, but
            some features may not function properly.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">7. Your Choices</h2>

          <ul class="space-y-2 text-sm sm:text-base text-base-content/80">
            <li>You may request access to the personal information we hold.</li>
            <li>You may request corrections or updates to your information.</li>
            <li>You may unsubscribe from marketing messages at any time.</li>
            <li>You may request deletion of your data when allowed by law.</li>
          </ul>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">8. Children’s Privacy</h2>

          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            JT Fitness does not knowingly collect information from individuals
            under the age of 13. If we learn that personal data from a child has
            been collected, we will take steps to remove it promptly.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">9. Updates to This Policy</h2>

          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            This Privacy Policy may be updated occasionally. When changes are
            made, the updated date will be displayed at the bottom of the page.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">10. Contact Us</h2>

          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            If you have questions about this Privacy Policy or how we handle
            your data, you may contact us at:
          </p>

          <p class="text-sm sm:text-base">
            <strong>Email:</strong> 3jtfitness3@gmail.com<br />
            <strong>Phone:</strong> 951-385-1941
          </p>
        </div>

        <p class="text-xs text-base-content/50 pt-4">
          Last updated: {{ new Date().getFullYear() }}
        </p>
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
          <NuxtLink to="/method" class="link link-hover">The JT Method</NuxtLink>
          <NuxtLink to="/results" class="link link-hover">Results</NuxtLink>
          <NuxtLink to="/free-guides" class="link link-hover">Free Guides</NuxtLink>
          <NuxtLink to="/services" class="link link-hover">Services</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const hero_image_url = "/images/dead_lift.jpg";
</script>
