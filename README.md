
![](/src/assets/images/landing_page/logo_github.png)

# oil.js - Open Source Opt-In Layer

Build Monitoring (works currently only from internal network)

[![Build Status](https://jenkins.ipool.asideas.de/buildStatus/icon?job=OIL-build)](https://jenkins.ipool.asideas.de/job/OIL-build/)

[![GPL2 License][license-image]][license-url] 

[Website](https://oil.axelspringer.com/) | [Full documentation](https://oil.axelspringer.com/docs) | [Demo-Site with AppNexus](http://www.dieser-ferdinand.de/) | [HTML integration example](https://oil.axelspringer.com/demos/open-source-example.html)

## About oil.js

The OIL project aims for a stable cross-company solution for the challenges the GDPR and new EU ePrivacy Regulation will pose to our business.

* Data privacy opt-in overlay for all users of services offered by various Axel Springer brands and/or units
* Supports the [IAB specification](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework) explains how a vendor should communicate with a CMP to gather consent information before running any data processing. That API is a set of JavaScript functions. You can find more at the official website http://advertisingconsent.eu/

* Local opt-in (called "Site Opt-In", SOI) as well as group-based cross-company opt-in (called "Power Opt-In", POI)
* Advanced Settings with Cookie Preference Center (CPC)

The Opt-In Layer (OIL) is an offical link:http://advertisingconsent.eu/iab-europe-transparency-consent-framework-list-of-registered-cmps/[Consent Management Provider (CMP)] after the IAB Europe "Transparency & Consent Framework".

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

# Usage

You need to add the CMP stub (a small script which stores all requests until the full script is loaded) and the script itself:

```javascript
<script>
!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=366)}({366:function(e,n,t){"use strict";!function(e,n){e.__cmp||(e.__cmp=function(){function t(){return!(!e.AS_OIL||!e.AS_OIL.commandCollectionExecutor)}(e.attachEvent||e.addEventListener)("message",function(n){e.__cmp.receiveMessage(n)},!1),function e(){if(!(n.getElementsByName("__cmpLocator").length>0))if(n.body){var t=n.createElement("iframe");t.style.display="none",t.name="__cmpLocator",n.body.appendChild(t)}else setTimeout(e,5)}();var o=[],r=function(n,r,c){var a;"ping"===n?(a=c)&&a({gdprAppliesGlobally:!1,cmpLoaded:t()}):(o.push({command:n,parameter:r,callback:c}),t()&&e.AS_OIL.commandCollectionExecutor())};return r.commandCollection=o,r.receiveMessage=function(e){var n=e&&e.data&&e.data.__cmpCall;n&&o.push({callId:n.callId,command:n.command,parameter:n.parameter,event:e})},r}())}(window,document)}});
</script>
<script type="text/javascript" src="https://oil.axelspringer.com/release/1.1.0/oil.1.1.0-RELEASE.min.js"></script>
```

And you need your custom configuration:

```javascript
<script id="oil-configuration" type="application/configuration">
  {
    "activate_poi": true,
    "poi_group_name": "axelSpringerSe_01",
    "locale": "enEN_01"
  }
</script>
```

# Configuration (WIP)

## Configuration values

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

## Labels

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
  "label_thirdparty_list_heading": "Your consent for third party software",
  "label_thirdparty_list_text": "",
  "label_nocookie_head": "In order to be able to provide our services in the best possible way, cookies must be activated in your browser.",
  "label_nocookie_text": "Please activate Cookies in the properties of your Browsers. So you can do it in <a href=\"https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en-GB\" class=\"as-oil__intro-txt--link\" target=\"_blank\">Google Chrome</a> or <a href=\"https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer\" class=\"as-oil__intro-txt--link\" target=\"_blank\">Firefox</a>."
}
```

## Full documentatin example

tbd.

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

#### Advanced Usage

npm run build:release creates an app version that loads its parts
from oil.axelspringer.com/release/*.min.js

This should be used in production.

#### debug logging

NODE_DEBUG=oil-debug npm run ...

### Documentation

see http://asciidoctor.org/docs/asciidoc-syntax-quick-reference/


### Changelog

see CHANGELOG.md

tool: https://github.com/lob/generate-changelog

## License

oil.js is freely distributable under the terms of the [GPL v2.0](https://github.com/as-ideas/oil/blob/master/LICENSE).

[license-image]: https://img.shields.io/badge/license-GPLv2-blue.svg?style=flat
[license-url]: LICENSE
