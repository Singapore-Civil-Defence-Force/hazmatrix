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
              v-for="limitation in equipment['Mitigation Limitations']"
              :key="limitation"
            >
              {{ limitation }}
            </li>
          </ul>
        </details>
      </div>

      <div class="column">
        <hr class="my-0" style="background-color: #dedede" />
      </div>

      <div class="column pb-0 mb-0">
        <p class="subtitle">
          Operating Pressure: <b>{{ equipment["Operating Pressure"] }}</b>
        </p>
      </div>

      <div class="column">
        <hr class="my-0" style="background-color: #dedede" />
      </div>

      <div class="column pb-0 mb-0">
        <p class="subtitle">
          <!-- @todo Might want to show values on new line since some are long strings e.g "maximum of 100C" -->
          Working Temperature: <b>{{ equipment["Working Temperature"] }}</b>
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
import all_mitigation_equipments from "../../data/mitigation_equipments.json";

// @todo Doing mitigation equipment only for now
export default {
  name: "Equipment",

  // Get chemical's id from router
  props: ["id"],

  data() {
    return {
      equipment: all_mitigation_equipments[this.id],
    };
  },

  methods: {
    shareViaWebShare() {
      navigator.share({
        title: "Share this Equipment",
        text: this.equipment.name,
        url: `https://singapore-civil-defence-force.github.io/hazmatrix/#/equipment/${this.id}`,
      });
    },
  },
};
</script>
