<script setup lang="ts">
import chemicals from "../../data/chemicals.json";
import all_detection_equipments from "../../data/detection_equipments.json";
import all_mitigation_equipments from "../../data/mitigation_equipments.json";
import detection from "../../data/detection.json";
import mitigation from "../../data/mitigation.json";
import PPEs from "../../data/PPE.json";

import Share from "../components/Share.vue";
import NavBtn from "../components/NavBtn.vue";

// Get chemical's id from router
const { id } = defineProps<{ id: string }>();

// Get the chemical directly with id as the key
// @todo Throw error and handle this if chemical is not found
const chemical = chemicals[id];

// An array of equipments that can be used to detect the chemical with id of this.id
// @todo There might be no equipment for this chemical, therefore fallback to empty object to prevent method from throwing. Remove once data source is filled
const detection_equipments = Object.values(detection[id] || {});

// An array of equipments that can be used to mitigate the chemical with id of this.id
// @todo There might be no equipment for this chemical, therefore fallback to empty object to prevent method from throwing. Remove once data source is filled
const mitigation_equipments = Object.values(mitigation[id] || {}).sort(
  // Sorting using the status values only, therefore destructure out to name them
  function ({ status: first }, { status: second }): number {
    // If both are numbers (compatible or last resort)
    if (typeof first === "number" && typeof second === "number")
      // 1 : 0 return first
      // 0 : 1 return second
      return second - first;

    // If both 'conditionally compatible', return 0 to do nothing
    if (Array.isArray(first) && Array.isArray(second)) return 0;

    // If first is conditional
    if (Array.isArray(first))
      // Second is either 1 or 0
      // If second is 1, then return 1 to sort second before first
      // If second is 0, then return -1 to sort first before second
      return second ? 1 : -1;

    // If second is conditional
    if (Array.isArray(second))
      // first is either 1 or 0
      // If first is 1, then return -1 to sort first before second
      // If first is 0, then return 1 to sort second before first
      return first ? -1 : 1;

    throw new Error("@todo NEED TO RETURN NUMBER");
  }
);
</script>

<template>
  <div class="columns is-multiline has-text-left px-4 pt-4">
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
            For: <b>{{ role }}</b>
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
        <!-- Color cards to easily differentiate the type of mitigation status -->
        <div
          v-for="equipment in mitigation_equipments"
          :key="equipment.id"
          class="card px-4 my-4"
          :class="{
            compatible: equipment.status === 1,
            lastResort: equipment.status === 0,
            conditionally: Array.isArray(equipment.status),
          }"
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

            <span class="subtitle" v-if="Array.isArray(equipment.status)">
              Conditionally
              <ul>
                <li v-for="(conditions, i) in equipment.status" :key="i">
                  {{ conditions }}
                </li>
              </ul>
            </span>
            <p class="subtitle" v-else-if="equipment.status === 1">
              Compatible
            </p>
            <p class="subtitle" v-else>Last Resort</p>
          </router-link>
        </div>
      </div>

      <!-- Show `Nothing Available` if nothing instead of just blank -->
      <h3 v-else class="subtitle px-5 mt-4 mb-0">Nothing Available</h3>
    </details>

    <div class="column">
      <hr class="my-0" style="background-color: #dedede" />
    </div>

    <div class="column">
      <Share
        :options="{
          title: 'Share this Chemical',
          text: chemical.name,
        }"
      />
    </div>

    <div class="column">
      <NavBtn />
    </div>
  </div>
</template>

<style scoped>
.compatible {
  background-color: #effaf5;
}
.conditionally {
  background-color: #fffaeb;
}
.lastResort {
  background-color: #feecf0;
}
</style>
