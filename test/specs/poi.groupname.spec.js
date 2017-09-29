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

  it('should activate POI with groupname', (done) => {
    loadFixture('poi/poi.groupname.html');

    PoiAPI.activatePowerOptInWithIFrame().then(() => PoiAPI.verifyPowerOptIn().then((optin) => {
        expect(optin).toBeDefined();
        expect(optin).toBe(true);
        done();
      })
    );
  });

  it('should redirect to the right hub with groupname', () => {
    let redirectionTarget = '';
    spyOn(PoiAPI, 'redirectToLocation').and.callFake(function (location) { redirectionTarget = location; });

    loadFixture('poi/poi.groupname.html');

    PoiAPI.activatePowerOptInWithRedirect();
    expect(redirectionTarget).toContain('homersimpson');
  });

});
