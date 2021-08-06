/* For sites that can be accessed via multiple domains */
// Function to redirect user to the preferred domain instead of the default firebase hosting domains if they land there.
// IIFE to prevent polluting the global namespace accidentally
(function () {
  const location = window.location.hostname;
  console.log(`Window location: ${location}`);

  // Add links to redirect as needed
  // if (location === "example.com" || location === "example2.com")
  //   window.location.replace("https://yourdomain.com");
})();

import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import "./registerServiceWorker";

Vue.config.productionTip = false;

// Register global custom directive called `v-autofocus`
import autofocus from "./directives/autofocus";
Vue.directive("autofocus", autofocus);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
