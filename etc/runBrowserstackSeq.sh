#/bin/bash
echo "- Chrome 57 ---------------------------------------------------------------"
# ./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e chrome57
echo "- IE9 ---------------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e ie9
echo "- Firefox 9 ---------------------------------------------------------------"
# ./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e ff9
echo "- Firefox 52 --------------------------------------------------------------"
# ./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e ff52
echo "- Safari91 ----------------------------------------------------------------"
# ./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e safari91
echo "- iPhone 5 ----------------------------------------------------------------"
# ./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e iphone5 # fails weirdly, check later
#echo "- Android 4 ---------------------------------------------------------------"
#./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e android4

