module.exports = {
  'OIL Layer Visible' : function (browser) {
    browser
      .url('https://oil:rig@oil-integration.herokuapp.com/')
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .assert.visible('//*[@data-qa="oilLayer"]')
      .end();
  },
};
