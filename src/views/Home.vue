<template>
  <div class="section center">
    <!-- Show full screen loader while waiting for id to be saved -->
    <loader v-if="loader" />

    <div v-else>
      <!-- Only load/show scanning UI when requested -->
      <QRCodeScanner v-if="scanQR" v-on:qrcode-detected="setItemID" />
      <br />

      <!-- Allow multiple line in desktop / landscape mode -->
      <div class="columns is-multiline">
        <!-- is-full to fill up column space when in desktop / landscape mode -->
        <div class="column is-full">
          <label>
            <!-- @todo Use after the mobile width is fixed -->
            <!-- <b>Item ID</b> -->
            <b>Enter selected item's ID</b>

            <!-- Pattern matching version for a any number of digits and whitespaces -->
            <input
              type="number"
              pattern="[\s0-9]+"
              v-model="itemID"
              placeholder="E.g. 1234"
              required
              class="input"
              style="width: 100%"
            />
          </label>
        </div>

        <!-- is-full to fill up column space when in desktop / landscape mode -->
        <div class="column is-full">
          <label>
            <b>Quantity</b>

            <!-- Pattern matching version for a any number of digits and whitespaces -->
            <input
              type="number"
              pattern="[\s0-9]+"
              v-model="quantity"
              placeholder="E.g. 1"
              required
              class="input"
              style="width: 100%"
            />
          </label>
        </div>

        <div class="column">
          <button
            v-if="scanQR"
            class="button is-light is-fullwidth is-warning"
            @click="scanQR = false"
          >
            Close QR Scanner
          </button>

          <button
            v-else
            class="button is-light is-fullwidth is-warning"
            @click="scanQR = true"
          >
            Scan QR
          </button>
        </div>

        <div class="column">
          <button @click="take" class="button is-light is-fullwidth is-success">
            Take Item
          </button>
        </div>
      </div>

      <!-- @todo Might want to give more space on top -->
      <div class="columns is-mobile">
        <div class="column">
          <router-link
            :to="{ name: 'settings' }"
            class="button is-light is-fullwidth"
          >
            settings
          </router-link>
        </div>

        <div class="column">
          <router-link
            :to="{ name: 'settings' }"
            class="button is-light is-fullwidth"
          >
            next..
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loader from "./Loader";
import { ffetch, getAuthHeader } from "../utils/fetch";

import QRCodeScanner from "./QRCodeScanner";

export default {
  name: "home",

  components: { loader, QRCodeScanner },

  props: {
    // @todo Dont leave as prop, since should not mutate prop
    itemID: {
      // Technically is number like the required input format, but props from URL params are string, thus string here
      type: String,
      default: "",
    },
  },

  data() {
    return {
      loader: false,
      scanQR: false,

      // Undefined instead of 0 so that users do not need to backspace to delete 0 and enter their new number
      quantity: undefined,
    };
  },

  methods: {
    setItemID(detectedCode) {
      // Close QR Code scanner once code has been detected
      this.scanQR = false;
      this.itemID = detectedCode;
    },

    async take() {
      // Get the current user's email
      // @todo Slice away the "@scdf.gov.sg"
      // const userEmail = firebase.auth().currentUser.email;
      const userEmail = "JJ@scdf.gov.sg";

      // Break out of function if itemID is blank or quantity is not set
      if (
        this.itemID === "" ||
        this.quantity === undefined ||
        this.quantity === ""
      )
        return alert("Please fill in all inputs");

      // Show loader once validation is completed and before calling the API
      this.loader = true;

      try {
        // const response = await ffetch(
        //   process.env.NODE_ENV === "production"
        //     ? "https://api-pivlacyi5a-as.a.run.app/take"
        //     : "http://localhost:3000/take",

        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: await getAuthHeader(firebase.auth),
        //     },
        //   },
        //   {
        //     item: this.itemID,
        //     quantity: this.quantity,
        //     user: userEmail,
        //     // reason: this.reason,
        //   }
        // ).then((response) => response.json());

        // if (!response.ok) throw new Error(response.error);

        // Reset inputs to allow users to quickly take multiple items
        this.itemID = "";
        this.quantity = undefined;

        alert("Action recorded!");
      } catch (error) {
        console.error(error);
        alert("Something went wrong:\n" + error.message);
      } finally {
        // Always ensure the full screen loader is removed
        this.loader = false;
      }
    },
  },
};
</script>

<style scoped>
/* Color input pink if it is invalid --> when telephone number does not match the specified pattern */
/* Will only activate if the placeholder is not currently being shown, meaning will not show before user type anything */
input:not(:placeholder-shown):invalid {
  background-color: lightpink;
}
</style>
