/* this file is being used to serve the files from /dist folder. It is being used by heroku */

const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');
const serveIndex = require('serve-index');
const url = require('url');

// import CORS config
const headerConfig = require('./etc/headerConfig');
const whitelist = require('./etc/whitelist');
// Application setup.
const port = process.argv[2] || process.env.PORT || 8080;

let CACHE_DURATION = '10m';
let DOCUMENT_ROOT = __dirname + '/dist';

let domainWhitelist = function (req, res, next) {
  let host = req.header("Referer") || req.header("referer");
  if (host && isHostInWhitelist(host)) {
    next();
  } else {
    res
      .status(403)
      .send('Host from referer not allowed! Please contact administrator.');
  }
};

function isHostInWhitelist(referer) {
  let host = url.parse(referer).host;

  let split = host.split('.');
  let length = split.length;
  if (length >= 2) {
    let domainNameWithEnding = split[length - 2] + '.' + split[length - 1];
    console.info('domainNameWithEnding', domainNameWithEnding);
    return whitelist.whitelist.includes(domainNameWithEnding);
  }
  else if (host.startsWith("localhost") || host.startsWith("oilsite") || host.startsWith("oilcdn")) {
    return true;
  }
  return false;
}

let additionalHeaders = function (req, res, next) {
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

app.use(additionalHeaders);

// server gzip
app.use(compression());

// Serve directory indexes folder (with icons)
app.use('/release', serveIndex('release', {'icons': true}));
app.use('/examples', serveIndex('dist/examples', {'icons': true}));
app.use('/demos', serveIndex('dist/demos', {'icons': true}));

// static with cache headers
app.use(serveStatic(DOCUMENT_ROOT, {maxAge: CACHE_DURATION, cacheControl: true}));
app.use('/devExamples', express.static('src/examples'));

app.use('/devExamples', serveIndex('src/examples', {'icons': true}));

console.log('server is now starting on port ', port);
app.listen(port, '0.0.0.0');

module.exports = app;
