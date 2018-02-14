# Opt in Layer

## Build Monitoring
[![Build Status](https://jenkins.ipool.asideas.de/buildStatus/icon?job=OIL-build)](https://jenkins.ipool.asideas.de/job/OIL-build/)

## Installation

```
npm install
```

## Preparation

* Before testing locally add the following dns entries into your /etc/hosts
```
127.0.0.1	oilsite1
127.0.0.1	oilsite2
127.0.0.1	oilcdn
```

## Usage

### Basic Usage

* Start App locally: `npm start`
* Running unit-tests: `npm run test`
* Running end2end-tests locally: Start app in one terminal `npm start` and then in the next terminal `npm run e2e`
* Creating Docs: `npm run build:docs`

### Advanced Usage
npm run build:release creates an app version that loads its parts
from oil.axelspringer.com/release/*.min.js

This should be used in production.

### debug logging

NODE_DEBUG=oil-debug npm run ...


## Documentation

see http://asciidoctor.org/docs/asciidoc-syntax-quick-reference/
