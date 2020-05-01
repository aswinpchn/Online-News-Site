// https://log4js-node.github.io/log4js-node/api.html
// https://www.npmjs.com/package/log4js
const log4js = require('log4js');
log4js.configure({
  appenders: { log: { type: 'file', filename: 'file.log' } },
  categories: { default: { appenders: ['log'], level: 'info' } }
});

const logger = log4js.getLogger('log');
logger.info('Starting the News Paper application! - This is logged during the logger creation in config folder once.');

module.exports = logger;