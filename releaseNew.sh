#!/usr/bin/env bash

# This script requires that the following environment variables are defined (for example by your build server):
# - RELEASE_NAME (the name of your release)
# - RELEASE_DESCRIPTION (the description of your release - i.e. release notes)
# - GITHUB_USERNAME
# - GITHUB_PASSWORD
# - NPMJS_USERNAME
# - NPMJS_PASSWORD
# - NPMJS_EMAIL
# - AWS_ACCESS_KEY_ID
# - AWS_SECRET_ACCESS_KEY
# - AWS_REGION
# - AWS_BUCKET
#
# Furthermore, it requires that the following command line interface tools are installed:
# - aws
# - npm
# - curl
# - expect


### Helper functions

function checkEnvironment {
  variable=$1
  if [ "${!variable}" = "" ];
  then
    echo "Error: Necessary environment variable undefined! Please define '$variable'!";
    exit 1
  fi
}

function putS3 {
  path=$1
  file=$2
  aws_path=$3
  aws s3 cp "${path}/${file}" "s3://${AWS_BUCKET}${aws_path}" || exit 1
}

### Configuration
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
GITHUB_REPO_URL=https://api.github.com/repos/as-ideas/oil
AWS_BUCKET_PATH=/rawOil/${PACKAGE_VERSION}


### Main

echo "\n### Checking environment"
checkEnvironment "RELEASE_NAME"
checkEnvironment "RELEASE_DESCRIPTION"
checkEnvironment "GITHUB_USERNAME"
checkEnvironment "GITHUB_PASSWORD"
checkEnvironment "AWS_ACCESS_KEY_ID"
checkEnvironment "AWS_SECRET_ACCESS_KEY"
checkEnvironment "AWS_REGION"
checkEnvironment "AWS_BUCKET"
checkEnvironment "NPMJS_USERNAME"
checkEnvironment "NPMJS_PASSWORD"
checkEnvironment "NPMJS_EMAIL"


echo "\n### Installing dependencies"
npm i || exit 1


echo "\n### Building release" $PACKAGE_VERSION$SNAPSHOT
export SNAPSHOT="-RELEASE";npm run build:release || exit 1


echo "\n### Copying release to release directory"
mkdir release/$PACKAGE_VERSION
cp dist/*.$PACKAGE_VERSION-RELEASE.*.js release/$PACKAGE_VERSION/
cp -r dist/docs release/$PACKAGE_VERSION/


echo "\n### Copying stats.json to release directory"
cp dist/stats.json release/$PACKAGE_VERSION/


echo "\n### Copying hub.html to release directory and versioning it"
cp src/hub.html release/$PACKAGE_VERSION/
HUB_HTML=$(cat release/$PACKAGE_VERSION/hub.html)
HUB_JS=$(cat release/$PACKAGE_VERSION/hub.$PACKAGE_VERSION-RELEASE.min.js)
echo "${HUB_HTML/<!--REPLACEME-->/$HUB_JS}" > release/$PACKAGE_VERSION/hub.html
cp release/$PACKAGE_VERSION/hub.html dist/latest/hub.html


echo "\n### Copying and versioning poi-list to release directory"
cp -r dist/poi-lists release/$PACKAGE_VERSION/
mkdir dist/latest/poi-lists
cp dist/poi-lists/default.json dist/latest/poi-lists/default.json


echo "\n### Increasing patch version"
git add .
git commit -a -m "Adding new release $PACKAGE_VERSION$SNAPSHOT" --no-edit


echo "\n### Creating release on GitHub"
curl -i -u "${GITHUB_USERNAME}:${GITHUB_PASSWORD}" -X POST -d "{
  "tag_name": "${PACKAGE_VERSION}",
  "target_commitish": "master",
  "name": "${RELEASE_NAME}",
  "body": "${RELEASE_DESCRIPTION}",
  "draft": true,
  "prerelease": false
}" "${GITHUB_REPO_URL}/releases" || exit 1


echo "\n### Pushing release to npmjs.com"
expect ./npm_login.sh "${NPMJS_USERNAME}" "${NPMJS_PASSWORD}" "${NPMJS_EMAIL}" || exit 1
npm publish || exit 1
npm logout || exit 1


echo "\n### Uploading release to S3 bucket"
for file in release/${PACKAGE_VERSION}/*.js; do
  putS3 "release/${PACKAGE_VERSION}" "${file##*/}" "${AWS_BUCKET_PATH}/"
done
putS3 "release/${PACKAGE_VERSION}" "hub.html" "${AWS_BUCKET_PATH}/"
