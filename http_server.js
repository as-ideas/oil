/* this file is being used to serve the files from /dist folder. It is being used by heroku */
const port = process.env.PORT || 8080;

const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');
const auth = require('http-auth');

let basic = auth.basic({realm: 'Project OIL'}, (username, password, callback) => callback(username === 'oil' && password === 'rig'));

// Application setup.
let CACHE_DURATION = 0;
let DOCUMENT_ROOT = __dirname + '/dist';

/*
 * start server
 */
let app = express();

// server gzip
app.use(compression());

// simple basic auth
app.use(auth.connect(basic));

// static with cache headers
app.use(serveStatic(DOCUMENT_ROOT, { maxAge: CACHE_DURATION, cacheControl: true }));

console.log('server is now starting on port ', port);
app.listen(port);
