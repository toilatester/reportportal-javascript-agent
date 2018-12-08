const log4js = require('log4js');
const Log4jsConfig = log4jsReportPortalAppender => {
  log4js.configure({
    appenders: {
      rp: {
        type: log4jsReportPortalAppender,
        layout: {
          type: 'basic',
        },
      },
      out: {
        type: 'stdout',
        layout: {
          type: 'basic',
        },
      },
      multi: {
        type: 'multiFile',
        base: 'logs/',
        property: 'categoryName',
        extension: '.log',
        layout: {
          type: 'basic',
        },
        maxLogSize: 10485760,
        backups: 3,
        compress: true,
      },
    },
    categories: {
      default: {
        appenders: ['multi', 'rp'],
        level: 'all',
      },
    },
  });
  return log4js;
};

exports.Log4jsConfig = Log4jsConfig;
