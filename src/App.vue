<!-- Parent component that contains and switches between all the view components using view router's router-view -->
<template>
  <keep-alive max="4">
    <router-view :key="$route.fullPath" />
  </keep-alive>
</template>
