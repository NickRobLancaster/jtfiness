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
      to="/contact"
      @click="handleSelected"
      active-class="border-base-300
 bg-primary"
      class="btn bg-base-100 text-base-content"
    >
      Contact
    </nuxt-link>

    <div class="dropdown dropdown-hover">
      <!-- trigger -->
      <div
        tabindex="0"
        role="button"
        class="btn bg-base-100 text-base-content m-1"
      >
        About
      </div>

      <!-- dropdown list -->
      <ul
        tabindex="-1"
        class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm"
      >
        <li class="whitespace-nowrap">
          <nuxt-link
            to="/about-us"
            @click="handleSelected"
            active-class="border-base-300 bg-primary text-primary-content"
            class="text-base-content hover:bg-base-200 rounded-lg"
          >
            About Us
          </nuxt-link>
        </li>
        <li class="whitespace-nowrap">
          <nuxt-link
            to="/about-this-program"
            @click="handleSelected"
            active-class="border-base-300 bg-primary text-primary-content"
            class="text-base-content hover:bg-base-200 rounded-lg"
          >
            About This Program
          </nuxt-link>
        </li>
      </ul>
    </div>

    <nuxt-link
      to="/learn-more"
      @click="handleSelected"
      active-class="border-base-300
 bg-primary"
      class="btn bg-base-100 text-base-content"
    >
      Learn More
    </nuxt-link>

    <nuxt-link
      to="/request-kits"
      @click="handleSelected"
      active-class="border-base-300
 bg-primary"
      class="btn bg-base-100 text-base-content"
    >
      Request Kits
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
      to="/check-results"
      @click="handleSelected"
      active-class="border-base-300
 bg-primary"
      class="btn bg-base-100 text-base-content"
    >
      Check Results
    </nuxt-link>
  </div>
</template>
