#/bin/bash
echo "- Chrome Recent -----------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e chromeRecent
echo "- IE9 ---------------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e ie9
echo "- Edge --------------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e edge
echo "- Firefox Recent ----------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e firefoxRecent
echo "- Safari Recent -----------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e safariRecent
echo "- Opera -------------------------------------------------------------------"
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e opera