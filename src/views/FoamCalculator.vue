<script setup lang="ts">
import { ref, computed } from "vue";

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

// Tank size is the diameter, therefore need to halve it first for radius
const tankSize = ref<number | undefined>(undefined);

// Defaults to 65 mins
const applicationTime = ref<number>(65);

/** Ensure all the input is valid before showing the results page */
const inputValidated = computed(
  () =>
    tankSize.value !== undefined &&
    tankSize.value > 0 &&
    applicationTime.value &&
    applicationTime.value > 0
);

// @todo return 0 or NaN?
// Formula uses 3.142 instead of Math.PI
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

const totalFoamSolution = computed(() =>
  Math.ceil(applicationRate.value * applicationTime.value * fssf.value)
);
const waterRequired = computed(() =>
  // Note that `1-foamConcentrate.value` might not be super precise due to floating point math
  Math.ceil(totalFoamSolution.value * (1 - foamConcentrate.value) * 2)
);
const fcvr = computed(() =>
  Math.ceil(totalFoamSolution.value * foamConcentrate.value * 2)
);
</script>

<template>
  <!-- @todo Make this container on big screens -->
  <div class="columns is-multiline has-text-left m-2 mb-6">
    <div class="column is-full">
      <div class="columns is-multiline is-vcentered is-mobile">
        <div class="column">
          <p class="is-size-5 has-text-warning-dark">Foam Calculator</p>
        </div>
        <div class="column is-narrow">
          <button class="button is-light" @click="$router.back">Back</button>
        </div>
      </div>
    </div>

    <div class="column is-full box mx-3">
      <div class="columns is-multiline">
        <!-- @todo Add units at end of input and make this right aligned -->
        <div class="column is-full">
          <label for="tank-size">
            Tank Size (the diameter in meters)

            <!-- @todo autofocus not working -->
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
            Foam Concentrate

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
            Required Foam Discharge Time

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
    </div>

    <div v-if="inputValidated" class="column is-full mx-3">
      <div class="columns is-multiline">
        <div class="column is-full pb-0">
          <b class="has-text-warning-dark">Results</b>
        </div>

        <div class="column is-full box">
          <b>Volume of Foam Concentrate required</b>
          <br />
          (inclusive of 100% backup supply)
          <br />
          {{ fcvr }}
        </div>

        <div class="column is-full box">
          Total amount of <b>Water</b> required
          <br />
          {{ waterRequired }}
        </div>

        <div class="column is-full box">
          Application Rate
          <br />
          {{ applicationRate }}
        </div>

        <div class="column is-full box">
          Tank top <b>Surface Area</b>
          <br />
          {{ fssf }}m<sup>2</sup>
        </div>

        <div class="column is-full box">
          Total <b>Foam Solution</b> required
          <br />
          {{ totalFoamSolution }}
        </div>
      </div>
    </div>
  </div>
</template>
