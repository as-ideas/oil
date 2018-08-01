import {
  OIL_LAYER,
  OIL_MANAGED_TAGS_DIV,
  OIL_MANAGED_TAGS_IMG_TAG,
  OIL_MANAGED_TAGS_SCRIPT_TAG,
  OIL_YES_BUTTON
} from '../test_constants';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    browser
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/tag-management.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  'Managed tags are NOT visible if consent was NOT given (yet)': function (browser) {
    browser
      .waitForElementPresent(OIL_MANAGED_TAGS_SCRIPT_TAG, 1000, false)
      .expect.element(OIL_MANAGED_TAGS_SCRIPT_TAG).to.have.attribute('type').equals('as-oil');
    browser
      .waitForElementPresent(OIL_MANAGED_TAGS_IMG_TAG, 1000, false)
      .assert.hidden(OIL_MANAGED_TAGS_IMG_TAG);

    // HINT: A more stable (thin EDGE and IE) version for images of: .expect.element(OIL_MANAGED_TAGS_IMG_TAG).to.not.have.attribute('src');
    browser.getAttribute(OIL_MANAGED_TAGS_IMG_TAG, 'src', function (result) {
      this.assert.equal(!!result.value, false);
    });

    browser.end();
  },

  'Managed tags are visible if consent was given': function (browser) {
    browser
      .click(OIL_YES_BUTTON)
      .pause(200)
      .waitForElementPresent(OIL_MANAGED_TAGS_SCRIPT_TAG, 1000, false)
      .pause(500)
      .assert.containsText(OIL_MANAGED_TAGS_DIV, 'Dieser Text wird erst sichtbar, wenn der Consent gegeben wurde!');
    browser
      .waitForElementPresent(OIL_MANAGED_TAGS_IMG_TAG, 1000, false)
      .assert.visible(OIL_MANAGED_TAGS_IMG_TAG)
      .expect.element(OIL_MANAGED_TAGS_IMG_TAG).to.have.attribute('src').which.contains('/assets/images/landing_page/logo.png');
    browser.end();
  }

};
