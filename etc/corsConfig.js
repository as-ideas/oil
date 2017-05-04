let headers =
// tag::cors-config[]
{
    "Access-Control-Allow-Origin": "*",
    "Access-Control": "allow *",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
}
// end::cors-config[]
module.exports = {
  headers: headers
}
