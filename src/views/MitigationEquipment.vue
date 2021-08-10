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

/* 
  Right now, this shows a equipment, but does not show whether this equipment's status to the specific chemical
    - e.g. pipe sealing bag is "Good" for acetic acid
    - maybe chemical view can pass it's own chemical ID in as a query,
      - and if there is a chemical ID, then show case extra section on how well this can be used to mitigate the situation
*/

export default {
  name: "MitigationEquipment",

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
        url: `https://singapore-civil-defence-force.github.io/hazmatrix/#/equipment/mitigation/${this.id}`,
      });
    },
  },
};
</script>
