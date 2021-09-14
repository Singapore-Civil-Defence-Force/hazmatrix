<template>
  <div class="px-4 pt-4" style="text-align: left">
    <!-- @todo Include the side nav bar component -->

    <!-- Allow multiple line in desktop / landscape mode -->
    <div class="columns is-multiline">
      <div class="column">
        <p class="title is-4">{{ chemical.name }}</p>

        <p class="subtitle mb-1">
          Formula: <b>{{ chemical.formula || "NA" }}</b>
        </p>
        <p class="subtitle">
          UN Number: <b>{{ chemical.un || "NA" }}</b>
        </p>
      </div>

      <div class="column">
        <hr class="my-0" style="background-color: #dedede" />
      </div>

      <details class="column">
        <summary><b>PPE</b></summary>

        <div v-for="(PPE, i) in PPEs" :key="i" class="card px-4 my-4">
          <!-- Display the card content in a router-link element to make the card's content section clickable -->
          <router-link
            :to="{
              name: 'PPE',
              params: { id: i },
            }"
            class="card-content content"
          >
            <h3>{{ PPE.short }}</h3>

            <p v-for="(role, i) in PPE.roles" :key="i" class="subtitle mb-1">
              Role: <b>{{ role }}</b>
            </p>
          </router-link>
        </div>
      </details>

      <div class="column">
        <hr class="my-0" style="background-color: #dedede" />
      </div>

      <!-- Open the details drop down by default if there is no data to display -->
      <details
        class="column"
        :open="!detection_equipments || detection_equipments.length < 1"
      >
        <summary><b>Detection</b></summary>

        <!-- Show equipments if any -->
        <!-- @todo Remove this if all data is filled -->
        <div v-if="detection_equipments && detection_equipments.length > 0">
          <!-- Using `i` as key instead of `equipment.id` because the same equipment can be used with different configs / values -->
          <div
            v-for="(equipment, i) in detection_equipments"
            :key="i"
            class="card px-4 my-4"
          >
            <!-- Display the card content in a router-link element to make the card's content section clickable -->
            <router-link
              :to="{
                name: 'detection-equipment',
                params: { id: equipment.id },
                query: { chemicalID: id },
              }"
              class="card-content content"
            >
              <h3>{{ all_detection_equipments[equipment.id].name }}</h3>

              <p
                v-for="(key, i) in all_detection_equipments[equipment.id].keys"
                :key="i"
                class="subtitle mb-1"
              >
                {{ key }}: <b>{{ equipment.values[i] }}</b>
              </p>
            </router-link>
          </div>
        </div>

        <!-- Show `Nothing Available` if nothing instead of just blank -->
        <h3 v-else class="subtitle px-5 mt-4 mb-0">Nothing Available</h3>
      </details>

      <div class="column">
        <hr class="my-0" style="background-color: #dedede" />
      </div>

      <!-- Open the details drop down by default if there is no data to display -->
      <details
        class="column"
        :open="!mitigation_equipments || mitigation_equipments.length < 1"
      >
        <summary><b>Mitigation</b></summary>

        <!-- Show equipments if any -->
        <!-- @todo Remove this if all data is filled -->
        <div v-if="mitigation_equipments && mitigation_equipments.length > 0">
          <div
            v-for="equipment in mitigation_equipments"
            :key="equipment.id"
            class="card px-4 my-4"
          >
            <!-- Display the card content in a router-link element to make the card's content section clickable -->
            <router-link
              :to="{
                name: 'mitigation-equipment',
                params: { id: equipment.id },
                query: { chemicalID: id },
              }"
              class="card-content content"
            >
              <h3>{{ all_mitigation_equipments[equipment.id].name }}</h3>

              <p class="subtitle mb-1">{{ equipment.note }}</p>
            </router-link>
          </div>
        </div>

        <!-- Show `Nothing Available` if nothing instead of just blank -->
        <h3 v-else class="subtitle px-5 mt-4 mb-0">Nothing Available</h3>
      </details>

      <div class="column">
        <hr class="my-0" style="background-color: #dedede" />
      </div>

      <div class="column pb-0 mb-0">
        <div class="columns">
          <div class="column">
            <Share
              :options="{
                title: 'Share this Chemical',
                text: chemical.name,
              }"
            />
          </div>

          <div class="column">
            <button
              class="button is-light is-fullwidth"
              @click="$router.back()"
            >
              back
            </button>
          </div>

          <div class="column">
            <router-link
              class="button is-light is-fullwidth is-danger"
              :to="{ name: 'home' }"
            >
              home
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chemicals from "../../data/chemicals.json";
import all_detection_equipments from "../../data/detection_equipments.json";
import all_mitigation_equipments from "../../data/mitigation_equipments.json";
import detection from "../../data/detection.json";
import mitigation from "../../data/mitigation.json";
import PPEs from "../../data/PPE.json";

import Share from "../components/Share.vue";

export default {
  name: "Chemical",

  components: { Share },

  // Get chemical's id from router
  props: ["id"],

  data() {
    return {
      PPEs,

      all_detection_equipments,
      all_mitigation_equipments,

      // Get the chemical directly with id as the key
      // @todo Throw error and handle this if chemical is not found
      chemical: chemicals[this.id],

      // An array of equipments that can be used to detect the chemical with id of this.id
      // @todo There might be no equipment for this chemical, therefore fallback to empty object to prevent method from throwing. Remove once data source is filled
      detection_equipments: Object.values(detection[this.id] || {}),
      // An array of equipments that can be used to mitigate the chemical with id of this.id
      // @todo There might be no equipment for this chemical, therefore fallback to empty object to prevent method from throwing. Remove once data source is filled
      mitigation_equipments: Object.values(mitigation[this.id] || {}),
    };
  },
};
</script>
