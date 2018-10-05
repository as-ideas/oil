#!/usr/bin/env bash

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
  aws s3 cp "${path}/${file}" "s3://${AWS_BUCKET}${aws_path}"
}

### Main

## Configuration
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
AWS_BUCKET_PATH=/rawOil/${PACKAGE_VERSION}

## Check S3 parameters
checkEnvironment "AWS_ACCESS_KEY_ID"
checkEnvironment "AWS_SECRET_ACCESS_KEY"
checkEnvironment "AWS_REGION"
checkEnvironment "AWS_BUCKET"

## Perform upload
echo "\n### Uploading release to S3 bucket"
for file in release/${PACKAGE_VERSION}/*.js; do
  putS3 "release/${PACKAGE_VERSION}" "${file##*/}" "${AWS_BUCKET_PATH}/"
done
putS3 "release/${PACKAGE_VERSION}" "hub.html" "${AWS_BUCKET_PATH}/"
putS3 "release/${PACKAGE_VERSION}/poi-lists" "default.json" "${AWS_BUCKET_PATH}/poi-lists/"
