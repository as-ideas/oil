import Cookie from 'js-cookie';

window.addEventListener('message', (message) => {
  let data = message.data;
  console.debug('Got following parent data:', data);
  Cookie.set('GOIL', data, { expires: 31});
}, false);
