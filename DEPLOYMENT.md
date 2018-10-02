# How to deploy oil.js

Deployment of oil.js requires the following steps:

1. Prepare the new release:
   1. Finalize all changes that are intended to be part of the new release.
   2. Ensure that `version` entry in `package.json` is set to the project version number of the new release that is to be created.
   3. Commit all changes on `master` branch and push them to GitHub.
2. Build the new release:
   1. Invoke job `OIL-release-build` on Jenkins (tab `OIL Project`) with parameter `RELEASE_NAME`. The job must be successful to continue with the next step. 
3. Finalize the new release on GitHub:
   1. Go to [GitHub](https://github.com/as-ideas/oil), invoke project `as-ideas/oil` and go to `releases` section.
   2. Select the newly created release draft.
   3. Check release title and write description.
   4. Finalize the release by clicking the `Publish release` button.
4. Check the release on npmjs.com:
   1. Go to [npmjs.org](https://www.npmjs.com/package/@ideasio/oil.js) and check that the new version is available (it may take a while until it's visible).
   2. Check if `https://unpkg.com/@ideasio/oil.js@<new project version number>/release/current/` exists and is complete.
5. Check the release on AWS:
   1. Go to [AWS S3](https://s3.console.aws.amazon.com/s3/buckets/oil-cloudfront-live/rawOil/) and check that the new version is available. 

Congratulations! Your new release is done and ready! :)
