import { getPoiCookie } from '../../../src/scripts/hub/hub_cookies';
import { resetOil } from '../../test-utils/utils_reset';

describe('cookie Format needs to be backwards compatible', () => {

  // {"power_opt_in":true,"timestamp":1528203535351,"version":"1.1.1-RELEASE","localeVariantName":"enEN_01","localeVariantVersion":1,"privacy":{"1":true,"2":false,"3":true,"4":true,"5":true}}
  const LEGACY_COOKIE = "{%22power_opt_in%22:true%2C%22timestamp%22:1528203535351%2C%22version%22:%221.1.1-RELEASE%22%2C%22localeVariantName%22:%22enEN_01%22%2C%22localeVariantVersion%22:1%2C%22privacy%22:{%221%22:true%2C%222%22:false%2C%223%22:true%2C%224%22:true%2C%225%22:true%2C%2226%22:true}}";

  // {"power_opt_in":true,"version":"1.1.0-SNAPSHOT","localeVariantName":"enEN_01","localeVariantVersion":1,"customPurposes":[],"consentString":"BOO4NpHOO4NpHBQABBENAkuAAAAXyABgACAvgA"}
  const CURRENT_COOKIE = "{%22power_opt_in%22:true%2C%22version%22:%221.1.0-SNAPSHOT%22%2C%22localeVariantName%22:%22enEN_01%22%2C%22localeVariantVersion%22:1%2C%22customPurposes%22:[]%2C%22consentString%22:%22BOO4NpHOO4NpHBQABBENAkuAAAAXyABgACAvgA%22}";

  beforeEach(() => resetOil());

  it('should be able to translate any old POI cookie to the new format', () => {
    setCookie('oil_data', LEGACY_COOKIE);

    let poiCookie = getPoiCookie();

    expect(poiCookie.power_opt_in).toBe(true);
    expect(poiCookie.version).toBe("1.1.1-RELEASE");
    expect(poiCookie.localeVariantName).toBe("enEN_01");
    expect(poiCookie.localeVariantVersion).toBe(1);
    expect(poiCookie.consentData.getPurposesAllowed()).toEqual([1, 3, 4, 5]);
    expect(poiCookie.consentData.getVendorsAllowed().length).toEqual(380);
    expect(poiCookie.customPurposes).toEqual([]);
    expect(poiCookie.consentString).toEqual(""); // we do not load the vendor list in the hub.js
  });

  function setCookie(name, value) {
    let date = new Date();
    let days = 5;
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
});
