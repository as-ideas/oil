#/bin/bash
echo "- Chrome Recent -----------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e chromeRecent
echo "- IE9 ---------------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e ie9
echo "- Firefox Recent ----------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e firefoxRecent
echo "- Safari Recent -----------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e safariRecent
echo "- Android 4 ---------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e android4
echo "- iPhone 5 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e iphone5
