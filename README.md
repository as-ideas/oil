# oil.js - Open Source Opt-In Layer



## Build Monitoring (works currently only from internal network)
[![Build Status](https://jenkins.ipool.asideas.de/buildStatus/icon?job=OIL-build)](https://jenkins.ipool.asideas.de/job/OIL-build/)
https://github.com/moment/moment/blob/develop/LICENSE

[![GPL2 License][license-image]][license-url] 

## About oil.js

The OIL project aims for a stable cross-company solution for the challenges the GDPR and new EU ePrivacy Regulation will pose to our business.

* Data privacy opt-in overlay for all users of services offered by various Axel Springer brands and/or units
* Supports the [IAB specification](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework) explains how a vendor should communicate with a CMP to gather consent information before running any data processing. That API is a set of JavaScript functions. You can find more at the official website http://advertisingconsent.eu/

* Local opt-in (called "Site Opt-In", SOI) as well as group-based cross-company opt-in (called "Power Opt-In", POI)
* Advanced Settings with Cookie Preference Center (CPC)

The Opt-In Layer (OIL) is an offical link:http://advertisingconsent.eu/iab-europe-transparency-consent-framework-list-of-registered-cmps/[Consent Management Provider (CMP)] after the IAB Europe "Transparency & Consent Framework".

## Technical Quality Goals

* OIL will be held compatible with the latest official browser releases, going back to the latest version as listed below and tested on broad range of browsers using Browserstack.com:
** Chrome 14 - Latest
** IE 9 - Latest
** Firefox 9 - Latest
** Safari 6 - Latest
** Opera 12
** Apple iOS 5.1 - Latest
** Android 4.4.4 - Latest
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
