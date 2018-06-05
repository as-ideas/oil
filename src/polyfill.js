export function polyfillPromise(){
  if(typeof window === 'undefined' || !window.Promise) {
    // eslint-disable-next-line global-require
    window.Promise = require('core-js/fn/promise');
  } else {
    return null;
  }
}

export default polyfillPromise();
