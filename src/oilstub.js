(function (window, document) {
  if (!window.__cmp) {
    window.__cmp = (function () {
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

      let commandQueue = [];
      let cmp = function (command, parameter, callback) {
        if (command === 'ping') {
          if (callback) {
            return callback({
              gdprAppliesGlobally: !!(window.__cmp && window.__cmp.config && window.__cmp.config.storeConsentGlobally),
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

      cmp.config = {
        // Modify config values here
        storeConsentGlobally: false
      };

      return cmp;
    }());
  }
}(window, document));
