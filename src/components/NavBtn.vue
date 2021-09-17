<template>
  <div class="columns is-mobile">
    <div class="column">
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
  </div>
</template>

<script>
export default {
  name: "NavigationButton",
};
</script>
