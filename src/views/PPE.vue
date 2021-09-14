<template>
  <div class="center">
    <h1 class="title px-6">
      {{ PPE.full }}
    </h1>
  </div>
</template>

<script>
import PPEs from "../../data/PPE.json";

export default {
  name: "PPE",

  // Get PPE's id from router
  props: ["id"],

  data() {
    return {
      PPE: PPEs[this.id],
    };
  },
};
</script>
