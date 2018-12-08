const log4js = require('log4js');
class LoggerHelper {
  constructor(placeHolder) {
    this.logger = log4js.getLogger(placeHolder);
  }

  logError(msg, ...arg) {
    this.logger.error(msg, ...arg);
  }

  logInfo(msg, ...arg) {
    this.logger.info(msg, ...arg);
  }

  logDebug(msg, ...arg) {
    this.logger.debug(msg, ...arg);
  }
}

exports.LoggerHelper = LoggerHelper;
