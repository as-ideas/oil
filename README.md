
![](/src/assets/images/landing_page/logo_github.png)

# oil.js - Open Source Opt-In Layer

Currently in *beta* until 18.06.2018. 

[![Latest Release](https://img.shields.io/github/release/as-ideas/oil.svg)](https://oil.axelspringer.com/release/) 
[![Build Status](https://travis-ci.org/as-ideas/oil.svg?branch=master)](https://travis-ci.org/as-ideas/oil)
[![Coverage Status](https://coveralls.io/repos/github/as-ideas/oil/badge.svg?branch=master)](https://coveralls.io/github/as-ideas/oil?branch=master)
![GZIP SIZE](http://img.badgesize.io/https://oil.axelspringer.com/latest/oil.min.js?compression=gzip&style=flat-square)
[![GPL2 License][license-image]][license-url] 
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fas-ideas%2Foil.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fas-ideas%2Foil?ref=badge_shield)
[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=K0diOE0wb08vMTBzVFNOcFNLQ0NpVTNDdWZOR0JDWStscE84Z1VqOGZUUT0tLU40MEJSQVk3dFJ2RXh1a294S1VJTUE9PQ==--63f8bb4a27933f962a3a17112782edeac545ba77)](https://www.browserstack.com/automate/public-build/K0diOE0wb08vMTBzVFNOcFNLQ0NpVTNDdWZOR0JDWStscE84Z1VqOGZUUT0tLU40MEJSQVk3dFJ2RXh1a294S1VJTUE9PQ==--63f8bb4a27933f962a3a17112782edeac545ba77)

[Website](https://oil.axelspringer.com/) | [Full documentation](https://oil.axelspringer.com/docs/last-release) | [Demo-Site with AppNexus](http://www.dieser-ferdinand.de/) | [HTML integration example](https://oil.axelspringer.com/demos/open-source-example.html) | [Release Notes](https://github.com/as-ideas/oil/releases)

## About oil.js

The OIL project aims for a stable cross-company solution for the challenges the GDPR and new EU ePrivacy Regulation will pose to our business.

* Data privacy opt-in overlay for all users of services offered by various Axel Springer brands and/or units
* Supports the [IAB specification](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework) explains how a vendor should communicate with a CMP to gather consent information before running any data processing. That API is a set of JavaScript functions. You can find more at the official website http://advertisingconsent.eu/

* Local opt-in (called "Site Opt-In", SOI) as well as group-based cross-company opt-in (called "Power Opt-In", POI)
* Advanced Settings with Cookie Preference Center (CPC)

The Opt-In Layer (OIL) is an offical [Consent Management Provider (CMP)](http://advertisingconsent.eu/iab-europe-transparency-consent-framework-list-of-registered-cmps/) after the IAB Europe "Transparency & Consent Framework". Registered with ID 80.

![](/src/assets/images/landing_page/iab-logo.png)

## Table of Contents

* [Intro](#about-oiljs)
* [Usage](#usage)
* [Configuration](#configuration)
    * [Hosting](#hosting-it-is-recommended-to-host-all-files-on-your-own-webspace-or-cdn)
    * [Configuration values](#configuration-values)
    * [Labels](#labels)
* [Development](#development)
* [Changelog and releases](https://github.com/as-ideas/oil/releases)
  
## Technical Quality Goals

* OIL will be held compatible with the latest official browser releases, going back to the latest version as listed below and tested on broad range of browsers using Browserstack.com:
    * Chrome 14 - Latest
    * IE 9 - Latest
    * Firefox 9 - Latest
    * Safari 6 - Latest
    * Opera 12
    * Apple iOS 5.1 - Latest
    * Android 4.4.4 - Latest
* Continously integrated and delivered
* Modular and maintainable solution

## Features

* Customisable UI and text with audit-proof versioning
* Fully configurable (cookie categories, timeouts, ...)
* Easy AB-Testing with extensive events for each user interaction
* AB-Tested in different brand specific designs with 250k unique users
* Supports IAB Europe Standard and additionally custom calls
* Supports Group-Opt-In
* Works with 99,9% of all browsers (in Germany) & Works with all devices and all resolutions
* Optimised for high performance and low latency (build to be loaded first)
* OpenSource
* Tested in the cloud on all possible devices
* Tealium integration and additional features via Tealium like reporting
* Redirect-Fallback for some older browsers and even for disabled 3rd party cookies in Safari
* High quality code with high test coverage and static code analysis
* Loads with low latency and asynchronously for different parts
* Happy path loads only 10.5k (subject to change and further optimization) of gzipped JavaScript
* Easy to implement with open documentation and examples, including dev kit
* With SaaS: Domain White Listing against unauthorized usage

## Usage

There are 3 parts: 

1) Add the CMP stub to your HTML (this makes the loading of a CMP independent from any call by vendors)
2) Add the oil.js configuration to your website
3) Add the script-tag for oil.js to your website


Your custom configuration, this is an incomplete example:

```javascript
<script id="oil-configuration" type="application/configuration">
{
  "timeout": -1,
  "locale": {
    "localeId": "enEN_01",
    "version": 1,
    "texts": {
      "label_intro_heading": "Insider, Inc.",
      "label_intro": "This site uses cookies. By continuing to use this site, closing this banner, or clicking \"I Agree\", you agree to the use of cookies. Read our <a href=\"//www.businessinsider.com/cookies-policy\" target=\"_blank\">cookies policy</a> and <a href=\"//www.businessinsider.com/privacy-policy\" target=\"_blank\">privacy statement</a> for more information."
    }
  }
}
</script>
```

You need to add the CMP stub (a small script which stores all requests until the full script is loaded) and the script itself:

```javascript
<script>
!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=365)}({365:function(e,n,t){"use strict";!function(e,n){e.__cmp||(e.__cmp=function(){function t(){return!(!e.AS_OIL||!e.AS_OIL.commandCollectionExecutor)}(e.attachEvent||e.addEventListener)("message",function(n){e.__cmp.receiveMessage(n)},!1),function e(){if(!(n.getElementsByName("__cmpLocator").length>0))if(n.body){var t=n.createElement("iframe");t.style.display="none",t.name="__cmpLocator",n.body.appendChild(t)}else setTimeout(e,5)}();var o=[],r=function(n,r,a){if("ping"===n)(i=a)&&i({gdprAppliesGlobally:!1,cmpLoaded:t()});else{var c={command:n,parameter:r,callback:a};o.push(c),t()&&e.AS_OIL.commandCollectionExecutor(c)}var i};return r.commandCollection=o,r.receiveMessage=function(e){var n=e&&e.data&&e.data.__cmpCall;n&&o.push({callId:n.callId,command:n.command,parameter:n.parameter,event:e})},r}())}(window,document)}});
</script>
<script type="text/javascript" src="https://oil.axelspringer.com/release/1.1.0/oil.1.1.0-RELEASE.min.js"></script>
```

## Configuration

### Hosting: It is recommended to host all files on your own webspace or CDN!

Here is an [example](https://oil.axelspringer.com/demos/open-source-example.html) how to configure oil.js with selfhosted files. All you need to do is upload the complete content of any release folder, like this folder from [v1.1.2](https://github.com/as-ideas/oil/tree/master/release/1.1.2). All these files are for example uploaded to ``https//your.cdn.com/lib/oil/1.1.2/`` and you can now configure your public path.

### Configuration values

Your configuration is added to your page via a script tag, for example: 

```javascript
<script id="oil-configuration" type="application/configuration">
{
  "timeout": -1,
  "locale": {
    "localeId": "enEN_01",
    "version": 1,
    "texts": {
      "label_intro_heading": "Insider, Inc."
    }
  }
}
</script>
```

For detailed explanations, please visit the [documentation](https://oil.axelspringer.com/docs/last-release).

| Config Parameter | Description | Default Setting |
|----------|---------------|-------|
| locale | The locale version that should be used. The locale defines the standard labels for all legal texts and buttons. <<supported-languages,Supported language packs.>> | deDE_01
| preview_mode | The preview mode is useful when testing OIL in a production or live environment. As a dev you can trigger the overlay by setting a cookie named "oil_preview" with the value "true". This will show the OIL layer on your client. | false
| theme | The theme for the layer. By default there are two themes, 'dark' and 'light', with 'light' beeing the default. The theme currently works only as an additional css class. If you want to change the style or theme, please look into the styling guide in the development section. | 'light'
| poi_activate_poi | Activates or disactivates Power Opt-In. Rememeber that you also have to setup the hub.js part if you do so, or you will endup with a non-working button. | false
| poi_hub_origin | The origin of the hub.js installation, if any. | //oil.axelspringer.com
| poi_hub_path | The path to the hub.html installation on the origin, if any. | /hub.html
| poi_group_name | POI group name. POI only affects those sites with the same group name (mandatory if POI is activated). The group name must be valid (existing). <<supported-poi-groups,Supported POI groups.>> | none
| poi_subscriber_set_cookie | Whether to set the SOI cookie on POI opt-ins or not. | true
| cookie_expires_in_days | Value in days until the domain cookie used to save the users decision in days | 31
| [[config-timeout]]timeout | Value in seconds until the opt-in layer will be automatically hidden. 0 or lower deactivates auto-hide. | 60
| advanced_settings | Replaces the No Button with a advanced settings button, which enables the user to select between different settings of privacy. The results of this selection is stored in the oil cookie (both SOI and POI) as well. | False
| persist_min_tracking | If minimum tracking should result in removing all OIL cookies from the users browser and close the layer and store this selection in the oil cookie. | True
| iabVendorWhitelist | Array of vendor IDs to allow. If it is set, values in `iabVendorBlacklist` are ignored. | None
| iabVendorBlacklist | Array of vendor IDs to exclude. | None
| customPurposes | Array of custom purposes defined by publisher. IDs for custom purposes may range from 25-88. | None
| default_to_optin | Signal opt-in to vendors while still displaying the Opt-In layer to the end user | false
| advanced_settings_purposes_default | All purposes in the advanced settings layer should be activated by default | false

### Labels

The labels are configured in you configuration. There are three options. The "localeId" and the "version" will be stored in the consent information for the user.

* Store your locale object as 'locale' in the oil.js configuration (lowest priority)

```javascript
<script id="oil-configuration" type="application/configuration">
{
  "locale": {
    "localeId": "enEN_01",
    "version": 1,
    "texts": {
      "label_intro_heading": "Insider, Inc."
    }
  }
}
</script>
```

* Write your locale object directly to AS_OIL.LOCALE (middle priority)

```javascript
<script>
(function () {
    if (!window.AS_OIL) {
      window.AS_OIL = {};
    }
    window.AS_OIL.locale = {
      "localeId": "enEN_01",
      "version": 1,
      "texts": {
        "label_intro_heading": "Insider, Inc."
      }
    };
  }()
)
</script>
```

* Override single labels directly as part of the oil.js configuration (highest priority)

```javascript
<script id="oil-configuration" type="application/configuration">
{
  "timeout": -1,
  "label_intro_heading": "Insider, Inc."
}
</script>
```

These are the available labels:

```json
{
  "label_intro_heading": "We use cookies and other technologies",
  "label_intro": "The website uses cookies, web beacons, JavaScript and similar technologies. I agree that <a href=\"javascript:void(0)\" class=\"as-oil__intro-txt--link as-js-companyList\">companies belonging to Axel Springer SE</a> and <a href=\"javascript:void(0)\" class=\"as-oil__intro-txt--link as-js-thirdPartyList\">trusted partners</a> generate pseudonymous user profiles for adapting the website to the user, for market research and for advertising. The generated data can also be shared with third parties while the user profiles cannot be combined with personal data. Detailed information, also on the right to withdraw consent, can be found in the website's privacy policy.",
  "label_button_yes": "OK",
  "label_button_back": "Back",
  "label_button_advanced_settings": "More information",
  "label_cpc_heading": "Please select a privacy setting:",
  "label_cpc_text": "cpc_text",
  "label_cpc_activate_all": "Activate all",
  "label_cpc_deactivate_all": "Deactivate all",
  "label_cpc_purpose_desc": "Purposes",
  "label_cpc_purpose_01_text": "Accessing a Device",
  "label_cpc_purpose_01_desc": "Allow storing or accessing information on a user’s device.",
  "label_cpc_purpose_02_text": "Advertising Personalisation",
  "label_cpc_purpose_02_desc": "Allow processing of a user’s data to provide and inform personalised advertising (including delivery, measurement, and reporting) based on a user’s preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices for that purpose.",
  "label_cpc_purpose_03_text": "Analytics",
  "label_cpc_purpose_03_desc": "Allow processing of a user’s data to deliver content or advertisements and measure the delivery of such content or advertisements, extract insights and generate reports to understand service usage; and/or accessing or storing information on devices for that purpose.",
  "label_cpc_purpose_04_text": "Content Personalisation",
  "label_cpc_purpose_04_desc": "Allow processing of a user’s data to provide and inform personalised content (including delivery, measurement, and reporting) based on a user’s preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices for that purpose.",
  "label_cpc_purpose_05_text": "Matching Data to Offline Sources",
  "label_cpc_purpose_05_desc": "Combining data from offline sources that were initially collected in other contexts",
  "label_cpc_purpose_06_text": "Linking Devices",
  "label_cpc_purpose_06_desc": "Allow processing of a user’s data to connect such user across multiple devices.",
  "label_cpc_purpose_07_text": "Precise Geographic Location data",
  "label_cpc_purpose_07_desc": "Allow processing of a user’s precise geographic location data in support of a purpose for which that certain third party has consent",
  "label_poi_group_list_heading": "Your consent for companies of the group",
  "label_poi_group_list_text": "Here is a list of companies of the group:",
  "label_third_party": "Third Parties",
  "label_thirdparty_list_heading": "Your consent for third party software",
  "label_thirdparty_list_text": "",
  "label_nocookie_head": "In order to be able to provide our services in the best possible way, cookies must be activated in your browser.",
  "label_nocookie_text": "Please activate Cookies in the properties of your Browsers. So you can do it in <a href=\"https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en-GB\" class=\"as-oil__intro-txt--link\" target=\"_blank\">Google Chrome</a> or <a href=\"https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer\" class=\"as-oil__intro-txt--link\" target=\"_blank\">Firefox</a>."
}
```

## Development

### Installation / Build

After 'install' there is a post install step which automatically runs build.

```
npm install
```

### Basic Usage

* Start App locally: `npm start`
* Creating Docs: `npm run build:docs`

### Testing 
#### Unit tests

* Running unit-tests: `npm run test`

There are two kinds of unit tests: For the oil.js itself (``npm run test:unit``) and for the node server delivering all files (``npm run test:node``)

#### E2E tests (Selenium)

* Before testing locally add the following dns entries into your /etc/hosts
```
127.0.0.1	oilsite1
127.0.0.1	oilsite2
127.0.0.1	oilcdn
```

* Running end2end-tests locally: Start app in one terminal `npm start` and then in the next terminal `npm run e2e`
* Running only one test:

    $ ./node_modules/.bin/nightwatch -c etc/nightwatch.local.conf.js -e chrome --test test/e2e/direct_integration_test.js

### Browserstack integration

#### Browserstack build tests

You can run all E2E tests with different setups using Browserstack. Tests use our *remote* server at `https://oil-integration-host1.herokuapp.com` where the latest release is deployed to.

To run tests in batch there are two commands, the first one covering a limited but most relevant selection of browsers.

    $ npm run browserstack
    $ npm run browserstack:full

*Both commands require you to have your Browserstack credentials ready.* You can find them [here](https://www.browserstack.com/accounts/settings).

To test with only a specific browser, do this:

    $ ENV_USER=your-browserstack-user ENV_KEY=your-browserstack-key ./node_modules/.bin/nightwatch -c etc/nightwatch.remote.conf.js -e ff52

The `-e` parameter should contain the id of the test setting to launch with. In this case `ff52`. For all available test settings check the objects inside the file `etc/nightwatch.remote.config.js`

#### Browserstack dev tests

You can run e2e tests against your local http://localhost:8080/ with BrowserStack.
To do this, download (BrowserStackLocal)[https://www.browserstack.com/local-testing]. Create a build with `npm run build` and finally start the server with `npm start`. Finally, get your browserstack credentials and run (for chrome57):

    $ ENV_USER=your-browserstack-user ENV_KEY=your-browserstack-key ./node_modules/.bin/nightwatch -c etc/nightwatch.localhost-remote.conf.js -e chrome57

For possible test settings see above section.

#### Advanced Usage

``npm run build:release`` creates an app version that loads its parts from oil.axelspringer.com/release/*.min.js

The releases are build with a bash script via ``./release.sh``.

This should be used in production.

#### debug logging

NODE_DEBUG=oil-debug npm run ...

### Creating and editing documentation

We are using [AsciiDoc](http://asciidoctor.org/docs/asciidoc-syntax-quick-reference/) to create and edit the documentation. You can find the sources und ``docs/`` and can create the HTML (``dist/docs``) with ``npm run build:docs``.

### Changelog

see the [releases](https://github.com/as-ideas/oil/releases) section.

## License

oil.js is freely distributable under the terms of the [GPL v2.0](https://github.com/as-ideas/oil/blob/master/LICENSE).

[license-image]: https://img.shields.io/badge/license-GPLv2-blue.svg?style=flat
[license-url]: LICENSE
