# HazMatrix
HazMat Matrix quick reference handbook

As the incident manager of emergencies involving hazardous materials, SCDF officers are required to be well versed with a wide variety of complex chemical detectors and mitigation equipments. This application aids them by providing quick and accurate information across hundreds of `Chemicals x Equipment` permutations to respond quickly and safely

## Deployment
- App is hosted using Github pages
- Deployed using a git commit and push on the main branch's [/docs](./docs) directory, where the vue CLI service's build output is
- All commits used for deployment have the message, `[Github pages deployment commit]` to make them easily identifiable
- Keep git stage clean before deploying so as to not mix build output and source code changes into the same `[Github pages deployment commit]` commit
    - Commit all source code as needed for the new build/version
    - Ensure git staging area is clean
    - Then run `npm run deploy` to build and deploy a new version
