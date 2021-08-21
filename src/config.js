/*
  File for all global configuration values

  https://stackoverflow.com/questions/33524696/es6-destructuring-and-module-imports
  Following above as reference on how to export values in es6 modules to allow for destructuring during module imports
*/

// Store all config values in 1 big config object
const config = {
  // Base URL of app, change this if hosting URL changes
  // Base URL only includes `#` because this base URL is mainly used for validating a HazMatrix share link,
  // so the starting / path is not included so that it is still there even after stripping out the baseURL to use for sharing
  baseURL: "https://hazmatrix.tftdx.com/#",
};

// Export the entire config object as the default export, so that modules can import the whole thing with,
// `import config from "./config.js";` and use config as the namespace to access all the config values
export default config;

/*
  Export all the config values 1 by 1 as named exports,
  so that the values can be imported individually using destructuring on import
  like `import { configValue } from "./config.js";`
*/
export const baseURL = config.baseURL;
