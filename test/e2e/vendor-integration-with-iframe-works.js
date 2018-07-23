import {
  IFRAME_GETCONSENTDATA_RESULT_SUCCESS, IFRAME_GETCONSENTDATA_RESULT_VALUE,
  IFRAME_PING_RESULT_SUCCESS,
  IFRAME_PING_RESULT_VALUE,
  OIL_YES_BUTTON,
  VENDOR_INTEGRATION_IFRAME,
  VENDOR_INTEGRATION_IFRAME_ID
} from '../test_constants';

module.exports = {
  '@disabled': false,
  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/vendor-integration-with-iframe.html')
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/vendor-integration-with-iframe.html')
      .useXpath()
      .waitForElementVisible(OIL_YES_BUTTON, 2000, false)
      .waitForElementPresent(VENDOR_INTEGRATION_IFRAME, 5000, false);
  },

  'vendor integration iframe sends ping message and gets result': function (browser) {
    browser
      .frame(VENDOR_INTEGRATION_IFRAME_ID)
      .useXpath()
      .waitForElementVisible(IFRAME_PING_RESULT_SUCCESS, 1000, false)
      .getText(IFRAME_PING_RESULT_SUCCESS, result => {
        browser.assert.equal(typeof result, "object");
        browser.assert.equal(result.value, 'true');
      });
    browser
      .waitForElementVisible(IFRAME_PING_RESULT_VALUE, 1000, false)
      .getText(IFRAME_PING_RESULT_VALUE, result => {
        browser.assert.equal(typeof result, "object");
        let printedResult = JSON.parse(result.value);
        browser.assert.equal(printedResult.gdprAppliesGlobally, true);
        browser.assert.equal(printedResult.cmpLoaded, true);
      });
    browser
      .end();
  },

  'vendor integration iframe sends getConsentData message and gets result': function (browser) {
    browser
      .frame(VENDOR_INTEGRATION_IFRAME_ID)
      .useXpath()
      .waitForElementVisible(IFRAME_GETCONSENTDATA_RESULT_SUCCESS, 1000, false)
      .getText(IFRAME_GETCONSENTDATA_RESULT_SUCCESS, result => {
        browser.assert.equal(typeof result, "object");
        browser.assert.equal(result.value, 'true');
      });
    browser
      .waitForElementVisible(IFRAME_GETCONSENTDATA_RESULT_VALUE, 1000, false)
      .getText(IFRAME_GETCONSENTDATA_RESULT_VALUE, result => {
        browser.assert.equal(typeof result, "object");
        let printedResult = JSON.parse(result.value);
        browser.assert.equal(printedResult.gdprApplies, true);
        browser.assert.equal(printedResult.hasGlobalScope, false);
        browser.assert.ok(printedResult.consentData.length > 0);
      });
    browser
      .end();
  }
};
