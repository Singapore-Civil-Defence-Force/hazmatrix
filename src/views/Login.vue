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
import firebase from "firebase/app";
import "firebase/auth";
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

      /*
        @todo Disable the login/signup up buttons or some code here to prevent this from being called more then once

        To prevent:
        - double call to login
        - double navigation to the same route
      */

      try {
        // Remove empty spaces to prevent whitespaces from causing signin issues
        this.email = this.email.trim();

        // @todo Primitive version: Check if email is a SCDF account by seeing if "@scdf.gov.sg" is used
        // JJ@scdf.gov.sg // Demo scdf email
        // make scdf case insensitve
        if (this.email.slice(-12) !== "@scdf.gov.sg") {
          // Throw new error with pre-defined code to get the right error_msg
          const error = new Error();
          error.code = "email/not-scdf";
          throw error;
        }

        // eslint-disable-next-line no-unused-vars
        const usr = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);

        // if (!firebase.auth().currentUser.emailVerified) {
        //   // Throw new error with pre-defined code to get the right error_msg
        //   const error = new Error();
        //   error.code = "email/no-verify";
        //   throw error;
        // }

        // Await for async dispatch to ensure app only starts after user info is available.
        // await this.$store.dispatch("getUserDetails", this.email);
        // this.$store.dispatch("init");

        // Route to the user's home page, after login
        this.$router.replace({ name: "home" });
      } catch (error) {
        // Only resend verification email if needed, but both will end early after signout without continuing to normal error handling
        // if (error.code === "email/no-verify") {
        //   if (
        //     confirm(
        //       "Please verify your email first! Resend verification email?"
        //     )
        //   )
        //     firebase.auth().currentUser.sendEmailVerification();
        //   return await firebase.auth().signOut();
        // }

        // If there is an error but user is somehow logged in, sign user out to try again
        if (firebase.auth().currentUser) await firebase.auth().signOut();

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
