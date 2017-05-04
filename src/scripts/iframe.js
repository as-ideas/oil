export function addFrame(iframeUrl) {
  let iframe = document.getElementById('oil-frame');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.setAttribute('id', 'oil-frame');
    iframe.setAttribute('src', iframeUrl);
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);
  }
  return iframe;
}
