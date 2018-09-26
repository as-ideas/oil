# How to deploy oil.js (deprecated but still in use)

Deployment of oil.js requires the following steps:

1. Prepare the new release:
   1. Finalize all changes that are intended to be part of the new release.
   2. Ensure that `version` entry in `package.json` is set to the project version number of the new release that is to be created.
   3. Commit all changes on `master` branch and push them to GitHub.
2. Build the new release:
   1. Invoke job `OIL-release-build` on Jenkins (tab `OIL Project`). It must be successful to continue with the next step.
3. Create the new release on GitHub:
   1. Go to [GitHub](https://github.com/as-ideas/oil), invoke project `as-ideas/oil` and go to `releases` section.
   2. Click on `Draft a new release`
   3. Set `Tag version` to the new project version number.
   4. Define a short release title.
   5. Set the release notes as the description field of the release. Please use the release notes of former releases as template.
   6. Click on `Publish release` to create the new release. The corresponding tag is set automatically.
4. Publish the new release on npmjs.com and `unpgk.com`:
   1. Go to your local copy of the `oil` repository.
   2. Check out and update `master` branch.
   3. Invoke `npm publish`.
   4. Go to [npmjs.org](https://www.npmjs.com/package/@ideasio/oil.js) and check that the new version is available (it may take a while until it's visible).
   5. Check if `https://unpkg.com/@ideasio/oil.js@<new project version number>/dist/latest/` exists and is complete.
   
Congratulations! Your new release is done and ready! :)

# How to deploy oil.js (new procedure, not in use yet)

Deployment of oil.js requires the following steps:

1. Prepare the new release:
   1. Finalize all changes that are intended to be part of the new release.
   2. Ensure that `version` entry in `package.json` is set to the project version number of the new release that is to be created.
   3. Commit all changes on `master` branch and push them to GitHub.
2. Build the new release:
   1. Invoke job `OIL-release-build` on Jenkins (tab `OIL Project`) with parameters `RELEASE_NAME` and `RELESE_DESCRIPTION`. The description
      contains the release notes. Please use the release notes of former releases as template. The job must be successful to continue with the next step. 
3. Finalize the new release on GitHub:
   1. Go to [GitHub](https://github.com/as-ideas/oil), invoke project `as-ideas/oil` and go to `releases` section.
   2. Select the newly created release draft.
   3. Check release title and description and correct it if necessary.
   4. Finalize the release by clicking the `Publish release` button.
4. Check the release on npmjs.com:
   1. Go to [npmjs.org](https://www.npmjs.com/package/@ideasio/oil.js) and check that the new version is available (it may take a while until it's visible).
   2. Check if `https://unpkg.com/@ideasio/oil.js@<new project version number>/dist/latest/` exists and is complete.
5. Check the release on AWS:
   1. Go to [AWS S3](https://s3.console.aws.amazon.com/s3/buckets/oil-cloudfront/rawOil/) and check that the new version is available. 

Congratulations! Your new release is done and ready! :)
