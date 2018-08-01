#!/usr/bin/env bash
#/bin/bash
# make sure to start ./BrowserStackLocal --key YOUR_KEY before running this

source etc/browserstackTest.sh

run_test() {
  echo "----- Testing local server through Browserstack with browser $1 -"
  ENV_USER=$browserstack_user ENV_KEY=$browserstack_key ./node_modules/.bin/nightwatch -c etc/nightwatch.localhost-remote.conf.js -e $1
}

run_test chrome57
run_test ie10
run_test ff58quantum
run_test safari91

# run_test iphone5 # fails weirdly, check later
# run_test android4

