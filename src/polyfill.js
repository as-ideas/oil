require('core-js/modules/es6.object.create');
require('core-js/modules/es6.object.define-property');
require('core-js/modules/es6.object.define-properties');
require('core-js/modules/es6.object.keys');
require('core-js/modules/es6.object.get-own-property-names');
require('core-js/modules/es6.object.assign');

require('core-js/modules/es6.string.includes');
require('core-js/modules/es6.string.starts-with');
require('core-js/modules/es6.string.sub');
require('core-js/modules/es6.string.sup');

require('core-js/modules/es6.array.from');
require('core-js/modules/es6.array.join');
require('core-js/modules/es6.array.slice');
require('core-js/modules/es6.array.sort');
require('core-js/modules/es6.array.for-each');
require('core-js/modules/es6.array.map');
require('core-js/modules/es6.array.fill');
require('core-js/modules/es6.array.find');
require('core-js/modules/es6.array.species');
require('core-js/modules/es6.array.iterator');

require('core-js/modules/es6.promise');
require('core-js/modules/es7.array.includes');
require('core-js/modules/es7.object.values');
require('core-js/modules/es7.object.entries');

require('core-js/modules/es7.promise.finally');
require('core-js/modules/es7.promise.try');

  
export function generatePolyfills(){
  // eslint-disable-next-line global-require
  return require('core-js/modules/_core');
}

export default generatePolyfills();
