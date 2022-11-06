<script setup lang="ts">
import Version from "../components/Version.vue";

// Use the full commit hash as the version string to prefill the feedback form
const version = __vite_inject.commitHash;
</script>

<template>
  <div class="columns is-multiline is-mobile mx-3 my-3 has-text-left">
    <div class="column is-full">
      <p class="title is-3">About</p>
      <p>
        This HazMatrix (Hazmat Operation Matix) application is developed by
        <a href="https://github.com/Jaimeloeuf">JJ</a>
      </p>
    </div>

    <div class="column is-full">
      <hr class="m-0" />
    </div>

    <div class="column is-full">
      <b class="has-text-warning-dark">Help</b>
      <p>Use this form to report issues, give feedback and request for help.</p>

      <!-- @todo
        Pre-fill the form with version number and build time info
        https://guide.form.gov.sg/AdvancedGuide.html#pre-fill
      -->
      <a
        class="button is-light is-warning is-fullwidth"
        href="https://go.gov.sg/scdf-hazmatrix"
        target="_blank"
      >
        Feedback Form
      </a>
    </div>

    <div class="column is-full">
      <b class="has-text-warning-dark">Get in touch</b>

      <div class="box">
        If you need any urgent help, please email
        <a href="mailto:jaimeloeuf@gmail.com">jaimeloeuf@gmail.com</a>
      </div>
    </div>

    <div class="column is-full">
      <hr class="m-0" />
    </div>

    <div class="column is-full">
      <b class="has-text-warning-dark">Version Info</b>
      <Version />
    </div>

    <div class="column is-full">
      <hr class="m-0" />
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
