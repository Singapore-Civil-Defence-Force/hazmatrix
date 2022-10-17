<script setup lang="ts">
const loc = window.location.toString();
</script>

<template>
  <div class="columns is-multiline is-mobile mx-3 my-3 has-text-left">
    <div class="column is-full">
      <p class="title is-3">Page Not Found</p>
      <p class="subtitle">The page you tried to look for does not exists!</p>
    </div>

    <div class="column is-full">
      <div class="columns is-vcentered">
        <div class="column">
          <p class="subtitle">"{{ loc }}"</p>
        </div>

        <div class="column is-narrow">
          <!-- @todo Prefil the form with the location -->
          <a
            class="button is-light is-warning is-fullwidth"
            href="https://go.gov.sg/scdf-hazmatrix"
            target="_blank"
          >
            report issue
          </a>
        </div>
      </div>
    </div>

    <div class="column is-full">
      <hr />
    </div>

    <div class="column is-narrow">
      <button class="button is-light is-fullwidth" @click="$router.back">
        Back
      </button>
    </div>

    <div class="column">
      <router-link
        class="button is-light is-success is-fullwidth"
        :to="{ name: 'home' }"
      >
        Home
      </router-link>
    </div>
  </div>
</template>
