(function (window, document) {
  if (!window.__cmp) {
    window.__cmp = (function () {

      // Define stub's postMessage handler for cross-origin iframe requests
      let listen = window.attachEvent || window.addEventListener;
      listen('message', function (event) {
        window.__cmp.receiveMessage(event);
      }, false);

      // TODO: understand what this is for
      // function addLocatorFrame() {
      //   if (!window.frames['__cmpLocator']) {
      //     if (document.body) {
      //       let frame = document.createElement('iframe');
      //       frame.style.display = 'none';
      //       frame.name = '__cmpLocator';
      //       document.body.appendChild(frame);
      //     } else {
      //       setTimeout(addLocatorFrame, 5);
      //     }
      //   }
      // }
      // addLocatorFrame();

      // Define command queue and stub function
      let commandQueue = [];
      let cmp = function (command, parameter, callback) {
        if (command === 'ping') {
          if (callback) {
            return callback({
              gdprAppliesGlobally: false,
              cmpLoaded: false
            });
          }
        } else {
          commandQueue.push({
            command: command,
            parameter: parameter,
            callback: callback
          });
        }
      };
      cmp.commandQueue = commandQueue;

      // Define postMessage handling invoked by handler from above
      cmp.receiveMessage = function (event) {
        let data = event && event.data && event.data.__cmpCall;
        if (data) {
          commandQueue.push({
            callId: data.callId,
            command: data.command,
            parameter: data.parameter,
            event: event
          });
        }
      };

      return cmp;
    }());
  }
}(window, document));
