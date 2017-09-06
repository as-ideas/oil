import { activatePowerOptInWithIFrame, verifyPowerOptIn } from '../../src/scripts/poi';
import { loadFixture, deleteAllCookies } from '../utils';
import { resetConfiguration } from '../../src/scripts/config';

describe('poi', () => {

  let originalTimeout;

  beforeEach(() => {
    resetConfiguration();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    deleteAllCookies();
    // remove every existing frame
    if (document.getElementById('oil-frame')) {
      document.getElementById('oil-frame').remove();
    }
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should disable POI by default', (done) => {
    loadFixture('poi/poi.config-error.html');

    activatePowerOptInWithIFrame().then(() => verifyPowerOptIn().then((optin) => {
        expect(optin).toBe(false);
        done();
      })
    );
  });

  it('should disable POI on config error', (done) => {
    loadFixture('poi/poi.wrong-iframe.html');
    activatePowerOptInWithIFrame().then(() => verifyPowerOptIn().then((optin) => {
        expect(optin).toBe(false);
        done();
      })
    );
  });

  it('should activate POI', (done) => {
    loadFixture('poi/poi.default.html');
    activatePowerOptInWithIFrame().then(() => verifyPowerOptIn().then((optin) => {
        expect(optin).toBeDefined();
        expect(optin).toBe(true);
        done();
      })
    );
  });

});
