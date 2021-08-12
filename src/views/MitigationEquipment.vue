<template>
  <div class="px-4 pt-4" style="text-align: left">
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
            Notes for <b>{{ chemicals[chemicalID].name }}</b>
          </p>

          <ul>
            <li>
              <p class="subtitle">
                Effectiveness: <b>{{ mitigation_notes.note }}</b>
              </p>
            </li>
          </ul>

          <!-- This should be empty for now, as there are no chemical/equipment specific notes unlike detection equipments data source -->
          <!-- <ul>
            <li
              v-for="(key, i) in equipment.keys"
              :key="i"
              class="subtitle mb-1"
            >
              {{ key }}: <b>{{ mitigation_notes.values[i] }}</b>
            </li>
          </ul> -->
        </div>

        <div class="column">
          <hr class="my-0" style="background-color: #dedede" />
        </div>
      </div>

      <div class="column pb-0 mb-0">
        <div class="columns">
          <div class="column">
            <Share
              :options="{
                title: 'Share this Mitigation Equipment',
                text: equipment.name,
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
import all_mitigation_equipments from "../../data/mitigation_equipments.json";
import mitigation from "../../data/mitigation.json";
import chemicals from "../../data/chemicals.json";

import Share from "../components/Share.vue";

export default {
  name: "MitigationEquipment",

  components: { Share },

  // Get equipment and chemical id from router, where chemical ID is an optional query parameter
  props: ["id", "chemicalID"],

  data() {
    // Get notes for this specific mitigation equipment when used with a chemical, only if a chemical ID is passed in via a query parameter
    const mitigation_notes = this.chemicalID
      ? mitigation[this.chemicalID][this.id]
      : undefined;

    return {
      // @todo Only load this async if there is a chemical ID and only put the name onto data object
      chemicals,

      // Get the specific mitigation equipment
      equipment: all_mitigation_equipments[this.id],

      mitigation_notes,
    };
  },
};
</script>
