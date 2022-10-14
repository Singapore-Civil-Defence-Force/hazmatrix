<script setup lang="ts">
import { ref, computed } from "vue";

import { baseURL } from "../config";
import Share from "../components/Share.vue";

// Accept URL query params as props to allow the results of this page to be shareable
const props = defineProps<{
  sharedFoamConcentrate?: string;
  sharedTankSize?: string;
  sharedApplicationTime?: string;
}>();

type FoamConcentrateLevels = 0.01 | 0.03 | 0.06;
type FoamConcentrateLevelsInPercentage = "1%" | "3%" | "6%";

/**
 * Function to get foamConcentrateLevel accurately and precisely,
 * using the props as default value.
 *
 * Alternative is to use this type predicate, but the problem is that,
 * if the parseFloat is not precise, then this will return default value
 * instead, and return a wrong value shared to others.
 *
 * const isFoamConcentrateLevel = (val: number): FoamConcentrateLevels =>
 *   val === 0.01 || val === 0.03 || val === 0.06 ? val : 0.03;
 */
function foamConcentrateLevelConversion(): FoamConcentrateLevels {
  switch (props.sharedFoamConcentrate) {
    case "0.01":
      return 0.01;
    case "0.03":
      return 0.03;
    case "0.06":
      return 0.06;

    default:
      return 0.03;
  }
}
const foamConcentrate = ref(foamConcentrateLevelConversion());
const foamConcentrateLevels: Array<{
  level: FoamConcentrateLevels;
  display: FoamConcentrateLevelsInPercentage;
}> = [
  { level: 0.01, display: "1%" },
  { level: 0.03, display: "3%" },
  { level: 0.06, display: "6%" },
];

// Tank size is the diameter, therefore need to halve it first for radius
const tankSize = ref<number | undefined>(
  props.sharedTankSize ? parseInt(props.sharedTankSize) : undefined
);

// Defaults to 65 mins
const applicationTime = ref<number>(
  props.sharedApplicationTime ? parseInt(props.sharedApplicationTime) : 65
);

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
const foamConcentrateVolume = computed(() =>
  Math.ceil(totalFoamSolution.value * foamConcentrate.value * 2)
);

/**
 * Format numbers so that large numbers are more readable with commas.
 * Not using the 'SG' locale as that uses periods for seperation of 1000s.
 * Using a hardcoded 'en' locale to ensure that regardless of device locale,
 * the output will always be the same/consistent using commas for 1000 seperation.
 */
const formatNumber = (num: number | bigint) =>
  Intl.NumberFormat("en").format(num);
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
          <router-link :to="{ name: 'home' }" class="button is-light">
            Home
          </router-link>
        </div>
      </div>
    </div>

    <div class="column is-full box mx-3">
      <div class="columns is-multiline">
        <div class="column is-full">
          <label for="tank-size">
            Tank Size (the diameter in meters)

            <!-- @todo autofocus not working -->
            <div class="field has-addons">
              <p class="control is-expanded">
                <input
                  v-autofocus
                  type="number"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  min="1"
                  v-model="tankSize"
                  placeholder="E.g. 100"
                  required
                  class="input has-text-right"
                />
              </p>
              <p class="control">
                <a class="button is-static">meters</a>
              </p>
            </div>
          </label>
        </div>

        <div class="column is-full">
          <!--
            Alternative is to allow manual input with auto suggested defaults,
            so that in case the percentage changes in the future the app does
            not need to be updated before they can use those number.
          -->
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
              <!--
                Note that this right text-alignment will not work on safari
                Reference:
                https://stackoverflow.com/questions/11182559/text-align-is-not-working-on-safari-select
                https://bugs.webkit.org/show_bug.cgi?id=40216
              -->
              <select v-model="foamConcentrate" class="has-text-right">
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

        <div class="column is-full">
          <label for="tank-size">
            Required Foam Discharge Time

            <div class="field has-addons">
              <p class="control is-expanded">
                <!-- This defaults to 65 mins -->
                <!--
                  On click this will select all for user to type over, if not, the cursor
                  might be placed at the front of the number, which means user have to
                  move the cursor to the back before they can clear the original input.
                -->
                <input
                  type="number"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  min="1"
                  v-model="applicationTime"
                  placeholder="E.g. 65"
                  required
                  class="input has-text-right"
                  onclick="this.select();"
                />
              </p>
              <p class="control">
                <a class="button is-static">minutes</a>
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!--
      Show simple note to user when no results is displayed in case
      they are confused how to get the results to show
    -->
    <div v-if="!inputValidated" class="column is-full">
      <div class="box has-text-grey">
        Results will appear after entering all input
      </div>
    </div>

    <!-- Only show the results section once input has been validated -->
    <div v-else class="column is-full mx-3">
      <div class="columns is-multiline">
        <div class="column is-full pb-0">
          <b class="has-text-warning-dark">Results</b>
        </div>

        <div class="column is-full box">
          <b>Volume of Foam Concentrate required</b>
          <br />
          (inclusive of 100% backup supply)
          <hr class="m-1" />
          <div class="has-text-right">
            {{ formatNumber(foamConcentrateVolume) }} Lt
          </div>
        </div>

        <div class="column is-full box">
          Total amount of
          <span class="has-text-weight-semibold">Water</span> required
          <hr class="m-1" />
          <div class="has-text-right">{{ formatNumber(waterRequired) }} Lt</div>
        </div>

        <div class="column is-full box">
          Application Rate
          <hr class="m-1" />
          <div class="has-text-right">
            {{ applicationRate }} Lt/min/m<sup>2</sup>
          </div>
        </div>

        <div class="column is-full box">
          Tank top <span class="has-text-weight-semibold">Surface Area</span>
          <hr class="m-1" />
          <div class="has-text-right">
            {{ formatNumber(fssf) }} m<sup>2</sup>
          </div>
        </div>

        <div class="column is-full box">
          Total
          <span class="has-text-weight-semibold">Foam Solution</span> required
          <hr class="m-1" />
          <div class="has-text-right">
            {{ formatNumber(totalFoamSolution) }} Lt
          </div>
        </div>

        <div class="column is-full p-0">
          <Share
            :options="{
              title: 'Share the foam calculator results',
              url:
                baseURL +
                `/foam?sharedFoamConcentrate=${foamConcentrate}&sharedTankSize=${tankSize}&sharedApplicationTime=${applicationTime}`,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
  Color input pink if it is invalid --> e.g. when telephone number does not match the specified pattern
  Will only activate if the placeholder is not currently being shown, meaning will not show before user type anything
*/
input:not(:placeholder-shown):invalid {
  background-color: lightpink;
}
</style>
