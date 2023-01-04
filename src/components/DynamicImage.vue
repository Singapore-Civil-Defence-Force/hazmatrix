<script setup lang="ts">
/**
 * Component used to display images with dynamic links as it cannot be done
 * directly in template, and it doesnt make sense to constantly duplicate
 * this code for all the views that need to display images.
 */

// Get image src from parent component
const { src } = defineProps<{ src: string }>();

// Need to do this to get the image link dynamically and cannot be done inside the template
// Reference: https://stackoverflow.com/questions/66419471/vue-3-vite-dynamic-img-src
const image = new URL(src, import.meta.url).href;
</script>

<template>
  <img :src="image" />
</template>
