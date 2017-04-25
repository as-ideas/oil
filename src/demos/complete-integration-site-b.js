import { eventer, messageEvent, addClickHandler } from '../scripts/utils.js';
import { logDebug } from '../scripts/log.js';

let iframe = null,
  iframeUrl = 'http://127.0.0.1:3000';

function addFrame() {
  iframe = document.createElement('iframe');
  iframe.setAttribute('id', 'oil-frame');
  iframe.setAttribute('src', iframeUrl + '/demos/iframe-mypass-test.html');
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);
}


(function () {
  addFrame();

  // add click handler to fake a set cookie message
  let btnGoi = document.getElementsByClassName('js-goi-activate')[0];
  addClickHandler(btnGoi, () => iframe.contentWindow.postMessage('goi-activate', '*'));

  // Listen to message from child window
  eventer(messageEvent, (e) => logDebug('Parent - received message!:  ', e.data), false);

}());
