let headers = {
  // tag::cors-config[]
  "Access-Control-Allow-Origin": "http://localhost:8080 | http://localhost:3000 | http://localhost:9001 | http://oilcdn:8080 | http://oilsite1:8080 | http://oilsite2:8080 | http://oilcdn:3000 | http://oilsite1:3000 | http://oilsite2:3000 | http://oil-integration-cdn.herokuapp.com | https://oil-integration-cdn.herokuapp.com",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With, Origin",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  // end::cors-config[]
  //   "p3p": 'CP="NOI ADM DEV PSAi COM NAV OUR OTR STP IND DEM"'
};
module.exports = {
  headers: headers
};
