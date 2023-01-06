<script setup lang="ts">
import { ref, computed, onActivated } from "vue";

import equipment from "../utils/AllEquipmentsForSearch";

import Fuse from "fuse.js";

import Share from "../components/Share.vue";

import { baseURL } from "../config";

// This search view is shareable, when shared, the URL contains a URL search `query` string, which will be the default search input
const { query } = defineProps<{ query?: string }>();

// Fixed search options for now, but might allow user to customize this in the future
const search_options = {
  keys: ["name"],

  // When to give up search. A threshold of 0.0 requires a perfect match (of both letters and location), a threshold of 1.0 would match anything
  // Default: 0.6
  threshold: 0.5,
};

// Defaults to the URL `search` query string if there is any
const search_input = ref<string>(query || "");

// Declare a ref to hold the DOM element reference to `searchField`
const searchField = ref<HTMLInputElement | null>(null);

// Autofocus on search input on view visible
onActivated(() => searchField.value!.focus());

// Update fuse object when search options is updated
const fuse = computed(() => new Fuse(equipment, search_options));

// Continously search as user input changes
// Search result is not limited as the total number of equipments is also not alot
const results = computed(() => fuse.value.search(search_input.value));

// Clear the search input box and re-focus on the search field
function clearSearchInput() {
  search_input.value = "";
  searchField.value!.focus();
}

// @todo Fn to report missing equipment
</script>

<template>
  <!-- Allow multiple line in desktop / landscape mode -->
  <div class="cloumns is-multiline has-text-left">
    <!-- @todo Make Search input and share component stick to top -->

    <!-- is-full to fill up column space when in desktop / landscape mode -->
    <div class="column is-full">
      <label>
        <b>Search (Equipment name)</b>

        <div class="field has-addons">
          <div class="control is-expanded">
            <input
              ref="searchField"
              type="text"
              v-model="search_input"
              placeholder="E.g. Leak sealing lance"
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
        url: `${baseURL}/search-equipment?query=${search_input}`,
      }"
    />

    <!-- Search results -->
    <div v-for="{ item } in results" :key="item.name" class="column">
      <div class="card px-4">
        <!-- Display card content in a router-link element to make the card's content section clickable -->
        <router-link
          :to="{
            name:
              item.type === 'm'
                ? 'mitigation-equipment'
                : 'detection-equipment',
            params: { id: item.id },
          }"
          class="card-content content"
        >
          <h2>{{ item.name }}</h2>
        </router-link>
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

<style scoped>
/*
  Removes the highlight on tap seen on iOS devices

  Using this property to ensure that click behaviour is the same across
  different mobile devices, by normalizing the behaviour on iOS Safari.

  This has to be set directly in the component, as the CSS rule cannot
  be inherited for some reason from top level scope in index.html

  References:
  https://css-tricks.com/snippets/css/remove-gray-highlight-when-tapping-links-in-mobile-safari/
  https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-tap-highlight-color
  https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/AdjustingtheTextSize/AdjustingtheTextSize.html#//apple_ref/doc/uid/TP40006510-SW5
*/
* {
  -webkit-tap-highlight-color: transparent;
}
</style>
