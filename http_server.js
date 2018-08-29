/* this file is being used to serve the files from /dist folder. It is being used by heroku */
const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');
const serveIndex = require('serve-index');
const url = require('url');
const morgan = require('morgan');
const cors = require('cors');

// import CORS config
const headerConfig = require('./etc/headerConfig');
const blacklist = require('./etc/blacklist');
// Application setup.
const port = process.argv[2] || process.env.PORT || 8080;

let CACHE_DURATION = '10m';
let DOCUMENT_ROOT = __dirname + '/dist';

let domainBlacklist = function (req, res, next) {
  let referer = req.header("Referer") || req.header("referer");
  if (isBlacklisted(referer)) {
    res
      .status(403)
      .send('Host from referer not allowed! Please contact administrator.');
  } else {
    next();
  }
};

function isBlacklisted(referer) {
  if(!referer) {
    return false;
  }
  const parts = url.parse(referer).host.split(".");

  if(parts.length > 1) {
    const domainNameWithEnding = parts.splice(-2).join(".");
    return blacklist.blacklist.includes(domainNameWithEnding);
  }
  return !parts[0].match(/^(oilcdn|oilsite|localhost)/);
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
// access log *this configuration must be defined before of the path configuration
app.use(morgan('combined'));
app.use(domainBlacklist);

app.use(additionalHeaders);

app.post("/amp-consent.json", function(req, res){
  res.send('{"promptIfUnknown": true}');
});
// server gzip
app.use(compression());

// Serve directory indexes folder (with icons)
app.use('/release', serveIndex('release', {'icons': true}));
app.use('/demos', cors(), serveIndex('dist/demos', {'icons': true}));

// static with cache headers
app.use(serveStatic(DOCUMENT_ROOT, {maxAge: CACHE_DURATION, cacheControl: true}));
console.log('server is now starting on port ', port);
app.listen(port, '0.0.0.0');

module.exports = app;
