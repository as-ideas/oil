import * as PoiAPICore from '../../src/scripts/core/core_poi.js';
import * as PoiAPIUserview from '../../src/scripts/userview/userview_poi.js';
import {loadFixture, deleteAllCookies} from '../utils.js';
import {resetConfiguration} from '../../src/scripts/core/core_config.js';

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

    PoiAPIUserview.activatePowerOptInWithIFrame({}).then(() => PoiAPICore.verifyPowerOptIn().then((optin) => {
        expect(optin.power_opt_in).toBeDefined();
        expect(optin.power_opt_in).toBe(true);
        done();
      })
    );
  });

  it('should redirect to the right hub with groupname', () => {
    let redirectionTarget = '';
    spyOn(PoiAPIUserview, 'redirectToLocation').and.callFake(function (location) {
      redirectionTarget = location;
    });

    loadFixture('poi/poi.groupname.html');

    PoiAPIUserview.activatePowerOptInWithRedirect({});
    expect(redirectionTarget).toContain('homersimpson');
  });

});
