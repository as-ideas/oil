module.exports = {
  beforeEach: browser => {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', 1000, false);
  },

  'OIL Layer Visible' : function (browser) {
    browser
      .useXpath()
      .assert.visible('//*[@data-qa="oilLayer"]')
      .end();
  },
};
