#/bin/bash
# make sure to start ./BrowserStackLocal --key YOUR_KEY before running this

source etc/browserstackTest.sh

run_test() {
  echo -n "----- Testing local server through Browserstack with browser $1 -"
  if [ "$2" != "" ]; then
    echo " test: $2 -"
  else
    echo " all tests -"
  fi
  ENV_USER=$browserstack_user ENV_KEY=$browserstack_key ./node_modules/.bin/nightwatch -c etc/nightwatch.localhost-remote.conf.js -e $1 $2
}

for argument in "$@"; do
  if [[ $argument =~ browser:.* ]]; then
    browser=${argument#*:} # remove prefix 'browser:'
  else
    testFile=$argument
  fi
done

if [ "$browser" != "" ]; then
  run_test $browser $testFile
else
  run_test chrome14 $testFile
  run_test chrome57 $testFile
  run_test chrome65 $testFile
  run_test ie10 $testFile
  run_test ff58quantum $testFile
  run_test safari91 $testFile

  #run_test iphone5 $testFile # fails weirdly, check later
  #run_test android4 $testFile
fi
