<script setup>
import { useWebsiteStore } from "../stores/websiteStore";
//import the router so we can interpolate the current route
import { useRoute } from "vue-router";

const websiteStore = useWebsiteStore();

const route = useRoute();

function handleSelected() {
  websiteStore.toggleHideItem("showHamburgerMenu");
}
</script>

<template>
  <!-- nav links -->
  <div class="ml-auto flex flex-col md:flex-row items-center gap-3">
    <!-- nuxt links -->
    <nuxt-link
      to="/"
      @click="handleSelected"
      active-class="border-base-300
 bg-primary"
      class="btn bg-base-100 text-base-content"
    >
      Home
    </nuxt-link>

    <nuxt-link
      to="/jt-method"
      @click="handleSelected"
      active-class="border-base-300
 bg-primary"
      class="btn bg-base-100 text-base-content"
    >
      The JT Method
    </nuxt-link>

    <nuxt-link
      to="/work-with-us"
      @click="handleSelected"
      active-class="border-base-300
 bg-primary"
      class="btn bg-base-100 text-base-content"
    >
      Work With Us
    </nuxt-link>

    <nuxt-link
      to="/results"
      @click="handleSelected"
      active-class="border-base-300
 bg-primary"
      class="btn bg-base-100 text-base-content"
    >
      Results
    </nuxt-link>

    <nuxt-link
      to="/free-guides"
      @click="handleSelected"
      active-class="border-base-300
 bg-primary"
      class="btn bg-base-100 text-base-content"
    >
      Free Guides
    </nuxt-link>
    <!-- SANDBAG -->
    <!-- <nuxt-link
      to="/substance-catelog"
      @click="handleSelected"
      active-class="border-base-300
 bg-primary"
      class="btn bg-base-100 text-base-content"
    >
      Substance Catelog
    </nuxt-link> -->

    <nuxt-link
      to="/services"
      @click="handleSelected"
      active-class="border-base-300
 bg-primary"
      class="btn bg-base-100 text-base-content"
    >
      Services
    </nuxt-link>
  </div>
</template>
