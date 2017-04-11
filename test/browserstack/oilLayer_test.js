module.exports = {
  '@disabled': true,
  'OIL Layer Visible' : function (browser) {
    browser
      .url('https://oil:rig@oil-integration.herokuapp.com/')
      .waitForElementVisible('body', 1000)
      .useXpath()
      .assert.visible('//*[@data-qa="oilLayer"]')
      .end();
  },
};
