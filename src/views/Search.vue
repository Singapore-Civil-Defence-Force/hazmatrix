<script setup lang="ts">
import { ref, computed } from "vue";

import chemicals from "../../data/chemicals.json";
import Fuse from "fuse.js";

import Share from "../components/Share.vue";
import { baseURL } from "../config";

// This search view is shareable, when shared, the URL contains a URL search `query` string, which will be the default search input
const { query } = defineProps<{ query: string }>();

// Fixed search options for now, but might allow user to customize this in the future
const search_options = {
  // @todo Allow search for formula?
  keys: ["name"],

  // When to give up search. A threshold of 0.0 requires a perfect match (of both letters and location), a threshold of 1.0 would match anything
  // Default: 0.6
  threshold: 0.5,
};

// Defaults to the URL `search` query string if there is any
const search_input = ref<string>(query || "");

// Declare a ref to hold the DOM element reference to `searchField`
const searchField = ref<HTMLInputElement | null>(null);

// Update fuse object when search options is updated
const fuse = computed(() => new Fuse(Object.values(chemicals), search_options));

// Continously search as user input changes
// Limit max number of returned search results to ensure not too many results are returned (esp for lower spec mobile devices),
// especially at the start of the search where alot of results will be matched when only 1 - 4 characters are entered
const results = computed(() =>
  fuse.value.search(search_input.value, { limit: 12 })
);

// Clear the search input box and re-focus on the search field
function clearSearchInput() {
  search_input.value = "";
  searchField.value!.focus();
}

const shareViaWebShare = (chemicalID: string, chemicalName: string) =>
  navigator.share({
    title: "Share this chemical",
    text: chemicalName,
    url: `${baseURL}/chemical/${chemicalID}`,
  });

// @todo Fn to report missing equipment
</script>

<template>
  <!-- Allow multiple line in desktop / landscape mode -->
  <div class="cloumns is-multiline has-text-left">
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
          <span class="card-footer-item is-clickable has-text-danger">
            Share
          </span>
        </footer>
      </div>
    </div>

    <!-- Show no results UI if no results and search input is not empty -->
    <div
      v-if="results.length === 0 && search_input !== ''"
      class="has-text-centered"
    >
      Nothing matched your input
      <!-- @todo Allow user to report this as an issue to get this new item added or something -->
    </div>
  </div>
</template>
