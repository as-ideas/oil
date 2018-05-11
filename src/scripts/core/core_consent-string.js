// HINT: We need to really load this with Webpack to let the babel transformations kick in
const {ConsentString} = require('!babel-loader!./../../../node_modules/consent-string/dist/index.js');
export default ConsentString;
