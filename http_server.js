/* this file is being used to serve the files from /dist folder. It is being used by heroku */

const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');
// import CORS config
// const cors = require('cors');
const corsConfig = require('./etc/corsConfig');
const p3p = require('p3p');

// let basic = auth.basic({realm: 'Project OIL'}, (username, password, callback) => callback(username === 'oil' && password === 'rig'));

// Application setup.
const port = process.argv[2] || process.env.PORT || 8080;
let CACHE_DURATION = 0;
let DOCUMENT_ROOT = __dirname + '/dist';

// tag::cors-express[]
// end::cors-express[]
let allowCrossDomain = function (req, res, next) {
  //res.header('Content-Security-Policy', 'script-src \'self\' *');
  for (key in corsConfig.headers) {
    // skip loop if the property is from prototype
    if (!corsConfig.headers.hasOwnProperty(key)) continue;
    // copy header config
    let object = corsConfig.headers[key];
    res.header(key, object);
  }
  next();
};

/*
 * start server
 */
let app = express();

// CORS
app.use(allowCrossDomain);
//app.use(p3p(p3p.recommended)); // needed?

// server gzip
app.use(compression());

app.all(allowCrossDomain);

// simple basic auth
// app.use(auth.connect(basic));

// static with cache headers
app.use(serveStatic(DOCUMENT_ROOT, { maxAge: CACHE_DURATION, cacheControl: true }));

console.log('server is now starting on port ', port);
app.listen(port, '0.0.0.0');
