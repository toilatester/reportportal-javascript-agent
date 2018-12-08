const report = require('multiple-cucumber-html-reporter');
const { LoggerHelper } = require('../log4js');
const logger = new LoggerHelper('Utilities');
async function generate() {
  const info = global.REPORT_INFO;
  logger.logInfo('REPORT IS GENERATING....');
  logger.logInfo('Info: ', info);
  report.generate({
    openReportInBrowser: false,
    jsonDir: global.REPORT_FOLDER_PATH,
    reportPath: global.REPORT_FOLDER_PATH,
    reportName: 'Demo Automation',
    displayDuration: true,
    metadata: {
      app: {
        name: 'Admin',
        version: '1.0'
      },
      browser: {
        name: info.browser.name,
        version: info.browser.version
      },
      device: 'Local machine',
      platform: {
        name: info.os.name,
        version: info.os.version
      }
    },
    customData: {
      title: 'Running info',
      data: [
        {
          label: 'Project',
          value: 'Demo'
        },
        {
          label: 'Release',
          value: info.release || ''
        },
        {
          label: 'Cycle',
          value: info.cycle || ''
        },
        {
          label: 'Execution Start Time',
          value: info.startTime || ''
        },
        {
          label: 'Execution End Time',
          value: info.completeTime || ''
        }
      ]
    }
  });
}

exports.Report = {
  generate: generate
};
