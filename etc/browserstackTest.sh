#/bin/bash

run_test() {
  echo "..."
  echo "-------------------------"
  echo "試）TESTING $1"
  echo "-----------------------------"
  echo "···"
  ENV_USER=$browserstack_user ENV_KEY=$browserstack_key ./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e $1
}

if [ "$browserstack_user" = "" ]; then
  echo "Enter browserstack user. See https://www.browserstack.com/accounts/settings if you don't have your credentials at hand."
  read browserstack_user
fi
if [ "$browserstack_key" = "" ]; then
  echo "Enter browserstack key"
  read browserstack_key
fi
if [ "$browserstack_key" = "" ] || [ "$browserstack_user" = "" ] ;then
  echo "Both params needed. Exiting."
  exit
fi
