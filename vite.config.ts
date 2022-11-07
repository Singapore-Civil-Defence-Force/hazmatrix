import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import basicSSL from "@vitejs/plugin-basic-ssl";

import childProcess from "child_process";

// Get git values to be use in the vue app
const gitValues = {
  commitHash: childProcess.execSync("git rev-parse HEAD").toString(),
  gitBranch: childProcess
    .execSync("git rev-parse --abbrev-ref HEAD")
    .toString(),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    // Plugin to enable PWA usage
    VitePWA({
      // Allow PWA to be tested in development mode
      devOptions: { enabled: true },

      registerType: "autoUpdate",

      // Values in the generated manifest file
      manifest: {
        name: "HazMatrix",
      },
    }),

    // Enable https by default as ios requires https connections to give camera access
    // https://vitejs.dev/config/server-options.html#server-https
    // https://vitejs.dev/guide/migration.html#automatic-https-certificate-generation
    basicSSL(),
  ],

  /**
   * Replace these strings with the appropriate values during build time.
   * Update `.eslintrc.cjs` and `env.d.ts` whenever new values are added to get typing and lint support
   *
   *
   * ****IMPORTANT NOTE****
   * All the string values MUST be wrapped in a `JSON.stringify()` call as string values will be used
   * as raw expressions starting from vite v2. JSON.stringify will convert it to be explicitly quoted.
   *
   * Reference:
   * - https://vitejs.dev/config/shared-options.html#define
   * - https://github.com/vitejs/vite/issues/6235
   * - https://github.com/vitejs/vite/issues/2058
   * - https://github.com/vitejs/vite/commit/30deabf4aaf7acafdf854f8950355b48be46d9db
   */
  define: {
    "__vite_inject.commitHash": JSON.stringify(gitValues.commitHash),
    "__vite_inject.gitBranch": JSON.stringify(gitValues.gitBranch),

    // CI/CD build server might not be in SG, so store date as ISO string, to create a new Date object when viewing to show time in user's locale
    "__vite_inject.buildTime": JSON.stringify(new Date()),

    // Pass in the content in the CNAME file so that the baseURL can be created properly
    "__vite_inject.CNAME": JSON.stringify(
      require("fs")
        .readFileSync(
          require("path").resolve(__dirname, "./public/CNAME"),
          "utf8"
        )
        .trim()
    ),
  },
});
