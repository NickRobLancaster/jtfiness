// stores/exampleStore.js
import { defineStore } from "pinia";

export const useApiStore = defineStore("apiStore", {
  state: () => ({
    api_status: "Active",

    selected_theme: "",

    session: null,

    toasts: [],

    //showers
    show_create_user: false,
    users_create_or_edit_mode: "",
    users_filter: "All", //all, super, admin, user

    table_pagination_settings: {
      page: 1,
      limit: 20,
    },

    show_create_organization: false,
    organizations_create_or_edit_mode: "",
    organizations_filter: "",

    show_create_drug_test_batch: false,
    show_create_drug_test: false,
    drug_test_create_or_edit_mode: "", // create or edit
    drug_test_edit_mode: "", // editTest, editResult
    drug_test_filter: "All", //all, waiting-for-return, processing, complete, abandoned
    drug_test_built_query: {},

    checkboxed_rows_drug_tests: [],
    show_create_labels: false,
    labels_to_generate: [],

    show_create_drug: false,
    drug_create_or_edit_mode: "",
    drug_filter: "All", //all, stimulant, depressant, opioid, psychedelic, cannabinoid, dissociative, other

    show_logout: false,

    //lists
    users: [],
    organizations: [],
    drug_tests: [],
    drugs: [],
  }),

  actions: {
    //actions here / functions
    set_session(session) {
      this.session = session;
      //locally store the session
      // localStorage.setItem("session", JSON.stringify(session));
    },

    show_modal(shower) {
      console.log("SHOWING: ", shower);
      this[shower] = true;

      console.log(`TOGGLED ${shower}: `, this[shower]);
    },

    hide_modal(shower) {
      console.log("HIDING: ", shower);
      this[shower] = false;

      console.log("SHOW_CREATE_USER: ", this.show_create_user);
    },

    delete_toast(index) {
      this.toasts.splice(index, 1);
    },

    create_toast(toast) {
      // add a unique key to the toast - universal time stamp string
      toast.key = new Date().getTime().toString();

      this.toasts.push(toast);

      setTimeout(() => {
        this.toasts.shift();
      }, 3000);
    },

    // delete request to /api/auth/logout
    async logout() {
      try {
        const response = await $fetch("/api/auth/logout", {
          method: "DELETE",
        });

        console.log("LOGOUT RESPONSE: ", response);

        if (response.status === "success") {
          this.session = null;
          this.show_logout = false;

          await navigateTo("/admin");

          this.create_toast({
            title: "Success",
            message: "Logged out",
            color: "bg-orange-500",
          });
        }
      } catch (error) {
        console.error("Error logging out:", error);

        this.create_toast({
          title: "Error",
          message: "Failed to log out",
          color: "bg-red-500",
        });
      }
    },

    //fetch users

    async fetch_users() {
      try {
        const users = await $fetch("/api/users/list", {
          method: "GET",
        });
        this.users = users;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async fetch_drug_tests() {
      try {
        const drug_tests = await $fetch("/api/drug_tests/list", {
          method: "GET",
        });
        this.drug_tests = drug_tests;
      } catch (error) {
        console.error("Error fetching drug tests:", error);
      }
    },

    async fetch_drugs() {
      try {
        const drugs = await $fetch("/api/drugs/list", {
          method: "GET",
        });
        this.drugs = drugs;
      } catch (error) {
        console.error("Error fetching drugs:", error);
      }
    },

    async create_user(user) {
      try {
        const new_user = await $fetch("/api/users/create", {
          method: "POST",
          body: JSON.stringify(user),
        });
        this.users.push(new_user);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },

    async create_drug_test(drug_test) {
      try {
        const new_drug_test = await $fetch("/api/drug_tests/create", {
          method: "POST",
          body: JSON.stringify(drug_test),
        });
        this.drug_tests.push(new_drug_test);
      } catch (error) {
        console.error("Error creating drug test:", error);
      }
    },

    async create_drug(drug) {
      try {
        const new_drug = await $fetch("/api/drugs/create", {
          method: "POST",
          body: JSON.stringify(drug),
        });
        this.drugs.push(new_drug);
      } catch (error) {
        console.error("Error creating drug:", error);
      }
    },
  },
  getters: {
    //getters here
  },
  persist: {
    omit: [
      //all show_ variables
      "show_create_user",
      "show_create_organization",
      "show_create_drug_test",
      "show_create_drug",
      "show_logout",
      "toasts",
    ],
  },
});
