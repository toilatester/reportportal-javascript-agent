# reportporal-javascript-agent

A Protractor and Prortactor-Cucumber-JS reporter plugin to report results to Report Portal(http://reportportal.io/).

## Sample ReportPortal for protractor

![](Demo.gif)

## Sample ReportPortal for protractor-cucumber-framework

![](CucumberDemo.gif)

## Installation

The easiest way is to keep `reportporal-javascript-agent` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "reportporal-javascript-agent": "~0.0.9"
  }
}
```

You can simple do it by:

```bash
npm install reportportal-javascript-agent --save-dev
```

Instructions on how to install `Protractor` can be found [here](http://www.protractortest.org/#/protractor-setup).
Instructions on how to install `Protractor-CucumberJS` can be found [here](https://github.com/protractor-cucumber-framework/protractor-cucumber-framework).

## Configuration for protractor

### Configuration for protractor config.js

sample reportportal.config.json file

```json
{
  "token": "f1d908c2-8ee9-4df7-8298-ca08ee28f04c",
  "endpoint": "http://localhost:6060/api/v1",
  "launch": "protractor-demo-refactor",
  "project": "demo-agent",
  "attachPicturesToLogs": true,
  "takeScreenshot": "onFailure",
  "debug": false
}
```

Configure the with the sample below in your protractor.config.js file:

```js
const {
  Log4jsReportPortal,
  ReportPortalAgent,
  JasmineAgent
} = require('../../lib');
const { Log4jsConfig } = require('./log4js');
const path = require('path');
const reportConfig = require('./report/reportportal.config.json');
const agent = new ReportPortalAgent(reportConfig);
const log4jsReportPortal = new Log4jsReportPortal(agent);
exports.configure = log4jsReportPortal.configure;
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../spec-1.js', '../spec-2.js'],
  onPrepare: () => {
    jasmine.getEnv().addReporter(new JasmineAgent(agent));
  },
  beforeLaunch: () => {
    Log4jsConfig(path.join(__dirname, 'protractor.config.js'));
  },
  afterLaunch: async () => {}
};
```

## Configuration for protractor-cucumber-js

### Configuration for protractor config.js

sample reportportal.config.json file

```json
{
  "token": "f1d908c2-8ee9-4df7-8298-ca08ee28f04c",
  "endpoint": "http://localhost:6060/api/v1",
  "launch": "protractor-demo-refactor",
  "project": "demo-agent",
  "attachPicturesToLogs": true,
  "takeScreenshot": "onFailure",
  "debug": false
}
```

Configure the with the sample below in your protractor.cucumber.config.js file:

```js
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
    global.log4jsInstance = Log4jsConfig(
      path.join(__dirname, 'protractor.cucumber.config.js')
    );
  },

  onPrepare: async function() {
    // Get OS information and write into file
    await getOSInformation();
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
```

### Configuration for protractor hook in cucumber

```js
'use strict';
const { setDefaultTimeout } = require('cucumber');
const { cucumberAgent } = require('../../config/protractor.cucumber.config');
const {
  CucumberReportHook
} = require('../../../lib/report-portal/cucumber-js');
const DEFAULT_TIMEOUT = 60000;

CucumberReportHook(cucumberAgent);
setDefaultTimeout(DEFAULT_TIMEOUT);
```

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
