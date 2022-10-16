<script setup lang="ts">
/* Build time variables injected in by vite, configured in vite.config.js */

// buildTime is ISO string format, so convert to Date and remove singapore string part after converting to user's locale (assumed to be SG)
const buildTime = new Date(__vite_inject.buildTime)
  .toString()
  .replace(" (Singapore Standard Time)", "");

// Calculate the version using git branch and commit hash
const version =
  __vite_inject.gitBranch +
  " " +
  __vite_inject.commitHash.slice(0, 6).toString();
</script>

<template>
  <!-- Fixed styles to ensure that the build time string it not too long and extend pass the mobile components -->
  <div class="has-text-left" style="font-size: 0.7em; max-width: 30em">
    <!-- @todo
      Pre-fill the form with version number and build time info
      https://guide.form.gov.sg/AdvancedGuide.html#pre-fill
    -->
    <a
      class="has-text-link is-size-6"
      href="https://go.gov.sg/scdf-hazmatrix"
      target="_blank"
    >
      Feedback Form
    </a>
    <br />

    Version: {{ version }}
    <br />

    Build Time: {{ buildTime }}
  </div>
</template>
