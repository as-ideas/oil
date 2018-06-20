import { resetOil } from '../test-utils/utils_reset';
import { getSoiCookie } from '../../src/scripts/core/core_cookies';
import * as CoreConfig from '../../src/scripts/core/core_config';

describe('cookie Format needs to be backwards compatible', () => {

  // {"opt_in":true,"timestamp":1528124690713,"version":"1.1.0-SNAPSHOT","localeVariantName":"enEN_01","localeVariantVersion":1,"privacy":{"1":true,"2":false,"3":true,"4":true,"5":true,"26":true}}
  const LEGACY_COOKIE = "{%22opt_in%22:true%2C%22timestamp%22:1528124690713%2C%22version%22:%221.1.0-SNAPSHOT%22%2C%22localeVariantName%22:%22enEN_01%22%2C%22localeVariantVersion%22:1%2C%22privacy%22:{%221%22:true%2C%222%22:false%2C%223%22:true%2C%224%22:true%2C%225%22:true%2C%2226%22:true}}";

  // {"opt_in":true,"version":"1.1.0-SNAPSHOT","localeVariantName":"enEN_01","localeVariantVersion":1,"customPurposes":[],"consentString":"BOO4NkCOO4NkCBQABBENAkuAAAAXyABgACAvgA"}
  const CURRENT_COOKIE = "{%22opt_in%22:true%2C%22version%22:%221.1.0-SNAPSHOT%22%2C%22localeVariantName%22:%22enEN_01%22%2C%22localeVariantVersion%22:1%2C%22customPurposes%22:[]%2C%22consentString%22:%22BOO4NkCOO4NkCBQABBENAkuAAAAXyABgACAvgA%22};";

  const CUSTOM_PURPOSES = [
    {
      id: 25,
      name: 'name25',
      description: 'description25'
    },
    {
      id: 26,
      name: 'name26',
      description: 'description26'
    }
  ];

  beforeEach(() => {
    spyOn(CoreConfig, 'getCustomPurposes').and.returnValue(CUSTOM_PURPOSES);
    resetOil();
  });

  it('should be able to translate any old SOI cookie to the new format', () => {
    setCookie('oil_data', LEGACY_COOKIE);

    let soiCookie = getSoiCookie();

    expect(soiCookie.opt_in).toBe(true);
    expect(soiCookie.version).toBe("1.1.0-SNAPSHOT");
    expect(soiCookie.localeVariantName).toBe("enEN_01");
    expect(soiCookie.localeVariantVersion).toBe(1);
    expect(soiCookie.consentData.getPurposesAllowed()).toEqual([1, 3, 4, 5]);
    expect(soiCookie.consentData.getVendorsAllowed().length).toEqual(380);
    expect(soiCookie.customPurposes).toEqual([26]);
    expect(soiCookie.consentString).toBeDefined();
  });

  function setCookie(name, value) {
    let date = new Date();
    let days = 5;
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
});
