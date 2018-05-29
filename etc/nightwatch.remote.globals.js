const HtmlReporter = require('nightwatch-html-reporter');
let reporter = new HtmlReporter({
  uniqueFilename: true,
  reportsDirectory: __dirname + '/../target/reports'
});

module.exports = {
  before: function(done){
    require('dotenv').config();
    done();
  },
  openBrowser: false,
  'launch_url_host1': 'https://oil-integration-host1.herokuapp.com/',
  'launch_url_host2': 'https://oil-integration-host2.herokuapp.com/',
  'launch_url_cdn': 'https://oil-integration-cdn.herokuapp.com/',
  reporter: reporter.fn
};
