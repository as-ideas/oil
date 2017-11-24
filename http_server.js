/* this file is being used to serve the files from /dist folder. It is being used by heroku */

const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');
const serveIndex = require('serve-index');

// import CORS config
const headerConfig = require('./etc/headerConfig');
const whitelist = require('./etc/whitelist');

// let basic = auth.basic({realm: 'Project OIL'}, (username, password, callback) => callback(username === 'oil' && password === 'rig'));

// Application setup.
const port = process.argv[2] || process.env.PORT || 8080;
let CACHE_DURATION = '10m';
let DOCUMENT_ROOT = __dirname + '/dist';

let domainWhitelist = function (req, res, next) {
  let host = req.header("host") || req.header("Host");
  if (isHostInWhitelist(host)) {
    next();
  } else {
    res
      .status(403)
      .send('Host not allowed! Please contact administrator.');
  }
};

function isHostInWhitelist(host) {
  let split = host.split('.');
  let length = split.length;
  if (length >= 2) {
    let domainNameWithEnding = split[length - 2] + '.' + split[length - 1];
    return whitelist.whitelist.includes(domainNameWithEnding);
  } else if (host.startsWith("localhost") || host.startsWith("oilsite") || host.startsWith("oilcdn")) {
    return true;
  }
  return false;
}

// tag::cors-express[]
// end::cors-express[]
let allowCrossDomain = function (req, res, next) {
  //res.header('Content-Security-Policy', 'script-src \'self\' *');
  for (let key in headerConfig.headers) {
    // skip loop if the property is from prototype
    if (!headerConfig.headers.hasOwnProperty(key)) continue;
    // copy header config
    let object = headerConfig.headers[key];
    res.header(key, object);
  }
  next();
};

/*
 * start server
 */
let app = express();

app.use(domainWhitelist);

// CORS
app.use(allowCrossDomain);

// server gzip
app.use(compression());

app.all(allowCrossDomain);

// simple basic auth
// app.use(auth.connect(basic));

// Serve directory indexes folder (with icons)
app.use('/release', serveIndex('release', {'icons': true}));
app.use('/examples', serveIndex('dist/examples', {'icons': true}));

// static with cache headers
app.use(serveStatic(DOCUMENT_ROOT, {maxAge: CACHE_DURATION, cacheControl: true}));

console.log('server is now starting on port ', port);
app.listen(port, '0.0.0.0');

module.exports = app;
