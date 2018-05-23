// TODO extract content of this function to another function for better testability!
(function (window, document) {
  if (!window.__cmp) {
    window.__cmp = (function () {

      function definePostMessageHandlerForIframes() {
        let listen = window.attachEvent || window.addEventListener;
        listen('message', function (event) {
          window.__cmp.receiveMessage(event);
        }, false);
      }

      function addCmpLocatorIframe() {
        if (!(document.getElementsByName('__cmpLocator').length > 0)) {
          if (document.body) {
            let frame = document.createElement('iframe');
            frame.style.display = 'none';
            frame.name = '__cmpLocator';
            document.body.appendChild(frame);
          } else {
            setTimeout(addCmpLocatorIframe, 5);
          }
        }
      }

      function handlePing(pingCallback) {
        if (pingCallback) {
          pingCallback({
            gdprAppliesGlobally: false,
            cmpLoaded: isOilAlreadyLoaded()
          });
        }
      }

      function isOilAlreadyLoaded() {
        return !!(window['AS_OIL'] && window['AS_OIL']['commandCollectionExecutor']);
      }

      function defineCmp() {
        return function (command, parameter, callback) {
          if (command === 'ping') {
            handlePing(callback);
          } else {
            let commandEntry = {
              command: command,
              parameter: parameter,
              callback: callback
            };
            commandCollection.push(commandEntry);
            if (isOilAlreadyLoaded()) {
              window['AS_OIL']['commandCollectionExecutor'](commandEntry);
            }
          }
        }
      }

      function defineMessageHandler() {
        return function (event) {
          let data = event && event.data && event.data.__cmpCall;
          if (data) {
            commandCollection.push({
              callId: data.callId,
              command: data.command,
              parameter: data.parameter,
              event: event
            });
          }
        };
      }

      definePostMessageHandlerForIframes();
      addCmpLocatorIframe();

      let commandCollection = [];
      let cmp = defineCmp();
      cmp.commandCollection = commandCollection;
      cmp.receiveMessage = defineMessageHandler();
      return cmp;
    }());
  }
}(window, document));

