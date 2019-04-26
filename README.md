
![](https://raw.githubusercontent.com/as-ideas/oil/master/src/assets/images/landing_page/logo_github.png)

# oil.js - Open Source Opt-In Layer

[oil.js](https://www.oiljs.org) is a lightweight consent manager and cookie banner. It is optimized for low latency and performance. It aims to be easy to customize, simple and user-friendly. It supports the IAB framework to forward the consent to ad providers.

[![Latest Release](https://img.shields.io/github/release/as-ideas/oil.svg)](https://oil.axelspringer.com/release/) 
[![npm version](https://img.shields.io/npm/v/@ideasio/oil.js.svg)](https://www.npmjs.com/package/@ideasio/oil.js)
[![Build Status](https://travis-ci.org/as-ideas/oil.svg?branch=master)](https://travis-ci.org/as-ideas/oil)
[![Coverage Status](https://coveralls.io/repos/github/as-ideas/oil/badge.svg?branch=master)](https://coveralls.io/github/as-ideas/oil?branch=master)
[![GPL2 License][license-image]][license-url] 
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fas-ideas%2Foil.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fas-ideas%2Foil?ref=badge_shield)
[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=ZEZMK3M2RXZqUG05enhhME9vVWozbXdSM21XTVNpK1RCS251VkRMOEpudz0tLVQwaEpoaTRLeUxJSU1RaFlkM0ltTkE9PQ==--dc1fc353e7c2404d6cb9cd2887553718d9674f3a)](https://www.browserstack.com/automate/public-build/ZEZMK3M2RXZqUG05enhhME9vVWozbXdSM21XTVNpK1RCS251VkRMOEpudz0tLVQwaEpoaTRLeUxJSU1RaFlkM0ltTkE9PQ==--dc1fc353e7c2404d6cb9cd2887553718d9674f3a)
[Website](https://www.oiljs.org/) | [Full documentation](https://oil.axelspringer.com/docs/last-release) | [Sandbox](https://oil.axelspringer.com/sandbox/) | [Demo-Site with AppNexus](http://www.dieser-ferdinand.de/) | [HTML integration example](https://oil.axelspringer.com/demos/open-source-example.html) | [Release Notes](https://github.com/as-ideas/oil/releases)

##### [current roadmap](ROADMAP.md)

## About oil.js

The OIL project aims for a stable cross-company solution for the challenges the GDPR and new EU ePrivacy Regulation will pose to websites and publishers.

![mobile-demo](https://raw.githubusercontent.com/as-ideas/oil/master/src/assets/images/readme/mobile-demo.gif)

* **Privacy by design & default**: Data privacy opt-in overlay for all users - it supports implicit and explicit modes of consent.
* **Standardized**: Supports the [IAB specification](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework) which defines how a vendor should communicate with a Consent Management Provider (CMP, like oil.js) to gather consent information before running any data processing. That API is a set of JavaScript functions. You can find more at the official website http://advertisingconsent.eu/
* **Cross-Domain** It not only supports domain opt-in (called "Site Opt-In", SOI), but also group-based cross-domain opt-in (called "Power Opt-In", POI) [More info here](#poi-and-soi)
* **Lightweight & fast**: oil.js is less than 20 kB of JavaScript (minified + gzipped) and uses asynchronous loading so that your users won't notice any difference when using it
* **Mobile-friendly and compatible with all modern browsers** Works on 99,9% of all devices and browsers, even IE9 and Android 4
* **AMP Support**: Example integration for amp-consent integration included
* **Easy to customize**: You can change the stylesheet, configure everything or access the functionality directly via Javascript as well
* **User-friendly**: Supports advanced settings with a detailed cookie preference center (CPC)

The Opt-In Layer (OIL) is an offical [Consent Management Provider (CMP)](http://advertisingconsent.eu/cmp-list/) after the IAB Europe "Transparency & Consent Framework". Registered with ID 80.

![iab logo](https://raw.githubusercontent.com/as-ideas/oil/master/src/assets/images/landing_page/iab-logo.png)

## Table of Contents

* [Intro](#about-oiljs)
* [Usage](#usage)
* [Configuration](#configuration)
    * [Hosting](#hosting-it-is-recommended-to-host-all-files-on-your-own-webspace-or-cdn)
    * [Configuration values](#configuration-values)
    * [Labels](#labels)
* [About POI and SOI](#poi-and-soi)
* [Styling](#styling)
* [Development and Contributing](#development-and-contributing)
* [Changelog and releases](https://github.com/as-ideas/oil/releases)
* [Roadmap](ROADMAP.md)
  
## Technical Quality Goals

* OIL will be held compatible with the latest official browser releases, going back to the latest version as listed below and tested on broad range of browsers using [BROWSERSTACK](http://browserstack.com/):
    * Chrome 14 - Latest
    * IE 9 - Latest
    * Firefox 9 - Latest
    * Safari 6 - Latest
    * Opera 12
    * Apple iOS 5.1 - Latest
    * Android 4.4.4 - Latest
* Continously integrated and delivered
* Modular and maintainable solution
* Powered by ![iab logo](https://raw.githubusercontent.com/as-ideas/oil/master/src/assets/images/Browserstack-logo@2x.png)

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
!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=115)}({115:function(e,n,t){"use strict";!function(e,n){e.__cmp||(e.__cmp=function(){function t(e){if(e){var t=!0,r=n.querySelector('script[type="application/configuration"]#oil-configuration');if(null!==r&&r.text)try{var a=JSON.parse(r.text);a&&a.hasOwnProperty("gdpr_applies_globally")&&(t=a.gdpr_applies_globally)}catch(e){}e({gdprAppliesGlobally:t,cmpLoaded:o()},!0)}}function o(){return!(!e.AS_OIL||!e.AS_OIL.commandCollectionExecutor)}var r=[],a=function(n,a,c){if("ping"===n)t(c);else{var i={command:n,parameter:a,callback:c};r.push(i),o()&&e.AS_OIL.commandCollectionExecutor(i)}};return a.commandCollection=r,a.receiveMessage=function(n){var a=n&&n.data&&n.data.__cmpCall;if(a)if("ping"===a.command)t(function(e,t){var o={__cmpReturn:{returnValue:e,success:t,callId:a.callId}};n.source.postMessage(o,n.origin)});else{var c={callId:a.callId,command:a.command,parameter:a.parameter,event:n};r.push(c),o()&&e.AS_OIL.commandCollectionExecutor(c)}},function(n){(e.attachEvent||e.addEventListener)("message",function(e){n.receiveMessage(e)},!1)}(a),function e(){if(!(n.getElementsByName("__cmpLocator").length>0))if(n.body){var t=n.createElement("iframe");t.style.display="none",t.name="__cmpLocator",n.body.appendChild(t)}else setTimeout(e,5)}(),a}())}(window,document)}});
</script>
<script type="text/javascript" src="https://unpkg.com/@ideasio/oil.js/release/current/oil.<version>-RELEASE.min.js"></script>
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
| advanced_settings | Replaces the No Button with an advanced settings button, displaying the Cookie Preference Center. The CPC enables the user to choose their own level of privacy. These settings are stored in the oil cookie (both SOI and POI) as well. | False
| advanced_settings_purposes_default | All purposes in the advanced settings layer should be activated by default | false
| config_version | Specifies the version of your OIL configuration. It will be stored with the consent cookie to track which explicit configuration version consent was granted for.| None
| cookie_domain | Specifies the domain to write the cookie to.  Can be used to set the cookie on a valid parent domain: e.g sub.example.com -> .example.com. | Current hostname
| cookie_expires_in_days | Value in days until the domain cookie used to save the users decision in days | 31
| cpc_type | Specifies the type (the layout) of the Cookie Preference Center. Currently, two types are supported: 'standard' and 'tabs'. Depending on this parameter additional label configuration may be necessary. See section <<Full Label Configuration>> for details. | standard
| customPurposes | Array of custom purposes defined by publisher. IDs for custom purposes may range from 25-88. | None
| customVendorListUrl | Custom vendor list ('non IAB vendors') to use, will be loaded at the same time as the iabVendorList. | None
| default_to_optin | Signal opt-in to vendors while still displaying the Opt-In layer to the end user | false
| gdpr_applies_globally | Flag to indicate that publisher is from the EU, thus showing the OIL layer to every user. The flag is passed to vendors. | true
| iabVendorBlacklist | Array of vendor IDs to exclude. | None
| iabVendorListUrl | URL of the list of vendors to use | https://vendorlist.consensu.org/vendorlist.json
| iabVendorWhitelist | Array of vendor IDs to allow. If it is set, values in `iabVendorBlacklist` are ignored. | None
| locale | Object including locale version, id and labels. You can define the standard labels for all legal texts and buttons and set a version for it. See [here for a configuration example](#texts-locale-object) and [here for all localizable labels](#available-text-labels) | None
| locale_url | As an alternative to passing a locale object, set this to a JSON file with the locale configuration. See [here for an example file](https://github.com/as-ideas/oil/blob/master/test/fixtures/config/deDE_01_locale.json) | None
| persist_min_tracking | If minimum tracking should result in removing all OIL cookies from the users browser and close the layer and store this selection in the oil cookie. | True
| poi_activate_poi | Activates single consent cookie for multiple websites. [See requirements for POI here](#poi--power-opt-in) | false
| poi_group_name | POI group name. POI only affects those sites with the same group name (mandatory if POI is activated). The group name must be valid (existing). | None
| poi_hub_origin | The origin of the hub.js installation | `https://unpkg.com`
| poi_hub_path | The path to the hub.html installation on the origin, if any. | `/@ideasio/oil.js@{oilVersion}/release/current/hub.html`
| preview_mode | The preview mode is useful when testing OIL in a production or live environment. When value is `true`, the layer remains hidden until you manually trigger `window.AS_OIL.previewModeOn()` in your console. Reload, and the layer is displayed. You can hide it again with `window.AS_OIL.previewModeOff()`. | false
| publicPath | The server path from which all chunks and ressources will be loaded. You should upload all released files there and configure it. | `//unpkg.com/@ideasio/oil.js@{oilVersion}/release/current/`
| require_optout_confirm | Flag to activate the opt-out confirmation dialog within the CPC. If set to `true`, additional label definitions (with prefix `label_cpc_purpose_optout`) are required. See the label configuration section in the documentation for details. | false
| show_limited_vendors_only | Flag to only show the vendors limited by `iabVendorWhitelist` or `iabVendorBlacklist` in the CPC | false
| theme | The theme for the layer. By default there are two themes, 'dark' and 'light', with 'light' beeing the default. The theme currently works only as an additional css class. If you want to change the style or theme, please look into the styling guide in the development section. | 'light'
| timeout | Value in seconds until the opt-in layer will be automatically hidden. 0 or lower deactivates auto-hide. | 60

### Texts & Locale Object

The locale object must contain at least "localeId" and "version" along with the localized texts in the `texts` property.
LocaleId and version will be stored with the consent cookie so we can keep track of which explicit text version consent was granted for.
There are three options to pass a locale configuration into your application:

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

* Write your locale object directly to AS_OIL.CONFIG.LOCALE (middle priority)

```javascript
<script>
(function () {
    if (!window.AS_OIL) {
      window.AS_OIL = {};
      window.AS_OIL.CONFIG = {}
    }
    window.AS_OIL.CONFIG.locale = {
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

* Return a JSON object from your server through locale_url configuration parameter (highest priority)

```javascript
<script id="oil-configuration" type="application/configuration">
{
  "timeout": -1,
  "locale_url": "//www.yoursite.com/locale.json"
}
</script>
```

### Available text labels

The full [documentation](https://oil.axelspringer.com/docs/last-release) contains detailed explanations.

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
Labels starting with `label_cpc_purpose_N` are automatically derived from the vendor list if missing from your locale object.

## POI and SOI

### POI – Power Opt-In

In order to retrieve consent and *share it across multiple websites and domains* you will need to activate the __Power Opt-In__ aka POI. 

To instantiate oil.js with POI activated, make up a name for your company group (in the example below `MyGroupName` is used), then follow these steps:

* Setup a server where the consent cookie is stored. For example `any.domain.com`.
* Upload `hub.html` from the `./release` folder, resulting in `https://any.domain.com/hub.html`
* Create a `MyGroupName.json` and upload it in a subfolder named `poi-lists` to your server, resulting in `https://any.domain.com/poi-lists/MyGroupName.json`. Note the file name must be the same as the value passed in poi_group_name. See the [POI-List section](#the-poi-list) for an example.
* Make sure the `MyGroupName.json` is served with the right CORS-headers so that your websites are allowed to read it.
* Add the required parameters to each website configuration that should share the consent cookie:
```javascript
  "poi_activate_poi": true,
  "poi_hub_origin": "//any.domain.com",
  "poi_hub_path": "/hub.html",
  "poi_group_name": "MyGroupName"
```

A single consent cookie will now be shared across sites that use the same `poi_hub_origin` and `poi_group_name` values. You can have multiple groups on the same domain.

You are legally obliged to list all websites/companies belonging to one group.

#### The POI-List

A POI-List file must be a json containing an object with a single property `companyList`. CompanyList must be an array of company names. 

```javascript
{
"companyList":
  [
    "Foo Comp",
    "Bar Inc."
  ]
}
```


### SOI - Single Opt-In

If you want to implement oil.js on a single site you only need the __Site Opt-In__ aka SOI. It stores a user's opt-in permit for the current site only. Default setting. Also known as domain opt-in.

## Styling

The is a detailed section about styling in the documentation. You can edit the design to your likings. Here are some examples:

#### Desktop

<p align="center">
  <img width="400" src="https://raw.githubusercontent.com/as-ideas/oil/master/src/assets/images/readme/example-1.png">
  <img width="400" src="https://raw.githubusercontent.com/as-ideas/oil/master/src/assets/images/readme/example-2.png">
</p>

#### Mobile

<p align="center">
  <img width="290" src="https://raw.githubusercontent.com/as-ideas/oil/master/src/assets/images/readme/example-mobile-1.png">
  <img width="290" src="https://raw.githubusercontent.com/as-ideas/oil/master/src/assets/images/readme/example-mobile-2.png">
</p>

## Changelog

See the [releases](https://github.com/as-ideas/oil/releases) section.


## Development and Contributing

You are welcome to fork the oil.js project and submit pull requests to the master branch.
To contribute, check out the project and set it up like:

    git clone https://github.com/as-ideas/oil.git
    cd oil
    npm install

Detailed information for developers [is found here](https://github.com/as-ideas/oil/blob/master/CONTRIBUTING.md).

You may also wish to check the extended documentation in the `dist/docs/index.html` file after you've cloned the project.


## License

oil.js is freely distributable under the terms of the [GPL v2.0](https://github.com/as-ideas/oil/blob/master/LICENSE).

[license-image]: https://img.shields.io/badge/license-GPLv2-blue.svg?style=flat
[license-url]: LICENSE
