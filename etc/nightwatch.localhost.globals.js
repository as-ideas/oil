const HtmlReporter = require('nightwatch-html-reporter');
let reporter = new HtmlReporter({
  uniqueFilename: true,
  reportsDirectory: __dirname + '/../target/reports'
});

module.exports = {
  openBrowser: false,
  'launch_url_host1': 'http://oilsite1:8080/',
  'launch_url_host2': 'http://oilsite2:8080/',
  'launch_url_cdn': 'http://oilcdn:8080/',
  reporter: reporter.fn
};
