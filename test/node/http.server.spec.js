'use strict';

let app = require('../../http_server'),
  chai = require('chai'),
  request = require('supertest');
let expect = chai.expect;

describe('nodejs http server', () => {

  beforeEach(() => {

  });

  it('should add P3P headers on every request', function (done) {
    request(app)
      .get('/demos/complete-integration-site-a.html')
      .set({"host": "finanzen.net"})
      .end(function (error, response) {
        expect(response.statusCode).to.equal(200);
        expect(response.header.p3p).to.equal('CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"');
        done();
      }, 1000);
  });

  it('should work with whitelisted hosts', function (done) {
    request(app)
      .get('/demos/complete-integration-site-a.html')
      .set({"host": "finanzen.net"})
      .end(function (error, response) {
        expect(response.statusCode).to.equal(200);
        done();
      }, 1000);
  });

  it('should work with whitelisted hosts and ignore header case', function (done) {
    request(app)
      .get('/demos/complete-integration-site-a.html')
      .set({"Host": "finanzen.net"})
      .end(function (error, response) {
        expect(response.statusCode).to.equal(200);
        done();
      }, 1000);
  });

  it('should work with localhost', function (done) {
    request(app)
      .get('/demos/complete-integration-site-a.html')
      .set({"host": "localhost:8080"})
      .end(function (error, response) {
        expect(response.statusCode).to.equal(200);
        done();
      }, 1000);
  });

  it('should work with oilsiteN', function (done) {
    request(app)
      .get('/demos/complete-integration-site-a.html')
      .set({"host": "oilsiteN:8080"})
      .end(function (error, response) {
        expect(response.statusCode).to.equal(200);
        done();
      }, 1000);
  });

  it('should return 403 with not whitelisted hosts', function (done) {
    request(app)
      .get('/demos/complete-integration-site-a.html')
      .set({"host": "bild.de"})
      .end(function (error, response) {
        expect(response.statusCode).to.equal(403);
        done();
      }, 1000);
  });
});
