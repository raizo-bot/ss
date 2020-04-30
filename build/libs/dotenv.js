'use strict';

var _dotenv = require('dotenv');

var dotenv = _interopRequireWildcard(_dotenv);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _console = require('console');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Uncomment to force env
// assert(!!process.env.NODE_ENV, 'Missing env variable NODE_ENV');

// Possible configs to look at
const configs = [`.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`, `.env`]; /**
                                                                                                 * dotenv config file. This gets run as early on as possible
                                                                                                 * in order for us to have access to our .env.*
                                                                                                 *
                                                                                                 */


configs.forEach(path => {
  if (fs.existsSync(path)) {
    // Allows us to use process.env using this config
    dotenv.config({ path });
  }
});