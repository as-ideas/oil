import {
  IFRAME_GETCONSENTDATA_RESULT_SUCCESS, IFRAME_GETCONSENTDATA_RESULT_VALUE,
  IFRAME_PING_RESULT_SUCCESS,
  IFRAME_PING_RESULT_VALUE,
  OIL_YES_BUTTON,
  VENDOR_INTEGRATION_IFRAME,
  VENDOR_INTEGRATION_IFRAME_ID
} from '../test_constants';
import { executeIfCompatible } from '../test-utils/utils_browser_check';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    executeIfCompatible(
      browser,
      [
        {name: 'Chrome', version: '14.0', reason: 'Bug in elder Chrome versions - see https://bugs.chromium.org/p/chromedriver/issues/detail?id=1777.'},
        {name: 'Chrome', version: '15.0', reason: 'Bug in elder Chrome versions - see https://bugs.chromium.org/p/chromedriver/issues/detail?id=1777.'},
        {name: 'Chrome', version: '57.0', reason: 'Bug in elder Chrome versions - see https://bugs.chromium.org/p/chromedriver/issues/detail?id=1777.'},
        {name: 'IE', version: '9.0', reason: 'Massive instability in rendering and handling of iframes.'}
      ],
      () => {
        browser
          .deleteCookies();

        browser
          .pause(5000)
          .url(browser.globals.launch_url_host1 + 'demos/vendor-integration-with-iframe.html')
          .useXpath()
          .waitForElementVisible(OIL_YES_BUTTON, 2000, false)
          .waitForElementPresent(VENDOR_INTEGRATION_IFRAME, 5000, false);
      });
  },

  'vendor integration iframe sends ping message and gets result': function (browser) {
    executeIfCompatible(
      browser,
      [
        {name: 'Chrome', version: '14.0', reason: 'Bug in elder Chrome versions - see https://bugs.chromium.org/p/chromedriver/issues/detail?id=1777.'},
        {name: 'Chrome', version: '15.0', reason: 'Bug in elder Chrome versions - see https://bugs.chromium.org/p/chromedriver/issues/detail?id=1777.'},
        {name: 'Chrome', version: '57.0', reason: 'Bug in elder Chrome versions - see https://bugs.chromium.org/p/chromedriver/issues/detail?id=1777.'},
        {name: 'IE', version: '9.0', reason: 'Massive instability in rendering and handling of iframes.'}
      ],
      () => {
        browser
          .pause(2000)
          .frame(VENDOR_INTEGRATION_IFRAME_ID)
          .useXpath()
          .waitForElementVisible(IFRAME_PING_RESULT_SUCCESS, 2000, false)
          .getText(IFRAME_PING_RESULT_SUCCESS, result => {
            browser.assert.equal(typeof result, 'object');
            browser.assert.equal(result.value, 'true');
          });
        browser
          .waitForElementVisible(IFRAME_PING_RESULT_VALUE, 2000, false)
          .getText(IFRAME_PING_RESULT_VALUE, result => {
            browser.assert.equal(typeof result, 'object');
            let printedResult = JSON.parse(result.value);
            browser.assert.equal(printedResult.gdprAppliesGlobally, true);
            browser.assert.equal(printedResult.cmpLoaded, true);
          });
        browser
          .end();
      });
  },

  'vendor integration iframe sends getConsentData message and gets result': function (browser) {
    executeIfCompatible(
      browser,
      [
        {name: 'Chrome', version: '14.0', reason: 'Bug in elder Chrome versions - see https://bugs.chromium.org/p/chromedriver/issues/detail?id=1777.'},
        {name: 'Chrome', version: '15.0', reason: 'Bug in elder Chrome versions - see https://bugs.chromium.org/p/chromedriver/issues/detail?id=1777.'},
        {name: 'Chrome', version: '57.0', reason: 'Bug in elder Chrome versions - see https://bugs.chromium.org/p/chromedriver/issues/detail?id=1777.'},
        {name: 'IE', version: '9.0', reason: 'Massive instability in rendering and handling of iframes.'}
      ],
      () => {
        browser
          .pause(2000)
          .frame(VENDOR_INTEGRATION_IFRAME_ID)
          .useXpath()
          .waitForElementVisible(IFRAME_GETCONSENTDATA_RESULT_SUCCESS, 2000, false)
          .getText(IFRAME_GETCONSENTDATA_RESULT_SUCCESS, result => {
            browser.assert.equal(typeof result, 'object');
            browser.assert.equal(result.value, 'true');
          });
        browser
          .waitForElementVisible(IFRAME_GETCONSENTDATA_RESULT_VALUE, 2000, false)
          .getText(IFRAME_GETCONSENTDATA_RESULT_VALUE, result => {
            browser.assert.equal(typeof result, 'object');
            let printedResult = JSON.parse(result.value);
            browser.assert.equal(printedResult.gdprApplies, true);
            browser.assert.equal(printedResult.hasGlobalScope, false);
            browser.assert.ok(printedResult.consentData.length > 0);
          });
        browser
          .end();
      });
  }
};
