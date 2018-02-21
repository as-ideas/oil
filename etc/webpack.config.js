/**
 * @author: @hypery2k
 */
const path = require('path');

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./webpack.prod'); // eslint-disable-line
    break;
  case 'test':
  case 'testing':
    module.exports = require('./webpack.test'); // eslint-disable-line
    break;
  case 'dev':
  case 'development':
    module.exports = require('./webpack.dev'); // eslint-disable-line
    break;
  case 'release':
    module.exports = require('./webpack.release'); // eslint-disable-line
    break;
  default:
    module.exports = require('./webpack.debug'); // eslint-disable-line
}
