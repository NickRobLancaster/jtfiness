// stores/exampleStore.js
import { defineStore } from "pinia";
import { useNuxtApp } from "#app";

export const useWebsiteStore = defineStore("websiteStore", {
  state: () => ({
    showHamburgerMenu: false,
    showToasts: false,
    show_request_kits: false,

    filtered_drug_tests: [],
    // toast notifications
    toasts: [], // array of objects {message: 'message', type: 'success/error', color: 'green/red'}
  }),

  actions: {
    toggleShowItem(item) {
      this[item] = true;
    },

    toggleHideItem(item) {
      this[item] = false;
    },

    addToast(messageObj) {
      this.toasts.push(messageObj);
    },
  },
});
