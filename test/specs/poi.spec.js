import * as PoiAPICore from '../../src/scripts/core/core_poi.js';
import * as PoiAPIUserview from '../../src/scripts/userview/userview_poi.js';
import { loadFixture, deleteAllCookies } from '../utils.js';
import { resetConfiguration } from '../../src/scripts/core/core_config.js';

describe('Power Opt-IN (POI)', () => {

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
    loadFixture('poi/poi.no-config.html');

    PoiAPIUserview.activatePowerOptInWithIFrame({})
      .then(() => {
        PoiAPICore.verifyPowerOptIn()
          .then((optin) => {
            expect(optin.power_opt_in).toBe(false);
            done();
          })
      })
    ;
  });

  it('should disable POI on config error', (done) => {
    loadFixture('poi/poi.wrong-iframe.html');
    PoiAPIUserview.activatePowerOptInWithIFrame({}).then(() => PoiAPICore.verifyPowerOptIn().then((optin) => {
        expect(optin.power_opt_in).toBe(false);
        done();
      })
    );
  });

  it('should activate POI', (done) => {
    loadFixture('poi/poi.default.html');

    PoiAPIUserview.activatePowerOptInWithIFrame({}).then(() => PoiAPICore.verifyPowerOptIn().then((optin) => {
        expect(optin.power_opt_in).toBeDefined();
        expect(optin.power_opt_in).toBe(true);
        done();
      })
    );
  });

  it('should redirect to the right hub without groupname', () => {
    let redirectionTarget = '';
    spyOn(PoiAPIUserview, 'redirectToLocation').and.callFake(function (location) {
      redirectionTarget = location;
    });
    PoiAPIUserview.activatePowerOptInWithRedirect({});
    expect(redirectionTarget).not.toContain('group_name');
  });

  it('should add iframe', () => {
    let iframe = PoiAPICore.addFrame();
    expect(iframe).toBeDefined();
  });
});
