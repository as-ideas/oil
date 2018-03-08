import { OIL_LAYER } from '../test_constants.js';

module.exports = {
  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/direct-integration.html')
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/direct-integration.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  }



};
