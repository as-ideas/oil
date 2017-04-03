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
  default:
    module.exports = require('./webpack.dev'); // eslint-disable-line
}
