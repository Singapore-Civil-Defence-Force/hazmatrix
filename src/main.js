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
import "./registerServiceWorker";

import firebase from "firebase/app";
import "firebase/auth";

import router from "./router";
// import store from "./store";

Vue.config.productionTip = false;

// Register global custom directive called `v-autofocus`
import autofocus from "./directives/autofocus";
Vue.directive("autofocus", autofocus);

// firebaseConfig auto generated in project settings
firebase.initializeApp({
  apiKey: "AIzaSyCrCpzzlzTPy-jRyZJtCJ32gI92JTKLtXE",
  authDomain: "scdf-ims.firebaseapp.com",
  projectId: "scdf-ims",
  storageBucket: "scdf-ims.appspot.com",
  messagingSenderId: "717898693523",
  appId: "1:717898693523:web:dbc203e54f9c4e2b700666",
});

// Make firebase use browser's default language
firebase.auth().useDeviceLanguage();

// App variable to store reference to the vue App object
let app;

/**
 * @notice Why new vue is wrapped in this.
 * Wait for firebase to finish initialization before creating the app.
 * So that the router navigation wont break due to invalid auth
 */
const unsubscribe = firebase.auth().onAuthStateChanged(() => {
  // Prevent app initialization from running more than once
  if (!app)
    // Create new vue app
    app = new Vue({
      router,
      // store,
      render: (h) => h(App),
    }).$mount("#app");

  // Use the firebase.Unsubscribe function returned from adding auth state change listner to unsubscribe
  // To prevent new Vue from running more than once
  unsubscribe();
});
