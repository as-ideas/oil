import {OIL_ADVANCED_SETTINGS, OIL_LAYER, OIL_YES_BUTTON} from '../test_constants';
import {executeIfCompatible} from '../test-utils/utils_browser_check';

module.exports = {
  '@disabled': false,
  tags: ['locale'],
  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings.html')
      .deleteCookies();
  },

  'Oil Layer loads texts dynamically from backend and uses them': function (browser) {
    executeIfCompatible(
      browser,
      // https://id-jira.axelspringer.de/browse/OIL-217
      // CORS HEADER deactivated in IE9 per default
      [{name: 'IE', version: '9.0'}],
      () => {
        let end2endRegexp = /^\[e2e\].*$/;
        browser
          .url(browser.globals.launch_url_host1 + 'demos/advanced-settings.html')
          .useCss().waitForElementVisible('body', 1000, false)
          .useXpath().waitForElementVisible(OIL_LAYER, 2000, false);

        browser.useXpath().expect.element(OIL_YES_BUTTON).text.to.not.match(end2endRegexp);
        browser.useXpath().expect.element(OIL_ADVANCED_SETTINGS).text.to.not.match(end2endRegexp);

        // advanced-settings-e2e-locale should load a special LOCALE where every locale starts with '[e2e]'
        browser
          .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-e2e-locale.html')
          .useCss().waitForElementVisible('body', 1000, false)
          .useXpath().waitForElementVisible(OIL_LAYER, 2000, false);
        browser.useXpath().expect.element(OIL_YES_BUTTON).text.to.match(end2endRegexp);
        browser.useXpath().expect.element(OIL_ADVANCED_SETTINGS).text.to.match(end2endRegexp);
        browser.end();
      });
  }
};
