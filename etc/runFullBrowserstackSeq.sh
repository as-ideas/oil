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
echo "- chrome14Win7----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e chrome14Win7
echo "- chrome40Win81 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e chrome40Win81
echo "- IE8Win7 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e IE8Win7
echo "- FF9Win7 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e FF9Win7
echo "- FF35Win81 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e FF35Win81
echo "- Opera1215Win81 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e Opera1215Win81
echo "- Safari71 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e Safari71
echo "- Safari8 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e Safari8
echo "- Safari91 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e Safari91
echo "- iphone5s_ios6 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e iphone5s_ios6
echo "- ipad4_ios7 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e ipad4_ios7
echo "- iphone6_ios83 ----------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e iphone6_ios83