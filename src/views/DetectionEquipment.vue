<script setup lang="ts">
import { ref } from "vue";

import all_detection_equipments from "../../data/detection_equipments.json";
import detection from "../../data/detection.json";
// import chemicals from "../../data/chemicals.json";

import Share from "../components/Share.vue";
import NavBtn from "../components/NavBtn.vue";

// Get equipment and chemical id from router, where chemical ID is an optional query parameter
const { id, chemicalID } = defineProps<{ id: string; chemicalID: string }>();

// @todo Only load this async if there is a chemical ID and only put the name onto data object
const chemicals = ref<string | undefined>(undefined);

// @todo Type this
// Get the specific detection equipment
const equipment = ref(all_detection_equipments[id]);

// @todo Type this
// Get notes for this specific detection equipment when used with a chemical, only if a chemical ID is passed in via a query parameter
const detection_notes = ref<any | undefined>(
  chemicalID ? detection[chemicalID][id] : undefined
);
</script>

<template>
  <div class="has-text-left px-4 pt-4">
    <div class="columns is-multiline">
      <div class="column">
        <p class="title is-4">{{ equipment.name }}</p>
      </div>

      <div class="column content pb-0 mb-0">
        <p class="subtitle">Operating Temperature</p>

        <ul>
          <li class="subtitle">
            <b>{{ equipment["operating temperature"] }}</b>
          </li>
        </ul>
      </div>

      <div class="column">
        <hr class="my-0" style="background-color: #dedede" />
      </div>

      <div class="column content pb-0 mb-0">
        <p class="subtitle">Can use in flammable environment</p>

        <ul>
          <li class="subtitle">
            <b>{{ equipment["flammable environment"] }}</b>
          </li>
        </ul>
      </div>

      <div class="column">
        <hr class="my-0" style="background-color: #dedede" />
      </div>

      <div v-if="chemicalID">
        <div class="column content pb-0 mb-0">
          <p class="subtitle mb-1">
            Notes for <b>{{ chemicals[chemicalID].name }}</b>
          </p>

          <ul>
            <li
              v-for="(key, i) in equipment.keys"
              :key="i"
              class="subtitle mb-1"
            >
              {{ key }}: <b>{{ detection_notes.values[i] }}</b>
            </li>
          </ul>
        </div>

        <div class="column">
          <hr class="my-0" style="background-color: #dedede" />
        </div>
      </div>

      <div class="column">
        <Share
          :options="{
            title: 'Share this Detection Equipment',
            text: equipment.name,
          }"
        />
      </div>

      <div class="column">
        <NavBtn />
      </div>
    </div>
  </div>
</template>
