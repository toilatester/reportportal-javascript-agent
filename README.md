# reportporal-javascript-agent


A Protractor and Prortactor-Cucumber-JS reporter plugin to report results to Report Portal(http://reportportal.io/).


## Installation
The easiest way is to keep `reportporal-javascript-agent` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "reportporal-javascript-agent": "~0.0.3"
  }
}
```
You can simple do it by:
```bash
npm install reportportal-javascript-agent --save-dev
```
Instructions on how to install `Protractor` can be found [here](http://www.protractortest.org/#/protractor-setup).
Instructions on how to install `Protractor-CucumberJS` can be found [here](https://github.com/protractor-cucumber-framework/protractor-cucumber-framework).

## Configuration
Configure the with the sample below in your conf.js file:
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

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
