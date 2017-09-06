import request from 'supertest';

describe('nodejs http server', () => {

  beforeEach(() => {
  });

  it('should add headers on requests', () => {
    request(app)
      .get('/help')
      .expect(200)
      .end(function (err, res) {
        let result = JSON.parse(res.text);
        done();
      });
  });
});
