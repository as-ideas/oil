#/bin/bash

run_test() {
  echo "- Testing $1 -"
  ENV_USER=$browserstack_user ENV_KEY=$browserstack_key ./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e $1
}

echo "Enter browserstack user"
read browserstack_user
echo "Enter browserstack key"
read browserstack_key
if [ "$browserstack_key" == "" ] || [ "$browserstack_user" == "" ] ;then
  echo "Both params needed. Exiting."
  exit
fi
