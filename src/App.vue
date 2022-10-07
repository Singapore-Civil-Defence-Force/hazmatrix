<!-- Parent component that contains and switches between all the view components using view router's router-view -->
<template>
  <div>
    <!-- Using keep-alive to cache the pages to
        - optimize their rendering time when navigating back and forth a set of views
        - keep UI and state of view between navigations,
          - e.g. keep details tag open/close after clicking into a specific equipment and going back to see the chemical view
          - e.g. keep the page scroll location so that it feels more natural after going back with a back button.
        
        - Only cache maximum of 4 views to prevent using too much memory and crashing site especially on less powerful mobile devices
        
        - :key forces vue to create new version of a cached component if the route param(s) are different
    -->
    <keep-alive max="4">
      <router-view :key="$route.fullPath" />
    </keep-alive>

    <!-- @todo Conditionally cache views on a route by route basis -->
    <!-- Alternative way: https://vuejs.org/guide/built-ins/keep-alive.html#include-exclude -->
    <!--
      <keep-alive v-if="$route.meta.keepAlive" max="4">
        <router-view :key="$route.fullPath" />
      </keep-alive>
      <router-view v-else />
    -->
  </div>
</template>

<!-- Unscoped styles that applies to the entire application -->
<style>
/* Alternative bulma import using CDN */
/* @import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"; */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Shared class for all views. */
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  height: 100vh;
}
</style>
