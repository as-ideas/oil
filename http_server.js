/* this file is being used to serve the files from /dist folder. It is being used by heroku */

const express = require('express');
const cors = require('cors');
const serveStatic = require('serve-static');
const compression = require('compression');
// const auth = require('http-auth');

// let basic = auth.basic({realm: 'Project OIL'}, (username, password, callback) => callback(username === 'oil' && password === 'rig'));

// Application setup.
const port = process.argv[2] || process.env.PORT || 8080;
let CACHE_DURATION = 0;
let DOCUMENT_ROOT = __dirname + '/dist';
let corsOptions = {
  'origin': '*',
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  'preflightContinue': false,
  'optionsSuccessStatus': 204,
  'allowedHeaders': ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
};

/*
 * start server
 */
let app = express();

// CORS
app.options(corsOptions, cors()); // include before other routes

// server gzip
app.use(compression());

// simple basic auth
// app.use(auth.connect(basic));

// static with cache headers
app.use(serveStatic(DOCUMENT_ROOT, { maxAge: CACHE_DURATION, cacheControl: true }));

console.log('server is now starting on port ', port);
app.listen(port);
