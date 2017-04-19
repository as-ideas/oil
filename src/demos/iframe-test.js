import { addClickHandler } from '../scripts/utils.js';

let iframe = null,
  iframeUrl = 'http://localhost:3000';

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


  let btnGoi = document.getElementsByClassName('js-goi-activate')[0];
  addClickHandler(btnGoi, () => iframe.contentWindow.postMessage('goi-activate', iframeUrl));

}());
