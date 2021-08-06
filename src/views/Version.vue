<template>
  <!-- Fixed styles to ensure that the build time string it not too long and extend pass the mobile components -->
  <div
    class="level"
    style="font-size: 0.7em; position: fixed; bottom: 1em; max-width: 30em"
  >
    Version: {{ gitBranch + " " + commitHash.slice(0, 6).toString() }}
    <br />
    <!-- @todo Problematic if using CI/CD where build server location is not in SG -->
    Build Time: {{ buildTime }}
  </div>
</template>

<script>
export default {
  name: "version",

  data() {
    return {
      // Environment variables injected in by webpack, configured in vue.config.js
      buildTime: process.env.buildTime,
      commitHash: process.env.commitHash,
      gitBranch: process.env.gitBranch,
    };
  },
};
</script>
