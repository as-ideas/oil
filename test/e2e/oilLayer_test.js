module.exports = {
  beforeEach: browser => {
     browser
      .url(browser.launch_url)
      .deleteCookies();

    browser
      .url(browser.launch_url)
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath();
  },

  'OIL Layer Visible' : function (browser) {
    browser
      .assert.visible('//*[@data-qa="oil-Layer"]')
      .end();
  },

  'OIL Layer closed after clicking yes' : function (browser) {
    browser
      .assert.visible('//*[@data-qa="oil-Layer"]')
      .click('//*[@data-qa="oil-YesButton"]')
      .assert.hidden('//*[@data-qa="oil-Layer"]')
      .assert.cssClassPresent('//*[@data-qa="oil-Layer"]', "optin-true")
      .end();
  },

  'OIL Layer closed after clicking no' : function (browser) {
    browser
      .assert.visible('//*[@data-qa="oil-Layer"]')
      .click('//*[@data-qa="oil-NotNowButton"]')
      .assert.cssClassPresent('//*[@data-qa="oil-Layer"]', "optin-false")
      .assert.cssClassPresent('//*[@data-qa="oil-Layer"]', "expanded-false")
      .end();
  },
};
