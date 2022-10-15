import { createRouter, createWebHashHistory } from "vue-router";

// There are no lazily loaded components with route level code-splitting to ensure all code is loaded on first open,
// So that then entire app can be precached and allow app to be fully offline from next use.
// Thus all the components are imported at top level first
import Home from "./views/Home.vue";
import FoamCalculator from "./views/FoamCalculator.vue";
import Search from "./views/Search.vue";
import SearchEquipment from "./views/SearchEquipment.vue";
import Chemical from "./views/Chemical.vue";
import DetectionEquipment from "./views/DetectionEquipment.vue";
import MitigationEquipment from "./views/MitigationEquipment.vue";
import PPE from "./views/PPE.vue";

export default createRouter({
  history: createWebHashHistory(),

  // Alternatively, import 'createWebHistory' to use history mode instead
  // history: createWebHistory(),

  // Always scroll to top of view on first visit and no savedPosition, else reuse savedPosition
  // scrollBehavior(_to, _from, savedPosition) {
  //   if (savedPosition) return savedPosition;
  //   else return { top: 0 };
  // },

  // @todo Choose the better scoll behavior here

  // Scroll to top for all route navigations, and if there is a savedPosition it will result in native-like behavior when navigating with back/forward buttons
  scrollBehavior: (_to, _from, savedPosition) =>
    savedPosition ? savedPosition : { top: 0 },

  /**
   * Since this app is just a reference to publicly available data,
   * there is no private routes needed, thus all routes defined here.
   */
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/foam",
      name: "foam-calculator",
      component: FoamCalculator,
      // Pass URL query parameters as prop to component
      props: (route) => route.query,
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
      // Wild card so any invalid name comes here
      path: "/:pathMatch(.*)*",
      name: "404",
      // @todo Might add a 404 view instead of just redirecting back to home page
      // component: () => import("./views/404.vue"),
      redirect: { name: "home" },
    },
  ],
});
