/* this file is being used to serve the files from /dist folder. It is being used by heroku */
var port = process.env.PORT || 8080;

var express = require('express');
var serveStatic = require('serve-static');
var compression = require('compression');
var auth = require('http-auth');
var basic = auth.basic({
        realm: 'Project OIL'
}   , (username, password, callback) => {
        callback(username === 'oil' && password === 'rig');
    }
);

// Application setup.
var CACHE_DURATION = 0;
var DOCUMENT_ROOT = __dirname + '/dist';

/*
 * start server
 */
var app = express();

// server gzip
app.use(compression());

// simple basic auth
app.use(auth.connect(basic));

// static with cache headers
app.use(serveStatic(DOCUMENT_ROOT, { maxAge: CACHE_DURATION, cacheControl: true }));

console.log('server is now starting on port ', port);
app.listen(port);