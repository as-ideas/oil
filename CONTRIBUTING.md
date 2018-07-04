# Contributing to oil.js

Feel free to fork this project and [open pull requests](#submitting-a-pull-request) to the master branch. We do not accept pull requests to the source files without accompanying tests.
Bug reports are welcome through the issues tab of the project.

## Installation / Build

### Setting up development environment

To begin with, fork the library and install dependencies. You need
[git](http://git-scm.com/) and
[node](http://nodejs.org/); you might use
[nvm](https://github.com/creationix/nvm) or
[nenv](https://github.com/ryuone/nenv) to install node.

Run these commands in order to create a local copy of the project:

    git clone https://github.com/as-ideas/oil.git
    cd oil
    npm install

After `install` there is a post install step which automatically runs build.


## Basic Usage

Start the app with this command:

    npm start

You will now be able to view a local test server at `http://localhost:8080/`. The html files from `src/demos` are now accessible through `http://localhost:8080/demos/direct-integration.html`.

For development you want to run a local webpack-dev-server at `http://localhost:3000/` with webpack auto-watching for changes to the source files:

    npm run watch

This test server serves the html files from `src/demos` under the path `webpack-dev-server`. So if for instance you are going for a change in the small-design.html you want to open the URL `http://localhost:3000/webpack-dev-server/demos/small-design.html`

See the [full list of available npm scripts here](#npm-scripts)

### window.AS_OIL

A successfully integrated oil.js puts an object into your window named `AS_OIL` which provides a range of methods you can call to mimic user behaviour. It also stores the configuration and the locale object.

```javascript
// current configuration
window.AS_OIL.CONFIG;
// current locale configuration
window.AS_OIL.CONFIG.locale;

// functions
window.AS_OIL.status() 
window.AS_OIL.triggerOptIn() 
window.AS_OIL.triggerSoiOptIn() 
window.AS_OIL.triggerPoiOptIn() 
window.AS_OIL.triggerOptOut()
window.AS_OIL.getVendorConsents()
window.AS_OIL.getPublisherConsents()
window.AS_OIL.getConsentData()
window.AS_OIL.getVendorList()
window.AS_OIL.setGdprApplies()

```


### Dev-Kit

On some demo pages there's a little oil rig icon in the top right corner. Clicking it opens a menu where you can check the return values from the Oil instance as well as more options where you can opt-in, opt-out etc.

You can also run commands on the window.AS_OIL_DEV_KIT object, like:

```javascript
window.AS_OIL_DEV_KIT.status() 
window.AS_OIL_DEV_KIT.triggerOptIn() 
window.AS_OIL_DEV_KIT.triggerSoiOptIn() 
window.AS_OIL_DEV_KIT.triggerPoiOptIn() 
window.AS_OIL_DEV_KIT.triggerOptOut()
window.AS_OIL_DEV_KIT.getVendorConsents()
window.AS_OIL_DEV_KIT.getPublisherConsents()
window.AS_OIL_DEV_KIT.getConsentData()
window.AS_OIL_DEV_KIT.getVendorList()

```


## Tests

Running unit tests:

    npm test

There are two kinds of unit tests: For the oil.js itself (`npm run test:unit`) and for the node server delivering all files (`npm run test:node`).

    npm run test:unit
    npm run test:node


#### E2E Tests

For local tests utilising Selenium Webdriver add the following DNS entries into your `/etc/hosts` file:

    127.0.0.1 oilsite1
    127.0.0.1 oilsite2
    127.0.0.1 oilcdn

If you made changes to your files, run `npm run build`. Then start the app in one terminal window with:

    npm start

and then in another terminal:

    npm run e2e

If you want to run only one test, in this example only tests from the file `test/e2e/direct_integration_test.js`, do this:

    ./node_modules/.bin/nightwatch -c etc/nightwatch.local.conf.js -e chrome --test test/e2e/direct_integration_test.js

You can also run your local e2e tests with different browsers using [Browserstack](#browserstack-integration).


### NPM scripts

| Script | Description |
| ------ | ----------- |
| build | generate a complete build in `dist` folder |
| build:docs | compile documentation files into `dist/docs` folder |
| build:watch | start webpack-dev-server on `http://localhost:8080/` where files from the `dist` server are served and hotload on file change |
| watch | start webpack-dev-server on `http://localhost:3000/` and hotload on file change |
| eslint | Do the linting thing |
| browserstack | Run e2e tests with selected browser's against test installation at `https://oil-integration-host1.herokuapp.com`. For profiles used see file `etc/runBrowserstackSeq.sh` |
|  browserstack:full | Run e2e tests with selected browser's against test installation at `https://oil-integration-host1.herokuapp.com`. For profiles used see file `etc/runFullBrowserstackSeq.sh` |
| browserstack:remote-localhost | Run e2e tests with selected browser's against your localhost. [See details on this here](#browserstack-dev-tests) |
| e2e | Run E2E tests with Chrome Headless browser. Remember to run a webserver with `npm start` in another terminal window before starting this. |
| e2esafari | Run E2E tests with Safari. Remember to run a webserver with `npm start` in another terminal window before starting this. |
| test:unit | Run the unit tests |
| test:node | Run the server tests |
| test:selenium | Run the E2E tests against the integration CDN |
| test:watch | Run the tests and re-run on file update |

For an exhausting list just do `npm run`.

### Browserstack integration

#### Browserstack build tests

You can run all E2E tests with different setups using Browserstack. Tests use our remote server at `https://oil-integration-host1.herokuapp.com` where the latest release is deployed to.

To run tests in batch there are two commands, the first one covering a limited but most relevant selection of browsers.

    npm run browserstack
    npm run browserstack:full

*Both commands require you to have your Browserstack credentials ready.* You can find them [here](https://www.browserstack.com/accounts/settings).

To test with only a specific browser, do this:

    ENV_USER=your-browserstack-user ENV_KEY=your-browserstack-key ./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e ff52

The `-e` parameter should contain the id of the test setting to launch with. In this case `ff52`. For all available test settings check the objects inside the file `etc/nightwatch.remote.config.js`

#### Browserstack dev tests

You can run the tests on your local http://localhost:8080/ in different browsers using BrowserStack.
To do this, download [BrowserStackLocal](https://www.browserstack.com/local-testing), install and run the application. Create a build with `npm run build` and start the server with `npm start`. Finally, get your browserstack credentials and run (for chrome57):

    ENV_USER=your-browserstack-user ENV_KEY=your-browserstack-key ./node_modules/.bin/nightwatch -c etc/nightwatch.localhost-remote.conf.js -e chrome57

For possible test settings see above section.

To run tests in batch trigger this command:

    npm run browserstack:remote-localhost


#### debug logging

    NODE_DEBUG=oil-debug npm run ...


### Creating and editing documentation

We are using [AsciiDoc](http://asciidoctor.org/docs/asciidoc-syntax-quick-reference/) to create and edit the documentation. You can find the sources und ``docs/`` and can create the HTML (``dist/docs``) with ``npm run build:docs``.


## Submitting a pull request

Before submission, run the tests:

    npm run test

If they're all green, great! Go ahead and submit the PR. 
