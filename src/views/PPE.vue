<script setup lang="ts">
import PPEs from "../../data/PPE.json";

// Get PPE's id from router
const { id } = defineProps<{ id: string }>();

// Ignoring the TS warning because we can be sure that the id being passed in as props
// is valid since the parent component is taking the value from the PPE.json directly.
// @ts-ignore
const PPE = PPEs[id];

// Need to do this to get the image link dynamically and cannot be done inside the template
// Reference: https://stackoverflow.com/questions/66419471/vue-3-vite-dynamic-img-src
const image = new URL(`../assets/PPE/${id}.jpg`, import.meta.url).href;
</script>

<template>
  <div class="columns is-mobile is-multiline has-text-left m-2">
    <div class="column is-narrow">
      <router-link
        class="button is-light is-fullwidth is-danger"
        :to="{ name: 'home' }"
      >
        Home
      </router-link>
    </div>

    <div class="column">
      <button class="button is-light is-fullwidth" @click="$router.back()">
        Back
      </button>
    </div>

    <div class="column is-full">
      <h1 class="title has-text-left">
        {{ PPE.full }}
      </h1>
    </div>

    <div class="column is-full">
      <img class="image" :src="image" alt="PPE" />
    </div>
  </div>
</template>
