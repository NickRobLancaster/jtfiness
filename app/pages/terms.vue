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
            Terms & Conditions
          </h1>

          <p class="mt-4 text-sm sm:text-base max-w-xl text-base-100/90">
            The terms that govern your use of this website, coaching programs,
            services, and digital resources.
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
          <h2 class="text-xl md:text-2xl font-bold">1. Acceptance of Terms</h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            By accessing or using the JT Fitness website, programs, services,
            digital guides, or communications, you agree to these Terms &
            Conditions. If you do not agree, you should discontinue use of this
            website and our services.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">2. Coaching Disclaimer</h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            JT Fitness provides general fitness, nutrition, and lifestyle
            education. We do not diagnose, treat, or prescribe for medical
            conditions. Nothing provided through our coaching should replace
            professional medical advice. Always consult with a physician before
            beginning any exercise or nutrition program, especially if you have
            injuries, medical conditions, or concerns.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">3. Eligibility</h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            You must be at least 18 years old to participate in JT Fitness
            coaching or download our guides. By engaging with our services, you
            confirm that all information you provide is accurate and truthful.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">4. Payment & Billing</h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            Coaching programs or services may require payment before access is
            granted. You agree to provide accurate billing information. All
            payments are processed securely by third-party providers. We do not
            store your full payment details.
          </p>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            Refund policies (if applicable) will be listed in your coaching
            agreement or service documentation.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">
            5. Use of Digital Resources
          </h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            All digital guides, PDFs, documents, and resources provided by JT
            Fitness are for personal use only. You may not reproduce, share,
            distribute, resell, or modify these materials without written
            permission from JT Fitness.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">
            6. Expected Results & Individual Variability
          </h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            Fitness and nutrition results vary widely based on consistency,
            genetics, health status, adherence, lifestyle, and personal effort.
            JT Fitness does not guarantee specific results, outcomes, or
            timelines. All progress depends on individual circumstances.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">
            7. User Responsibilities
          </h2>
          <ul
            class="space-y-2 text-sm sm:text-base text-base-content/80 leading-relaxed"
          >
            <li>
              You agree to follow coaching guidance to the best of your ability.
            </li>
            <li>
              You agree to communicate injuries, limitations, or concerns
              honestly.
            </li>
            <li>You agree not to misuse this website or coaching services.</li>
            <li>
              You agree to refrain from any offensive, harmful, or abusive
              behavior.
            </li>
          </ul>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">
            8. Limitations of Liability
          </h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            JT Fitness is not liable for injuries, losses, or damages resulting
            from your participation in exercise programs, nutrition guidance, or
            use of this website. You acknowledge all physical activity carries
            inherent risks, and you voluntarily assume full responsibility for
            your actions.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">
            9. Intellectual Property
          </h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            All content on this website—including logos, text, images, guides,
            videos, and branding—belongs to JT Fitness and may not be copied or
            used without permission.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">10. External Links</h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            Our website may contain links to third-party sites. JT Fitness is
            not responsible for the content, privacy policies, or actions of
            external websites.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">
            11. Changes to These Terms
          </h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            JT Fitness may update these Terms & Conditions from time to time.
            The updated version will be posted on this page with the latest
            revision date.
          </p>
        </div>

        <!-- section -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-bold">12. Contact Information</h2>
          <p class="text-sm sm:text-base text-base-content/80 leading-relaxed">
            For questions about these Terms & Conditions, contact us at:
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
