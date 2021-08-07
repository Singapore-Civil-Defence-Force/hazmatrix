<template>
  <div class="section center">
    <!-- Show full screen loader while waiting for id to be saved -->
    <loader v-if="loader" />

    <div v-else>
      <!-- Allow multiple line in desktop / landscape mode -->
      <div class="columns is-multiline">
        <!-- is-full to fill up column space when in desktop / landscape mode -->
        <div class="column is-full">
          <label>
            <b>Name</b>

            <!-- Pattern matching version for a any number of digits and whitespaces -->
            <input
              type="text"
              v-model="name"
              placeholder="E.g. JJ"
              required
              class="input"
              style="width: 100%"
            />
          </label>
        </div>

        <!-- is-full to fill up column space when in desktop / landscape mode -->
        <div class="column is-full">
          <label>
            <b>Firestation</b>
            <br />

            <div class="select is-fullwidth">
              <!-- Use on change event listener for changes to the firestation ID -->
              <select v-on:change="updateFirestationID($event)">
                <!-- Value must be firestation's id so that when parsing value in @change handler it can get id instead of station name -->
                <option
                  v-for="fs in firestations"
                  :value="fs.id"
                  :key="fs.id"
                  :selected="fs.id === userFirestationID"
                >
                  {{ fs.name }}
                </option>
              </select>
            </div>
          </label>
        </div>

        <div class="column">
          <button @click="help" class="button is-light is-fullwidth is-success">
            Get help
          </button>
        </div>
      </div>

      <div class="columns is-mobile">
        <div class="column">
          <router-link
            :to="{ name: 'home' }"
            class="button is-light is-fullwidth"
          >
            home
          </router-link>
        </div>

        <!-- Button disabled if values unedited, and enabled in green color when edited and not yet saved -->
        <div class="column">
          <button
            :disabled="unedited"
            class="button is-fullwidth"
            :class="{ 'is-light': unedited, 'is-success': !unedited }"
            @click="saveSettings"
          >
            save
          </button>
        </div>
      </div>

      <version />
    </div>
  </div>
</template>

<script>
import loader from "./Loader";
import version from "./Version";
import { ffetch, getAuthHeader } from "../utils/fetch";

export default {
  name: "settings",

  components: { loader, version },

  data() {
    // @todo Load this from DB? Or is this part of a custom claims value of RBAC
    const userFirestationID = 2;

    return {
      loader: false,

      // Original data used to compare if user made any changes
      original: { name, userFirestationID },
      name: "JJ",
      userFirestationID,

      // @todo Load this from DB and cache in vuex store
      firestations: [
        { id: 1, name: "Paya lebar" },
        { id: 2, name: "Ang Mo Kio" },
        { id: 3, name: "Changi" },
        { id: 4, name: "Tampines" },
      ],
    };
  },

  computed: {
    unedited() {
      return (
        this.original.name === this.name &&
        this.original.userFirestationID === this.userFirestationID
      );
    },
  },

  methods: {
    updateFirestationID(event) {
      // ID is int, but if set as value of option element, it will be auto converted into String, thus parseInt back to int before saving it
      // If not converted before saving, userFirestationID would become a string and UI will show as edited because "1" !== 1
      this.userFirestationID = parseInt(event.target.value);
    },

    // Async function to sent API server a help request for it to notify admins
    // async help() {
    //   // Get the current user's email
    //   const userEmail = firebase.auth().currentUser.email;

    //   // Show loader once validation is completed and before calling the API
    //   this.loader = true;

    //   try {
    //     const response = await ffetch(
    //       process.env.NODE_ENV === "production"
    //         ? "https://api-pivlacyi5a-as.a.run.app/help"
    //         : "http://localhost:3000/help",

    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: await getAuthHeader(firebase.auth),
    //         },
    //       },
    //       { user: userEmail }
    //     ).then((response) => response.json());

    //     if (!response.ok) throw new Error(response.error);

    //     alert("Admins will contact you via your email asap!");
    //   } catch (error) {
    //     console.error(error);
    //     alert("Something went wrong:\n" + error.message);
    //   } finally {
    //     // Always ensure the full screen loader is removed
    //     this.loader = false;
    //   }
    // },
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
