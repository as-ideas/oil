import { logInfo } from '../scripts/log.js';

export function addFrame(iframeUrl) {
  logInfo("addFrame");
  let iframe = document.getElementById('oil-frame');
  if (!iframe) {
    logInfo("Creating frame...");
    iframe = document.createElement('iframe');
    iframe.setAttribute('id', 'oil-frame');
    iframe.setAttribute('src', iframeUrl);
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-top-navigation');
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);
  } else {
    logInfo("Found frame already!");
  }
  return iframe;
}
