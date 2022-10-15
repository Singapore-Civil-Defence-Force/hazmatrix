<!-- Parent component that contains and switches between all the view components using view router's router-view -->
<template>
  <!--
    Using keep-alive to cache the pages to
    - optimize their rendering time when navigating back and forth a set of views
    - keep UI and state of view between navigations,
      - e.g. keep details tag open/close after clicking into a specific equipment and going back to see the chemical view
      - e.g. keep the page scroll location so that it feels more natural after going back with a back button.
    - Only cache maximum of 2 views to prevent using too much memory and crashing site especially on less powerful mobile devices
      - 2 views will allow you to switch between the last 2 views user is on without feeling like it reloaded.
  -->
  <router-view v-slot="{ Component }">
    <keep-alive max="2">
      <component :is="Component" :key="$route.fullPath" />
    </keep-alive>
  </router-view>

  <!--
    Alternative way: https://vuejs.org/guide/built-ins/keep-alive.html#include-exclude
    This conditionally caches views on a route by route basis and can be controlled by the meta prop in router.
  -->
  <!--
  <router-view v-slot="{ Component }">
    <keep-alive v-if="$route.meta.keepAlive" max="2">
      <component :is="Component" />
    </keep-alive>
    <component v-else :is="Component" />
  </router-view>
  -->
</template>
