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

        <!-- @todo Add a share button? -->
      </div>

      <div class="column">
        <hr class="my-0" />
      </div>

      <details class="column">
        <summary><b>Detection</b></summary>

        <div
          v-for="equipment in detection_equipments"
          :key="equipment.id"
          class="card px-4 my-4"
        >
          <!-- Display the card content in a router-link element to make the card's content section clickable -->
          <!-- @todo Click into Equipment page? -->
          <router-link
            :to="{ name: 'equipment', params: { id: equipment.id } }"
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

        <!-- @todo Optionally show Null if nothing instead of just blank -->
      </details>

      <div class="column">
        <hr class="my-0" />
      </div>

      <details class="column">
        <summary><b>Mitigation</b></summary>

        <div
          v-for="equipment in mitigation_equipments"
          :key="equipment.id"
          class="card px-4 my-4"
        >
          <!-- Display the card content in a router-link element to make the card's content section clickable -->
          <!-- @todo Add coloring just like the Mitigation matrix? -->
          <!-- @todo Click into Equipment page? -->
          <router-link
            :to="{ name: 'equipment', params: { id: equipment.id } }"
            class="card-content content"
          >
            <h3>{{ all_mitigation_equipments[equipment.id].name }}</h3>

            <p class="subtitle mb-1">{{ equipment.note }}</p>
          </router-link>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
import chemicals from "../../data/chemicals.json";
import all_detection_equipments from "../../data/detection_equipments.json";
import all_mitigation_equipments from "../../data/mitigation_equipments.json";
import detection from "../../data/detection.json";
import mitigation from "../../data/mitigation.json";

export default {
  name: "Chemical",

  // Get chemical's id from router
  props: ["id"],

  data() {
    return {
      all_detection_equipments,
      all_mitigation_equipments,

      // Get the chemical directly with id as the key
      // @todo Throw error and handle this if chemical is not found
      chemical: chemicals[this.id],

      // An array of equipments that can be used to detect the chemical with id of this.id
      detection_equipments: detection[this.id],
      // An array of equipments that can be used to mitigate the chemical with id of this.id
      mitigation_equipments: mitigation[this.id],
    };
  },
};
</script>
