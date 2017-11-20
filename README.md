# Opt in Layer

## Build Monitoring
[![Build Status](https://jenkins.ipool.asideas.de/buildStatus/icon?job=OIL-build)](https://jenkins.ipool.asideas.de/job/OIL-build/)

## Installation

```
npm install
```



## Usage

### Basic Usage

* Start App locally: `npm start`
* Running unit-tests: `npm run test`
* Running end2end-tests locally: Start app in one terminal `npm start` and then in the next terminal `npm run e2e`
* Creating Docs: `npm run build:docs`

* Before testing locally add the following dns entries into your /etc/hosts
```
127.0.0.1	oilsite1
127.0.0.1	oilsite2
127.0.0.1	oilcdn
```

### Advanced Usage

### debug logging

NODE_DEBUG=oil-debug npm run ...


## Documentation

### Install ASC
```
sudo gem install asciidoctor
```

see http://asciidocfx.com/#truehow-to-install-asciidocfx

### Generate documentation

see http://asciidoctor.org/docs/asciidoc-syntax-quick-reference/
