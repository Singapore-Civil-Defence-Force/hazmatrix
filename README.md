# HazMatrix
HazMat Matrix quick reference handbook built using Vue3, Bulma and TypeScript.

This application aids incident manager of emergencies involving hazardous materials by providing quick and accurate information across hundreds of `Chemicals x Equipment` permutations across a wide variety of complex chemical detectors and mitigation equipments to respond quickly and safely.


## Commands
- Get started by installing dependencies
    - `npm i`
- Run in development mode
    - `npm run serve`
        - *See the site on https://localhost:8080 instead of just http!!*
    - `npm run serve:localnetwork`
        - Use this to access the development server on your computer from your phone.
- Lint source files with ESLint
    - `npm run lint`
- Format source files with Prettier
    - `npm run format`
- Preview production build locally
    - `npm run preview`
- Run type check before a build to check for type errors using the CLI tool
    - `npm run typecheck`
- Build for production deployment
    - `npm run build`
- Run type check and clean cache before full production build
    - `npm run build:full`
- Deploy to github pages (please build it first before deploying)
    - `npm run deploy`


## Deployment
- App is hosted using Github pages
- Build the app and place output in [/docs](./docs)
- Deploy using a git commit on the main branch's with the [/docs](./docs) directory content
- All commits used for deployment have the message, `[Github pages deployment commit]` to make them easily identifiable
- Keep git stage clean before deploying so as to not mix build output and source code changes into the same `[Github pages deployment commit]` commit
    - Commit all source code as needed for the new build/version
    - Ensure git staging area is clean
    - Then run `npm run deploy` to build and deploy a new version
