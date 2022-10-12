<script setup lang="ts">
import { ref, computed } from "vue";

// @todo This only searches for mitigation equipment and not detection equipment
import equipment from "../../data/mitigation_equipments.json";
import Fuse from "fuse.js";

import Share from "../components/Share.vue";

import { baseURL } from "../config";

// This search view is shareable, when shared, the URL contains a URL search `query` string, which will be the default search input
const { query } = defineProps<{ query: string }>();

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

// Update fuse object when search options is updated
const fuse = computed(() => new Fuse(Object.values(equipment), search_options));

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
  <div style="text-align: left">
    <!-- Allow multiple line in desktop / landscape mode -->
    <div class="cloumns is-multiline">
      <!-- @todo Make Search input and share component stick to top -->

      <!-- is-full to fill up column space when in desktop / landscape mode -->
      <div class="column is-full">
        <label>
          <b>Search (Equipment name)</b>

          <div class="field has-addons">
            <div class="control is-expanded">
              <input
                v-autofocus
                ref="searchField"
                type="text"
                v-model="search_input"
                placeholder="E.g. Leak sealing lance"
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
          url: `${baseURL}/search-equipment?query=${search_input}`,
        }"
      />

      <!-- Search results -->
      <div v-for="result in results" :key="result.item.name" class="column">
        <div class="card px-4">
          <!-- Display card content in a router-link element to make the card's content section clickable -->
          <router-link
            :to="{
              name: 'mitigation-equipment',
              params: { id: result.item.id },
            }"
            class="card-content content"
          >
            <h2>{{ result.item.name }}</h2>
          </router-link>
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
