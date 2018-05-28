'use strict';

let app = require('../../http_server'),
  chai = require('chai'),
  request = require('supertest');
let expect = chai.expect;

let packageJSON = require('../../package.json');

const credentials = {
  user: 'oiluser',
  password: 'ePrivacy'
};

describe('nodejs http server', () => {

  beforeEach(() => {

  });

  it('should add P3P headers on every request', function (done) {
    request(app)
      .get('/demos/complete-integration-site-a.html')
      .set({"Referer": "http://finanzen.net"})
      .end(function (error, response) {
        expect(response.statusCode).to.equal(200);
        expect(response.header.p3p).to.equal('CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"');
        done();
      }, 1000);
  });

  describe('Blacklist', () => {

    it('should return 403 without host', function (done) {
      request(app)
        .get('/demos/complete-integration-site-a.html')
        .end(function (error, response) {
          expect(response.statusCode).to.equal(403);
          done();
        }, 1000);
    });

    it('should return 403 for blacklisted host', function (done) {
      request(app)
        .get('/demos/complete-integration-site-a.html')
        .set({"Referer": "https://www.malign.site/"})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(403);
          done();
        }, 1000);
    });

    it('should return 200 with non-blacklisted hosts', function (done) {
      request(app)
        .get('/demos/complete-integration-site-a.html')
        .set({"Referer": "https://www.something.de/"})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });

    it('should return 200 with non-blacklisted hosts', function (done) {
      request(app)
        .get('/demos/complete-integration-site-a.html')
        .set({"Referer": "https://foo.bar.something.de/"})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });

    it('should work with non-blacklisted host and be case insensitive', function (done) {
      request(app)
        .get('/demos/complete-integration-site-a.html')
        .set({"referer": "http://finanzen.net"})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });

    it('should work with localhost', function (done) {
      request(app)
        .get('/demos/complete-integration-site-a.html')
        .set({"Referer": "http://localhost:8080"})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });

    it('should work with oilsiteN', function (done) {
      request(app)
        .get('/demos/complete-integration-site-a.html')
        .set({"Referer": "http://oilsiteN:8080"})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });
  });
});
