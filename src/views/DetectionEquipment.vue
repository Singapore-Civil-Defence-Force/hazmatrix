<template>
  <div class="px-4 pt-4" style="text-align: left">
    <div class="columns is-multiline">
      <div class="column">
        <p class="title is-4">{{ equipment.name }}</p>
      </div>

      <div class="column pb-0 mb-0">
        <p class="subtitle">
          <!-- @todo Might want to show values on new line since some are long strings e.g "0 °C to 52 °C / 50ppm - 1000ppm" -->
          Operating Temperature: <b>{{ equipment["operating temperature"] }}</b>
        </p>
      </div>

      <div class="column">
        <hr class="my-0" style="background-color: #dedede" />
      </div>

      <div class="column pb-0 mb-0">
        <p class="subtitle">
          Can use in flammable environment:
          <b>{{ equipment["flammable environment"] }}</b>
        </p>
      </div>

      <div class="column">
        <hr class="my-0" style="background-color: #dedede" />
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

/* 
  Right now, this shows a equipment, but does not show whether this equipment's status to the specific chemical
    - e.g. No of Stroke needed for Draeger tubes
    - maybe chemical view can pass it's own chemical ID in as a query,
      - and if there is a chemical ID, then show case extra section on how to use this equipment to detect the given chemical
*/

export default {
  name: "DetectionEquipment",

  // Get chemical's id from router
  props: ["id"],

  data() {
    return {
      equipment: all_detection_equipments[this.id],
    };
  },

  methods: {
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
