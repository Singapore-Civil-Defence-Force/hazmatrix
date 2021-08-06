import Vue from "vue";
import VueRouter from "vue-router";

// Attach use of vue route to the vue object instance
Vue.use(VueRouter);

export default new VueRouter({
  // Scroll to top for all route navigations, and if there is a savedPosition it will result in native-like behavior when navigating with back/forward buttons
  scrollBehavior: (to, from, savedPosition) =>
    savedPosition ? savedPosition : { x: 0, y: 0 },

  /**
   * Since this app is just a reference to publicly available data, there is no private routes needed, thus all routes defined here
   *
   * @notice
   * Routes uses lazily loaded components with route level code-splitting
   * this generates a separate chunk (about.[hash].js) for this route
   * which is lazy-loaded when the route is visited.
   */
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/phone-login",
      name: "phone-login",
      component: () => import("@/views/PhoneLogin.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home.vue"),
      // Pass URL query parameters as prop to component
      props: (route) => route.query,
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/Settings.vue"),
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
