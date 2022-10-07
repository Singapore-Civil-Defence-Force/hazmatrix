import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import basicSSL from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
// https://vitejs.dev/config/#conditional-config
export default defineConfig(({ mode }) => {
  return {
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

    // @todo Test if this works
    base: mode === "github-pages" ? "/HazMatrix/" : "/",
  };
});
