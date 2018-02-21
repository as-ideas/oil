import * as PoiAPI from '../../src/scripts/poi';
import { loadFixture, deleteAllCookies } from '../utils';
import { resetConfiguration } from '../../src/scripts/config';

describe('poi', () => {

  let originalTimeout;

  beforeEach((done) => {
    resetConfiguration();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    deleteAllCookies();
    // remove every existing frame
    if (document.getElementById('oil-frame')) {
      document.getElementById('oil-frame').remove();
    }
    done();
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should disable POI by default', (done) => {
    loadFixture('poi/poi.config-error.html');

    PoiAPI.activatePowerOptInWithIFrame({}).then(() => PoiAPI.verifyPowerOptIn().then((optin) => {
        expect(optin.power_opt_in).toBe(false);
        done();
      })
    );
  });

  it('should disable POI on config error', (done) => {
    loadFixture('poi/poi.wrong-iframe.html');
    PoiAPI.activatePowerOptInWithIFrame({}).then(() => PoiAPI.verifyPowerOptIn().then((optin) => {
        expect(optin.power_opt_in).toBe(false);
        done();
      })
    );
  });

  it('should activate POI', (done) => {
    loadFixture('poi/poi.default.html');

    PoiAPI.activatePowerOptInWithIFrame({}).then(() => PoiAPI.verifyPowerOptIn().then((optin) => {
        expect(optin.power_opt_in).toBeDefined();
        expect(optin.power_opt_in).toBe(true);
        done();
      })
    );
  });

  it('should redirect to the right hub without groupname', () => {
    let redirectionTarget = '';
    spyOn(PoiAPI, 'redirectToLocation').and.callFake(function (location) { redirectionTarget = location; });

    loadFixture('poi/poi.default.html');

    PoiAPI.activatePowerOptInWithRedirect({});
    expect(redirectionTarget).not.toContain('group_name');
  });

});
