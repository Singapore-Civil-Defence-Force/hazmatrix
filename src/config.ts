/**
 * File for all global configuration values using named exports.
 */

/**
 * Base URL of app, change this if hosting URL changes.
 * For methods and template to access this instead of hard coding the base URL in every component.
 *
 * Base URL only includes `#` because this base URL is mainly used for validating a HazMatrix share link,
 * so the starting / path is not included so that it is still there even after stripping out the baseURL to use for sharing.
 */
export const baseURL =
  // Uses the CNAME env var injected during build time for the actual domain.
  // This ensures that the baseURL used aligns with the hostname set in the CNAME file for github pages jekyll deployment.
  process.env.NODE_ENV === "production"
    ? `https://${process.env.CNAME}/#`
    : "http://localhost:8080/#";
