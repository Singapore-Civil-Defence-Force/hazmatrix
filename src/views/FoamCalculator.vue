<script setup lang="ts">
import { ref, computed } from "vue";

// @todo Tank size diameter, half for radius
const tankSize = ref<number | undefined>(undefined);

type FoamConcentrateLevels = 0.01 | 0.03 | 0.06;
type FoamConcentrateLevelsInPercentage = "1%" | "3%" | "6%";

const foamConcentrate = ref<FoamConcentrateLevels>(0.03);
const foamConcentrateLevels: Array<{
  level: FoamConcentrateLevels;
  display: FoamConcentrateLevelsInPercentage;
}> = [
  { level: 0.01, display: "1%" },
  { level: 0.03, display: "3%" },
  { level: 0.06, display: "6%" },
];

// Defaults to 65 mins
const applicationTime = ref<number>(65);

// @todo return 0 or NaN?
// Formula uses 3.142 instead of Pi
const fssf = computed(() =>
  tankSize.value ? Math.ceil(3.142 * (tankSize.value / 2) ** 2) : 0
);

// @todo return 0 or NaN?
const applicationRate = computed(() => {
  if (!tankSize.value) return 0;

  if (tankSize.value <= 46) return 6.51;
  if (tankSize.value <= 61) return 7.32;
  if (tankSize.value <= 76) return 8.13;
  if (tankSize.value <= 91) return 8.95;

  // When diameter larger than 91m
  return 10.17;
});

const total_foam_solution = computed(
  () => applicationRate.value * applicationTime.value * fssf.value
);
const waterRequired = computed(() => total_foam_solution.value * 0.97 * 2);
const fcvr = computed(() => total_foam_solution.value * 0.03 * 2);
</script>

<template>
  <div class="center">
    <!-- Stretch everything out to fill the screen as much as possible -->
    <div style="width: 90vw">
      <!-- @todo Add a back and home button -->

      <!-- Allow multiple line in desktop / landscape mode -->
      <div class="columns is-multiline">
        <!-- @todo Add units at end of input and make this right aligned -->
        <div class="column is-full">
          <label for="tank-size">
            <b>Tank Size (in meters)</b>

            <input
              v-autofocus
              type="number"
              v-model="tankSize"
              placeholder="E.g. 20"
              required
              class="input"
            />
          </label>
        </div>

        <div class="column is-full">
          <!-- @todo Allow manual input with auto suggested defaults -->
          <!-- <input
              type="string"
              v-model="foamConcentrate"
              placeholder="E.g. 3"
              required
              class="input"
            /> -->

          <label for="foam-concentrate">
            <b>Foam Concentrate</b>

            <div class="select is-fullwidth">
              <select v-model="foamConcentrate">
                <option
                  v-for="({ level, display }, key) in foamConcentrateLevels"
                  :value="level"
                  :key="key"
                  :selected="level === foamConcentrate"
                >
                  {{ display }}
                </option>
              </select>
            </div>
          </label>
        </div>

        <!-- @todo Add units at end of input and make this right aligned -->
        <div class="column is-full">
          <label for="tank-size">
            <b>Required Foam Discharge Time</b>

            <!-- This defaults to 65 mins -->
            <input
              type="number"
              v-model="applicationTime"
              placeholder="E.g. 65"
              required
              class="input"
            />
          </label>
        </div>
      </div>

      <div class="columns is-multiline">
        <!-- Make this bolded as this is the main thing -->
        <div class="column is-full">
          <!-- foam concentrate volume required -->
          Volume of foam concentrate required (inclusive of 100% backup supply)
          <br />
          {{ fcvr }}
        </div>

        <div class="column is-full">
          total amount of water required
          <br />
          {{ waterRequired }}
        </div>

        <div class="column is-full">
          <!-- full surface application density / application rate -->
          Application Rate
          <br />
          {{ applicationRate }}
        </div>

        <div class="column is-full">
          <!-- full surface square footage: step 1 (surface area at top of tank) -->
          <!-- full surface square footage (nearest integer) -->
          Tank top Surface Area
          <br />
          {{ fssf }}m<sup>2</sup>
        </div>

        <div class="column is-full">
          total_foam_solution
          <br />
          {{ total_foam_solution }}
        </div>

        <!-- Add result sharing link -->
      </div>
    </div>
  </div>
</template>
