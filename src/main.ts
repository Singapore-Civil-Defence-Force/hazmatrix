// Load bulma styles in the main entry point before all else
// If you prefer using a CDN, delete this line and the dependency, and add the CDN link to index.html
import "bulma/css/bulma.min.css";

import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

// Create new vue app
createApp(App).use(router).mount("#app");
