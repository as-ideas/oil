(function (window, document) {
  if (!window.__cmp) {
    window.__cmp = (function () {

      function definePostMessageHandlerForIframes(cmp) {
        let listen = window.addEventListener || window.attachEvent;
        let messageEvent = listen === 'attachEvent' ? 'onmessage' : 'message';
        listen(messageEvent, function (event) {
          cmp.receiveMessage(event);
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
          let gdprAppliesGlobally = true;
          const configurationElement = document.querySelector('script[type="application/configuration"]#oil-configuration');
          if (configurationElement !== null && configurationElement.text) {
            try {
              let parsedConfig = JSON.parse(configurationElement.text);
              if (parsedConfig && parsedConfig.hasOwnProperty('gdpr_applies_globally')) {
                gdprAppliesGlobally = parsedConfig.gdpr_applies_globally
              }
            } catch (error) {
              // no complaints
            }
          }
          pingCallback({
            gdprAppliesGlobally: gdprAppliesGlobally,
            cmpLoaded: isOilAlreadyLoaded()
          }, true);
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
          let data = event && event.data;
          let communicateWithStrings = (typeof data === 'string');
          if (communicateWithStrings && data.indexOf('__cmpCall') !== -1) {
            data = JSON.parse(data).__cmpCall;
          } else {
            data = data.__cmpCall;
          }
          if (data) {
            if (data.command === 'ping') {
              handlePing((result, success) => {
                let message = {
                  __cmpReturn: {
                    returnValue: result,
                    success: success,
                    callId: data.callId
                  }
                };
                event.source.postMessage(communicateWithStrings ? JSON.stringify(message) : message, event.origin);
              });
            } else {
              let commandEntry = {
                callId: data.callId,
                command: data.command,
                parameter: data.parameter,
                event: event
              };
              commandCollection.push(commandEntry);
              if (isOilAlreadyLoaded()) {
                window['AS_OIL']['commandCollectionExecutor'](commandEntry);
              }
            }
          }
        };
      }

      addCmpLocatorIframe();

      let commandCollection = [];
      let cmp = defineCmp();
      cmp.commandCollection = commandCollection;
      cmp.receiveMessage = defineMessageHandler();

      definePostMessageHandlerForIframes(cmp);

      return cmp;
    }());
  }
}(window, document));

