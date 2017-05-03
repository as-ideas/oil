/* this file is being used to serve the files from /dist folder. It is being used by heroku */

const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');
// const auth = require('http-auth');

// let basic = auth.basic({realm: 'Project OIL'}, (username, password, callback) => callback(username === 'oil' && password === 'rig'));

// Application setup.
const port = process.argv[2] || process.env.PORT || 8080;
let CACHE_DURATION = 0;
let DOCUMENT_ROOT = __dirname + '/dist';

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

/*
 * start server
 */
let app = express();

// CORS
app.use(allowCrossDomain);

// server gzip
app.use(compression());

// simple basic auth
// app.use(auth.connect(basic));

// static with cache headers
app.use(serveStatic(DOCUMENT_ROOT, { maxAge: CACHE_DURATION, cacheControl: true }));

console.log('server is now starting on port ', port);
app.listen(port);
