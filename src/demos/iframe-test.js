import { eventer, messageEvent, addClickHandler } from '../scripts/utils.js';

let iframe = null,
  iframeUrl = 'http://127.0.0.1:3000';

function addFrame() {
  iframe = document.createElement('iframe');
  iframe.setAttribute('id', 'oil-frame');
  iframe.setAttribute('src', iframeUrl + '/demos/iframe-mypath-test.html');
  iframe.style.width = '640px';
  iframe.style.height = '480px';
  document.body.appendChild(iframe);
}


(function () {
  addFrame();

  // add click handler to fake a set cookie message
  let btnGoi = document.getElementsByClassName('js-goi-activate')[0];
  addClickHandler(btnGoi, () => iframe.contentWindow.postMessage('goi-activate', '*'));

  // Listen to message from child window
  eventer(messageEvent, function (e) {
    console.debug('Parent - received message!:  ', e.data);
  }, false);

}());
