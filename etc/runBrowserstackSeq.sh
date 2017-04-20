#/bin/bash
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e chromeRecent
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e ie9
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e edge
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e firefoxRecent
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e safariRecent
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e opera