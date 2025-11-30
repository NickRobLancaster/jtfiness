import { defineNuxtPlugin } from "nuxt/app";
import { plugin as VueTippy } from "vue-tippy";
import "tippy.js/dist/tippy.css"; // core styles
import "tippy.js/animations/scale.css"; // optional animation

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy, {
    directive: "tippy", // v-tippy
    component: "tippy", // <tippy>
    componentSingleton: "tippy-singleton",
    defaultProps: {
      animation: "scale",
      arrow: true,
      delay: [100, 0],
      placement: "top",
      theme: "light",
      trigger: "mouseenter click",
    },
  });
});
