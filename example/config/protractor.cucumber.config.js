const path = require('path');
const { getCapability } = require('./base/browser.config');
const { getCucumberOpts } = require('./cucumber/cucumber.config');
const { Log4jsConfig } = require('./log4js');
const reportConfig = require('./report/reportportal.config.json');
const {
  Report,
  combineRerunFiles,
  getOSInformation,
  extractCommandlineOptions,
  generateReportFolder,
  generateNestedFolder,
  Log4jsReportPortal,
  CucumberReportAgent
} = require('../../lib');
const cucumberAgent = new CucumberReportAgent(reportConfig);
const log4jsReportPortal = new Log4jsReportPortal(cucumberAgent.agent);
generateReportFolder();

global.__projectRoot = process.cwd();
generateNestedFolder(path.join(__projectRoot, 'rerun'));
const CURRENT_SESSION_INFO_FILE_NAME = './report/report.config.json';

global.REPORT_INFO = require(CURRENT_SESSION_INFO_FILE_NAME);

const startTime = new Date();

// Parse extra arguments which is sent from command line
// Note: Need to send exactly these option in command line
let { capability, isReRun, tags } = extractCommandlineOptions();

let config = {
  SELENIUM_PROMISE_MANAGER: false,

  seleniumAddress: 'http://localhost:4444/wd/hub',

  multiCapabilities: [getCapability(capability)],

  specs: ['../e2e/features/sample/*.feature'],

  framework: 'custom',

  frameworkPath: require.resolve('protractor-cucumber-framework'),

  cucumberOpts: getCucumberOpts(isReRun, tags),
  log4jsInstance: () => {
    return global.log4jsInstance;
  },
  beforeLaunch: function() {
    // Get simulator config
    if (capability.indexOf('mobile') > -1) {
      global.REPORT_INFO.browser.simulator['deviceName'] = 'something';
    }
    // Clear simulator info
    else {
      global.REPORT_INFO.browser.simulator = {};
    }
    global.log4jsInstance = Log4jsConfig(
      path.join(__dirname, 'protractor.cucumber.config.js')
    );
  },

  onPrepare: async function() {
    // Get OS information and write into file
    await getOSInformation();

    // Maximum screen size if not simulator
    if (capability.indexOf('mobile') === -1) {
      browser.driver
        .manage()
        .window()
        .maximize();
    }
  },

  onComplete: async function() {
    let capability = await browser.getCapabilities();
    let info = global.REPORT_INFO;
    info.browser.name = capability.get('browserName');
    info.browser.version = capability.get('version');
    global.REPORT_INFO = info;
  },

  afterLaunch: async function() {
    // Merge all rerun file
    if (!isReRun) {
      combineRerunFiles(path.join(__projectRoot, 'rerun'));
    }

    // Generate report
    const completeTime = new Date();

    global.REPORT_INFO.startTime = startTime.toUTCString();
    global.REPORT_INFO.completeTime = completeTime.toUTCString();

    await Report.generate();
  }
};
exports.configure = log4jsReportPortal.configure;
exports.config = config;
exports.cucumberAgent = cucumberAgent;
