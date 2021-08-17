# HazMatrix
HazMat Matrix quick reference handbook.

This application aids incident manager of emergencies involving hazardous materials by providing quick and accurate information across hundreds of `Chemicals x Equipment` permutations across a wide variety of complex chemical detectors and mitigation equipments to respond quickly and safely.

## Deployment
- App is hosted using Github pages
- Deployed using a git commit and push on the main branch's [/docs](./docs) directory, where the vue CLI service's build output is
- All commits used for deployment have the message, `[Github pages deployment commit]` to make them easily identifiable
- Keep git stage clean before deploying so as to not mix build output and source code changes into the same `[Github pages deployment commit]` commit
    - Commit all source code as needed for the new build/version
    - Ensure git staging area is clean
    - Then run `npm run deploy` to build and deploy a new version
