<script setup lang="ts">
import all_mitigation_equipments from "../../data/mitigation_equipments.json";
import mitigation from "../../data/mitigation.json";

// @todo Only load this async if there is a chemical ID and only put the name onto data object
import chemicals from "../../data/chemicals.json";

import Share from "../components/Share.vue";
import NavBtn from "../components/NavBtn.vue";

// Get equipment and chemical id from router, where chemical ID is an optional query parameter
const { id, chemicalID } = defineProps<{ id: string; chemicalID?: string }>();

// Get the specific mitigation equipment
const equipment = all_mitigation_equipments[id];

// Get notes for this specific mitigation equipment when used with a chemical, only if a chemical ID is passed in via a query parameter
const mitigation_status = chemicalID
  ? mitigation[chemicalID][id].status
  : undefined;
</script>

<template>
  <div class="has-text-left px-4 pt-4">
    <div class="columns is-multiline">
      <div class="column">
        <p class="title is-4">{{ equipment.name }}</p>
      </div>

      <div class="column content pb-0 mb-0">
        <!-- Open up the drop down by default -->
        <details open class="pb-0">
          <summary class="subtitle">Mitigation Limitations</summary>

          <ul>
            <li
              v-for="(limitation, i) in equipment['Mitigation Limitations']"
              :key="i"
            >
              <!-- Limitation can either be a simple String or a "tuple" of [String, Array<String>] -->
              <!-- Useful for when limitations are grouped together, and thus need nesting in the UI with another unordered list -->
              <div v-if="Array.isArray(limitation)">
                {{ limitation[0] }}

                <ul v-for="(nestedLimitation, i) in limitation[1]" :key="i">
                  <li>{{ nestedLimitation }}</li>
                </ul>
              </div>

              <span v-else>{{ limitation }}</span>
            </li>
          </ul>
        </details>
      </div>

      <div class="column">
        <hr class="my-0" style="background-color: #dedede" />
      </div>

      <div class="column content pb-0 mb-0">
        <p class="subtitle">Operating Pressure</p>

        <ul>
          <li class="subtitle">
            <b>{{ equipment["Operating Pressure"] }}</b>
          </li>
        </ul>
      </div>

      <div class="column">
        <hr class="my-0" style="background-color: #dedede" />
      </div>

      <div class="column content pb-0 mb-0">
        <p class="subtitle">Working Temperature</p>

        <ul>
          <li class="subtitle">
            <b>{{ equipment["Working Temperature"] }}</b>
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
            Mitigation Status for <b>{{ chemicals[chemicalID].name }}</b>
          </p>

          <span v-if="Array.isArray(mitigation_status)">
            <ul>
              <li class="subtitle mb-0">Conditionally</li>
              <ul>
                <li v-for="(conditions, i) in mitigation_status" :key="i">
                  {{ conditions }}
                </li>
              </ul>
            </ul>
          </span>
          <ul v-else-if="mitigation_status === 1">
            <li class="subtitle">
              <b>Compatible</b>
            </li>
          </ul>
          <ul v-else>
            <li class="subtitle">
              <b>Last Resort</b>
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
            title: 'Share this Mitigation Equipment',
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
