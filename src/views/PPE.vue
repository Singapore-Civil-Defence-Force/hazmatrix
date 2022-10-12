<script setup lang="ts">
import PPEs from "../../data/PPE.json";

// Get PPE's id from router
const { id } = defineProps<{ id: string }>();

const PPE = PPEs[id];
</script>

<template>
  <div class="center">
    <h1 class="title px-6">
      {{ PPE.full }}
    </h1>
  </div>
</template>
