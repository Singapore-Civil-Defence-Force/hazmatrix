<script setup lang="ts">
import PPEs from "../../data/PPE.json";
import DynamicImage from "../components/DynamicImage.vue";

// Get PPE's id from router
const { id } = defineProps<{ id: string }>();

// Ignoring the TS warning because we can be sure that the id being passed in as props
// is valid since the parent component is taking the value from the PPE.json directly.
// @ts-ignore
const PPE = PPEs[id];
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
      <DynamicImage :src="`../assets/PPE/${id}.jpg`" alt="PPE" />
    </div>
  </div>
</template>
