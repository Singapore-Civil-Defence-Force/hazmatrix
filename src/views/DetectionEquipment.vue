<template>
  <div class="px-4 pt-4" style="text-align: left">
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

      <div class="column pb-0 mb-0">
        <div class="columns">
          <div class="column">
            <button
              class="button is-light is-fullwidth is-success"
              @click="shareViaWebShare"
            >
              share
            </button>
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
import all_detection_equipments from "../../data/detection_equipments.json";
import detection from "../../data/detection.json";
import chemicals from "../../data/chemicals.json";

export default {
  name: "DetectionEquipment",

  // Get equipment and chemical id from router, where chemical ID is an optional query parameter
  props: ["id", "chemicalID"],

  data() {
    // Get notes for this specific detection equipment when used with a chemical, only if a chemical ID is passed in via a query parameter
    const detection_notes = this.chemicalID
      ? detection[this.chemicalID][this.id]
      : undefined;

    return {
      chemicals,

      // Get the specific detection equipment
      equipment: all_detection_equipments[this.id],

      detection_notes,
    };
  },

  methods: {
    // @todo Have to change this depending on whether there is chemical or not
    shareViaWebShare() {
      navigator.share({
        title: "Share this Equipment",
        text: this.equipment.name,
        url: `https://singapore-civil-defence-force.github.io/hazmatrix/#/equipment/detection/${this.id}`,
      });
    },
  },
};
</script>
