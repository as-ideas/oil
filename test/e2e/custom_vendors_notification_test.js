import { CUSTOM_VENDOR_ONE_ELEMENT, CUSTOM_VENDOR_TWO_ELEMENT, OIL_YES_BUTTON } from '../test_constants';

module.exports = {
  '@disabled': false,
  beforeEach: browser => {
    browser
      .deleteCookies();
  },

  'Notifies custom vendors in list if consent is given': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/custom-vendors-notification.html')
      .useXpath()
      .pause(500)
      .waitForElementPresent(CUSTOM_VENDOR_ONE_ELEMENT)
      .assert.containsText(CUSTOM_VENDOR_ONE_ELEMENT, 'Custom Vendor 1 was opted out')
      .waitForElementPresent(CUSTOM_VENDOR_TWO_ELEMENT)
      .assert.containsText(CUSTOM_VENDOR_TWO_ELEMENT, 'Custom Vendor 2 was opted out')
      .waitForElementPresent(OIL_YES_BUTTON, 15000, false)
      .click(OIL_YES_BUTTON)
      .pause(500)
      .waitForElementPresent(CUSTOM_VENDOR_ONE_ELEMENT)
      .assert.containsText(CUSTOM_VENDOR_ONE_ELEMENT, 'Custom Vendor 1 was opted in')
      .waitForElementPresent(CUSTOM_VENDOR_TWO_ELEMENT)
      .assert.containsText(CUSTOM_VENDOR_TWO_ELEMENT, 'Custom Vendor 2 was opted in')
      .end();
  }

};
