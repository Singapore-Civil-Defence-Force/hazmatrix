<template>
  <div style="text-align: left">
    <!-- @todo Include the side nav bar component -->

    <!-- Allow multiple line in desktop / landscape mode -->
    <div class="cloumns is-multiline">
      <!-- is-full to fill up column space when in desktop / landscape mode -->
      <div class="column is-full">
        <label>
          <b>Search (Chemical name or UN Number)</b>

          <div class="field has-addons">
            <div class="control is-expanded">
              <!-- @todo Auto focus not working when the site first loads, not sure if because of local HTTPS invalid cert issue -->
              <!-- @todo NO, it is not working for the deployed version too, it just doesnt work on IOS safari, to test on other mobile devices.. chrome desktop works -->
              <input
                v-autofocus
                ref="searchField"
                type="text"
                v-model="search_input"
                placeholder="E.g. Acetone or 1090"
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

export default {
  name: "search",

  // @todo Allow sharing of searches, before you choose a chemical, in fact every stage should be shareable
  // props: ["num"],

  // @todo Only if search view is shareable
  // Run search method on component creation
  // created() {
  //   this.search();
  // },

  data() {
    return {
      search_options: {
        // @todo Allow search for formula?
        // Search in `name` and in `un` number array
        keys: ["name", "un"],
      },

      search_input: "",
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
      return this.fuse.search(this.search_input, { limit: 20 });
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
      // @todo Await this to show in UI when sharing succeeded
      navigator.share({
        title: "Share this chemical",
        text: chemicalName,
        url: `https://TFTDX.github.io/hazmatrix/#/chemical/${chemicalID}`,
      });
    },
  },
};
</script>
