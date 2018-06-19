export function generatePolyfills(){
  if(typeof window === 'undefined' || !window.Promise) {
    // eslint-disable-next-line global-require
    window.Promise = require('promise-polyfill').default;
  }

  // eslint-disable-next-line global-require
  require('es6-object-assign/auto');

  if (!Array.prototype.fill) {
    console.log('prototype fill');
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Array.prototype, 'fill', {
      value: function(value) {

        if (this === null) {
          throw new TypeError('this is null or not defined');
        }

        let O = Object(this);
        let len = O.length >>> 0;
        let start = arguments[1];
        let relativeStart = start >> 0;
        let k = relativeStart < 0 ?
          Math.max(len + relativeStart, 0) :
          Math.min(relativeStart, len);

        let end = arguments[2];
        let relativeEnd = end === undefined ?
          len : end >> 0;

        let final = relativeEnd < 0 ?
          Math.max(len + relativeEnd, 0) :
          Math.min(relativeEnd, len);

        while (k < final) {
          O[k] = value;
          k++;
        }

        return O;
      }
    });
  }
  console.log(Array.prototype.fill);
}

export default generatePolyfills();
