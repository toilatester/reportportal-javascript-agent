const { LoggerHelper } = require('../../log4js');
const logger = new LoggerHelper('Utilities');
const Utils = {
  takeScreenshot: function(fileName) {
    const randomFileName =
      'SceenShot_' + Math.floor(Math.random() * 10000000000).toString();
    fileName = fileName ? fileName : randomFileName;
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
