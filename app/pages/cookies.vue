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
            Cookie Policy
          </h1>

          <p class="mt-4 text-sm sm:text-base max-w-xl text-base-100/90">
            How and why we use cookies and similar technologies on this website.
          </p>
        </div>
      </div>
    </section>

    <!-- content -->
    <main class="flex-1">
      <section
        class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10 md:space-y-14"
      >
        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">1. What Are Cookies?</h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            Cookies are small text files stored on your device when you visit a
            website. They help improve your browsing experience, remember your
            preferences, and allow certain site features to function properly.
            Cookies may also help us understand how visitors interact with our
            pages so we can improve the site over time.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">
            2. Types of Cookies We Use
          </h2>

          <ul
            class="space-y-2 text-sm sm:text-base text-base-content/80 leading-relaxed"
          >
            <li>
              <strong>Essential cookies:</strong> Required for core site
              functionality, such as page navigation, form submission, and
              secure access to certain features.
            </li>
            <li>
              <strong>Performance & analytics cookies:</strong> Help us
              understand how visitors use our site (for example, which pages are
              visited most). These are used to improve website performance.
            </li>
            <li>
              <strong>Preference cookies:</strong> Remember your settings and
              preferences, such as dark mode, region, or saved form information.
            </li>
            <li>
              <strong>Marketing & tracking cookies (optional):</strong> Used
              only if you opt in. These help measure how ads or social links
              perform and may personalize content you see from us.
            </li>
          </ul>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">
            3. How We Use Cookie Data
          </h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            We use cookie information to:
          </p>
          <ul class="space-y-2 text-sm sm:text-base text-base-content/80">
            <li>Maintain website functionality and security.</li>
            <li>Improve site performance and loading speed.</li>
            <li>Analyze visitor behavior to optimize content.</li>
            <li>Remember your preferences for a better user experience.</li>
            <li>
              Offer optional personalized recommendations or marketing (if you
              consent).
            </li>
          </ul>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">
            4. Third-Party Tools That May Use Cookies
          </h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            We may use third-party services that set cookies, such as:
          </p>
          <ul class="space-y-2 text-sm sm:text-base text-base-content/80">
            <li>Google Analytics or similar performance-tracking tools.</li>
            <li>Email or marketing automation providers.</li>
            <li>Embedded content platforms (videos, social posts, etc.).</li>
          </ul>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            These services have their own privacy and cookie policies. We do not
            control their cookie settings directly.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">
            5. How You Can Control Cookies
          </h2>

          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            You can manage or disable cookies at any time:
          </p>

          <ul class="space-y-2 text-sm sm:text-base text-base-content/80">
            <li>Adjust your browser settings to block or delete cookies.</li>
            <li>
              Opt out of analytics or marketing cookies when prompted (if cookie
              banners or consent options are available).
            </li>
            <li>Decline optional cookies when offered.</li>
          </ul>

          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            Note: disabling certain cookies may affect how the website
            functions.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">
            6. Changes to This Policy
          </h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            We may update this Cookie Policy periodically to reflect changes in
            technology, legal requirements, or how we use cookies. Updates will
            be posted on this page with an updated effective date.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">7. Contact Us</h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            If you have questions about our Cookie Policy or wish to request
            more information, contact us:
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
            <NuxtLink to="/contact" class="link link-hover"
              >Get in touch</NuxtLink
            >
          </p>
        </div>

        <div class="flex flex-wrap gap-3 md:gap-4">
          <NuxtLink to="/" class="link link-hover">Home</NuxtLink>
          <NuxtLink to="/method" class="link link-hover"
            >The JT Method</NuxtLink
          >
          <NuxtLink to="/results" class="link link-hover">Results</NuxtLink>
          <NuxtLink to="/free-guides" class="link link-hover"
            >Free Guides</NuxtLink
          >
          <NuxtLink to="/services" class="link link-hover">Services</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const hero_image_url = "/images/dead_lift.jpg";
</script>
