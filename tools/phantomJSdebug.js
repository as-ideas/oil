var page = require('webpage').create(),
  system = require('system'),
  address;

if (system.args.length === 1) {
  console.log('Usage: phantomJSdebug.js <some URL>');
  phantom.exit();
}

address = system.args[1];

page.viewportSize = { width: 1024, height: 768 };
page.clipRect = { top: 0, left: 0, width: 1024, height: 768 };

page.onResourceRequested = function(request) {
  // console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response) {
  // console.log('Receive ' + JSON.stringify(response, undefined, 4));
};

page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log('CONSOLE: ', msg);
};

page.onError = function (msg, trace) {
  console.log(msg);
  trace.forEach(function(item) {
    console.log('  ', item.file, ':', item.line);
  });
};
page.open(address, function(status) {
  if (status !== 'success') {
    console.log('FAILED to load the address');
  } else {
    console.log('Loading ' + system.args[1]);
    setTimeout(function(){
      page.render('oil.png');
      console.log(page.content);
      phantom.exit();
    }, 1000);
  }
});
