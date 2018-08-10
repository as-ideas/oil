import * as PoiAPICore from '../../src/scripts/core/core_poi';
import * as PoiAPIUserview from '../../src/scripts/userview/userview_poi';
import { loadFixture } from '../test-utils/utils_fixtures';
import { resetOil } from '../test-utils/utils_reset';

describe('Power Opt-IN (POI)', () => {

  const DEFAULT_PAYLOAD = {p: 'BOO4NpHOO4NpHBQABBENAkuAAAAXyABgACAvgA'};

  let originalTimeout;

  beforeEach((done) => {
    resetOil();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
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
    loadFixture('poi/poi.wrong-iframe-url.html');
    PoiAPIUserview.activatePowerOptInWithIFrame({}).then(() => PoiAPICore.verifyPowerOptIn().then((optin) => {
        expect(optin.power_opt_in).toBe(false);
        done();
      })
    );
  });

  it('should activate POI', (done) => {
    loadFixture('poi/poi.default.html');

    PoiAPIUserview.activatePowerOptInWithIFrame(DEFAULT_PAYLOAD).then(() => PoiAPICore.verifyPowerOptIn().then((optin) => {
        expect(optin.power_opt_in).toBeDefined();
        expect(optin.power_opt_in).toBe(true);
        done();
      })
    );
  });

  it('should add iframe', () => {
    let iframe = PoiAPICore.addFrame();
    expect(iframe).toBeDefined();
  });

  describe('with POI-Group-Name', () => {

    it('should activate POI with groupname', (done) => {
      loadFixture('poi/poi.groupname.html');

      PoiAPIUserview.activatePowerOptInWithIFrame(DEFAULT_PAYLOAD).then(() => PoiAPICore.verifyPowerOptIn().then((optin) => {
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

    it('should redirect to the right hub without groupname', () => {
      let redirectionTarget = '';
      spyOn(PoiAPIUserview, 'redirectToLocation').and.callFake(function (location) {
        redirectionTarget = location;
      });
      PoiAPIUserview.activatePowerOptInWithRedirect({});
      expect(redirectionTarget).not.toContain('group_name');
    });
  })

});
