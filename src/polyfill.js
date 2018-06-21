/* eslint-disable global-require */
export function generatePolyfills(){
  if(window.Promise) {
    return;
  }
  require('core-js/modules/es6.object.assign');
  require('core-js/modules/es6.string.starts-with');
  require('core-js/modules/es6.array.from');
  require('core-js/modules/es6.array.slice');
  require('core-js/modules/es6.array.sort');
  require('core-js/modules/es6.array.fill');
  require('core-js/modules/es6.array.iterator');
  require('core-js/modules/es6.promise');
  require('core-js/modules/es7.array.includes');
  require('core-js/modules/es7.object.values');
  require('core-js/modules/es7.object.entries');
  require('core-js/modules/es7.promise.finally');
  require('core-js/modules/es7.promise.try');

  require('core-js/modules/_core');
}

export default generatePolyfills();
