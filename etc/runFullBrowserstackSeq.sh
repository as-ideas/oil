#/bin/bash
echo "- Chrome 14 ---------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e chrome14
echo "- Chrome Recent -----------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e chromeRecent
echo "- IE9 ---------------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e ie9
echo "- Edge --------------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e edge
echo "- Firefox 9 ---------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e firefox9
echo "- Firefox Recent ----------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e firefoxRecent
echo "- Safari 6 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e safari6
echo "- Safari Recent -----------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e safariRecent
echo "- Opera -------------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e opera
echo "- Android 4 ---------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e android4
echo "- iPhone 5 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e iphone5