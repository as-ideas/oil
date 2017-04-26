import { activateGlobalOptIn, verifyGlobalOptIn } from "../../src/scripts/goi";
import { loadFixture, deleteAllCookies } from "../utils";

describe('goi', () => {

  let originalTimeout;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    deleteAllCookies();
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  xit('should disable GOI by default', (done) => {
    loadFixture('goi/goi.wrong-iframe.html');
    activateGlobalOptIn();
    verifyGlobalOptIn().then((data) => {
      console.log(data);
      done();
    });
  });

  xit('should disable GOI on config error', (done) => {
    loadFixture('goi/goi.wrong-iframe.html');
    activateGlobalOptIn();
    verifyGlobalOptIn().then((data) => {
      console.log(data);
      done();
    });
  });

  xit('should activate GOI', (done) => {
    loadFixture('goi/goi.default.html');
    activateGlobalOptIn().then(
      verifyGlobalOptIn().then((optin) => {
        expect(optin).toBe(true);
        done();
      })
    );
  });

});
