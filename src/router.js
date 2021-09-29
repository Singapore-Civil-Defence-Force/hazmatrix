import Vue from "vue";
import VueRouter from "vue-router";

// Attach use of vue route to the vue object instance
Vue.use(VueRouter);

// There are no lazily loaded components with route level code-splitting to ensure all code is loaded on first open,
// So that then entire app can be precached and allow app to be fully offline from next use.
// Thus all the components are imported at top level first
import Home from "@/views/Home.vue";
import Search from "@/views/Search.vue";
import SearchEquipment from "@/views/SearchEquipment.vue";
import Chemical from "@/views/Chemical.vue";
import DetectionEquipment from "@/views/DetectionEquipment.vue";
import MitigationEquipment from "@/views/MitigationEquipment.vue";
import PPE from "@/views/PPE.vue";

export default new VueRouter({
  // Scroll to top for all route navigations, and if there is a savedPosition it will result in native-like behavior when navigating with back/forward buttons
  scrollBehavior: (to, from, savedPosition) =>
    savedPosition ? savedPosition : { x: 0, y: 0 },

  //  Since this app is just a reference to publicly available data, there is no private routes needed, thus all routes defined here
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      // Pass URL query parameters as prop to component
      props: (route) => route.query,
    },
    {
      path: "/search-equipment",
      name: "search-equipment",
      component: SearchEquipment,
      // Pass URL query parameters as prop to component
      props: (route) => route.query,
    },
    {
      path: "/chemical/:id",
      props: true,
      name: "chemical",
      component: Chemical,
    },
    {
      path: "/equipment/detection/:id",
      // Props is an object with fields from both params and query parameters
      // Important to ensure that they do not use the same key
      props: (route) => ({ ...route.params, ...route.query }),
      name: "detection-equipment",
      component: DetectionEquipment,
    },
    {
      path: "/equipment/mitigation/:id",
      // Props is an object with fields from both params and query parameters
      // Important to ensure that they do not use the same key
      props: (route) => ({ ...route.params, ...route.query }),
      name: "mitigation-equipment",
      component: MitigationEquipment,
    },
    {
      path: "/ppe/:id",
      props: true,
      name: "PPE",
      component: PPE,
    },

    // NotFound Client side 404 route
    {
      // Make this a wild card so any invalid name comes here
      path: "/**",
      name: "*",
      // @todo Might add a 404 component instead of just redirecting back to home page
      // component: () => import("../views/NotFound.vue"),
      redirect: { name: "home" },
    },
  ],
});
