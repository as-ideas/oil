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

  describe('Whitelist', () => {

    it('should return 403 without host', function (done) {
      request(app)
        .get('/demos/complete-integration-site-a.html')
        .end(function (error, response) {
          expect(response.statusCode).to.equal(403);
          done();
        }, 1000);
    });

    it('should return 403 with not whitelisted hosts', function (done) {
      request(app)
        .get('/demos/complete-integration-site-a.html')
        .set({"Referer": "https://www.something.de/"})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(403);
          done();
        }, 1000);
    });

    it('should work with whitelisted hosts', function (done) {
      request(app)
        .get('/demos/complete-integration-site-a.html')
        .set({"Referer": "https://bild.de/"})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });

    it('should work with whitelisted hosts and  be case insensitive', function (done) {
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

  describe('Basic-Auth', () => {
    it('should return 401 without credentials on restricted route /docs', function (done) {
      request(app)
        .get('/docs')
        .set({'Referer': 'http://oilsiteN:8080'})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(401);
          done();
        }, 1000);
    });

    it('should return 401 without credentials on restricted route /examples', function (done) {
      request(app)
        .get('/examples')
        .set({'Referer': 'http://oilsiteN:8080'})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(401);
          done();
        }, 1000);
    });

    it('should return 401 without credentials on restricted route /index.html', function (done) {
      request(app)
        .get('/index.html')
        .set({'Referer': 'http://oilsiteN:8080'})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(401);
          done();
        }, 1000);
    });

    it('should return 401 without credentials on restricted route /', function (done) {
      request(app)
        .get('/')
        .set({'Referer': 'http://oilsiteN:8080'})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(401);
          done();
        }, 1000);
    });

    it('should return 200 without credentials on unrestricted route /assets/images/logo.png', function (done) {
      request(app)
        .get('/assets/images/logo.png')
        .set({'Referer': 'http://oilsiteN:8080'})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });

    it('should return 200 without credentials on unrestricted route /demos', function (done) {
      request(app)
        .get('/demos')
        .set({'Referer': 'http://oilsiteN:8080'})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });

    it('should return 200 without credentials on unrestricted route /oil.' + packageJSON.version + '-SNAPSHOT.min.js', function (done) {
      request(app)
        .get('/oil.' + packageJSON.version + '-SNAPSHOT.min.js')
        .set({'Referer': 'http://oilsiteN:8080'})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });

    it('should return 200 without credentials on unrestricted route /release', function (done) {
      request(app)
        .get('/release')
        .set({'Referer': 'http://oilsiteN:8080'})
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });

    it('should return 200 with credentials on restricted route /docs/full-documentation.html', function (done) {
      request(app)
        .get('/docs/full-documentation.html')
        .set({'Referer': 'http://oilsiteN:8080'})
        .auth(credentials.user, credentials.password)
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });

    it('should return 200 with credentials on restricted route /examples', function (done) {
      request(app)
        .get('/examples')
        .set({'Referer': 'http://oilsiteN:8080'})
        .auth(credentials.user, credentials.password)
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });

    it('should return 200 with credentials on restricted route /index.html', function (done) {
      request(app)
        .get('/index.html')
        .set({'Referer': 'http://oilsiteN:8080'})
        .auth(credentials.user, credentials.password)
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });

    it('should return 200 with credentials on restricted route /', function (done) {
      request(app)
        .get('/')
        .set({'Referer': 'http://oilsiteN:8080'})
        .auth(credentials.user, credentials.password)
        .end(function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
        }, 1000);
    });
  });
});
