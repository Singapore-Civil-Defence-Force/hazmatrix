/**
 * File for all global configuration values using named exports.
 */

/**
 * Base URL of app for methods and template to access this instead of hard
 * coding the base URL in every component.
 *
 * This uses the CNAME env var injected during build time (in vite.config.ts)
 * for the actual domain when building for deployment. This ensures that the
 * baseURL used, aligns with the hostname set in the CNAME file (/public/CNAME)
 * for github pages jekyll deployment.
 *
 * Base URL only includes `#` because this base URL is mainly used for validating
 * a HazMatrix share link, so the starting / path is not included so that it is
 * still there even after stripping out the baseURL to use for sharing.
 *
 * This will use the production version (the CNAME env var) for any non builds
 * that is not for development. E.g. production builds, github-pages builds.
 *
 * Although `process.env.NODE_ENV` still works, it is no longer the recommended way.
 * Newer use cases will all be based on `import.meta.env` in the future too.
 * See: https://github.com/vitejs/vite/issues/1973
 */
export const baseURL =
  import.meta.env.MODE === "development"
    ? "https://localhost:8080/#"
    : `https://${__vite_inject.CNAME}/#`;
