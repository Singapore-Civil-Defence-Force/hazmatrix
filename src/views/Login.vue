<template>
  <div class="center mx-4">
    <loader v-if="loader" />

    <div v-else>
      <div class="columns">
        <!-- Need to put width: 100% -->
        <div class="column" style="width: 100%">
          <label for="otp">
            <b>SCDF ims login</b>
          </label>

          <input
            v-autofocus
            type="text"
            v-model="email"
            placeholder="Email"
            @keypress.enter="login"
            class="input mb-4"
            style="width: 100%"
            required
          />

          <br />

          <input
            type="password"
            v-model="password"
            placeholder="Password"
            @keypress.enter="login"
            class="input mb-4"
            style="width: 100%"
            required
          />

          <br />

          <button
            class="button is-light is-fullwidth is-success"
            @click="login"
          >
            Login
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

export default {
  name: "login",

  components: { loader, version },

  data() {
    return {
      // Used to toggle loader component's visibility
      loader: false,

      email: "",
      password: "",
    };
  },

  methods: {
    async login() {
      this.loader = true;

      try {
        // Route to the user's home page, after login
        this.$router.replace({ name: "home" });
      } catch (error) {
        alert(
          (function (err) {
            switch (err.code) {
              case "auth/wrong-password":
                return "Invalid password or email!";
              case "auth/network-request-failed":
                return "Oops, check your internet connection!";
              case "auth/user-not-found":
                return "Sorry but you dont have an account with us 😭\nSignup with your admin";
              case "email/not-scdf":
                return "Only SCDF emails can be used";
              case "email/no-verify":
                return "Email not verified.\nPlease verify before trying again";
              default:
                return "Something went wrong! Please try again.";
            }
          })(error)
        );
      }

      // Remove loader if login failed to allow user to try again
      this.loader = false;
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
