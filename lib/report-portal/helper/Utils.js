const { LoggerHelper } = require('../../log4js');
const logger = new LoggerHelper('Utilities');
const Utils = {
  takeScreenshot: function(fileName) {
    if (browser) {
      return browser.takeScreenshot().then(
        image => {
          return Promise.resolve({
            name: fileName,
            type: 'image/png',
            content: image
          });
        },
        error => {
          logger.logError(error);
          return Promise.resolve(null);
        }
      );
    } else {
      logger.logError('Protractor should run and open browser');
      return Promise.resolve(null);
    }
  }
};

exports.Utils = Utils;
