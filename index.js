const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');

const port = process.argv[2] || process.env.PORT || 8080;

let CACHE_DURATION = '10m';
let DOCUMENT_ROOT = __dirname + '/dist';


// start server
let app = express();
app.use(compression());
app.use(serveStatic(DOCUMENT_ROOT, {maxAge: CACHE_DURATION, cacheControl: true}));
console.log('server is now starting on port ', port);
app.listen(port, '0.0.0.0');

module.exports = app;
