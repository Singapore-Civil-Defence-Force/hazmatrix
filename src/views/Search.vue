<template>
  <div style="text-align: left">
    <!-- @todo Include the side nav bar component -->

    <!-- Allow multiple line in desktop / landscape mode -->
    <div class="cloumns is-multiline">
      <!-- @todo Make Search input and share component stick to top -->

      <!-- is-full to fill up column space when in desktop / landscape mode -->
      <div class="column is-full">
        <label>
          <b>Search (Chemical name)</b>

          <div class="field has-addons">
            <div class="control is-expanded">
              <!-- @todo Auto focus not working when the site first loads, not sure if because of local HTTPS invalid cert issue -->
              <!-- @todo NO, it is not working for the deployed version too, it just doesnt work on IOS safari, to test on other mobile devices.. chrome desktop works -->
              <input
                v-autofocus
                ref="searchField"
                type="text"
                v-model="search_input"
                placeholder="E.g. Acetic or Octa"
                required
                class="input"
                style="width: 100%"
              />
            </div>
            <div class="control">
              <button class="button" @click="clearSearchInput">clear</button>
            </div>
          </div>
        </label>
      </div>

      <!-- Only show 'share search result' component if user entered anything in the search input -->
      <Share
        v-if="results.length !== 0"
        class="card mb-5 mt-2 px-4"
        :options="{
          title: 'Share Search Results',
          text: `Share Search Results for '${search_input}'`,
          url: `${baseURL}/search?query=${search_input}`,
        }"
      />

      <!-- Search results -->
      <div v-for="result in results" :key="result.item.name" class="column">
        <div class="card px-4">
          <!-- Display the card content in a router-link element to make the card's content section clickable -->
          <router-link
            :to="{ name: 'chemical', params: { id: result.item.id } }"
            class="card-content content"
          >
            <h1>{{ result.item.name }}</h1>

            <p class="subtitle mb-1">
              Formula: <b>{{ result.item.formula || "NA" }}</b>
            </p>
            <p class="subtitle">
              UN Number: <b>{{ result.item.un || "NA" }}</b>
            </p>
          </router-link>

          <footer
            class="card-footer"
            @click="shareViaWebShare(result.item.id, result.item.name)"
          >
            <span class="card-footer-item" style="cursor: pointer; color: pink">
              Share
            </span>
          </footer>
        </div>
      </div>

      <!-- Show no results UI if no results and search input is not empty -->
      <div v-if="results.length === 0 && search_input !== ''" class="center">
        Nothing matched your input
        <!-- @todo Allow user to report this as an issue to get this new item added or something -->
      </div>
    </div>
  </div>
</template>

<script>
import chemicals from "../../data/chemicals.json";
import Fuse from "fuse.js";

import Share from "../components/Share.vue";
import { baseURL } from "../config.js";

export default {
  name: "search",

  components: { Share },

  // This search view is shareable, when shared, the URL contains a URL search `query` string, which will be the default search input
  props: ["query"],

  data() {
    return {
      search_options: {
        // @todo Allow search for formula?
        keys: ["name"],

        // When to give up search. A threshold of 0.0 requires a perfect match (of both letters and location), a threshold of 1.0 would match anything
        // Default: 0.6
        threshold: 0.5,
      },

      // Defaults to the URL `search` query string if there is any
      search_input: this.query || "",

      // Place baseURL on data for methods and template to access this instead of hard coding the base URL
      baseURL,
    };
  },

  computed: {
    // Update fuse object when search options is updated
    fuse() {
      return new Fuse(Object.values(chemicals), this.search_options);
    },

    // Continously search as user input changes
    results() {
      // Limit max number of returned search results to ensure not too many results are returned (esp for lower spec mobile devices),
      // especially at the start of the search where alot of results will be matched when only 1 - 4 characters are entered
      return this.fuse.search(this.search_input, { limit: 12 });
    },
  },

  // @todo Fn to report missing chemical
  methods: {
    // Clear the search input box and re-focus on the search field
    clearSearchInput() {
      this.search_input = "";
      this.$refs.searchField.focus();
    },

    shareViaWebShare(chemicalID, chemicalName) {
      navigator.share({
        title: "Share this chemical",
        text: chemicalName,
        url: `${this.baseURL}/chemical/${chemicalID}`,
      });
    },
  },
};
</script>
