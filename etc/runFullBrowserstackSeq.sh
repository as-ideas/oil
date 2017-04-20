#/bin/bash
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e chrome14
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e chromeRecent
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e ie9
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e edge
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e firefox9
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e firefoxRecent
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e safari6
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e safariRecent
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e opera
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e android4
./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e iphone5