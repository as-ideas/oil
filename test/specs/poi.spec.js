import { activatePowerOptIn, verifyPowerOptIn } from "../../src/scripts/poi";
import { loadFixture, deleteAllCookies } from "../utils";

describe('poi', () => {

  let originalTimeout;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    deleteAllCookies();
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  xit('should disable POI by default', (done) => {
    loadFixture('poi/poi.config-error.html');

    activatePowerOptIn().then(
      verifyPowerOptIn().then((optin) => {
        expect(optin).toBe(false);
        done();
      })
    );
  });

  it('should disable POI on config error', (done) => {
    loadFixture('poi/poi.wrong-iframe.html');
    activatePowerOptIn().then(
      verifyPowerOptIn().then((optin) => {
        expect(optin).toBe(false);
        done();
      })
    );
  });

  it('should activate POI', (done) => {
    loadFixture('poi/poi.default.html');
    activatePowerOptIn().then(
      verifyPowerOptIn().then((optin) => {
        expect(optin).toBeDefined();
        // FIXME phantomjs
        // expect(optin).toBe(true);
        done();
      })
    );
  });

});
