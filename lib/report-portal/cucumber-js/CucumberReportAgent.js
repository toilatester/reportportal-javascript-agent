const { Scenario } = require('./ScenarioObject');
const { Constant } = require('../helper');
const { ReportPortalAgent } = require('../core');
const { LoggerHelper } = require('../../log4js');
class CucumberReportAgent {
  constructor(config) {
    this.agent = new ReportPortalAgent(config);
    this.logger = new LoggerHelper('CucumberReportAgent');
    this.scenarioObject = {};
  }
  startLaunchCucumber() {
    this.agent.sendLaunchRequest({}, true);
    this.logger.logInfo('Start Launch Cucumber');
  }

  startSuiteCucumber(
    suiteInfo = {
      name: 'Default Suite',
      description: 'Test Suite Run With cucumber-js',
    },
  ) {
    this.agent.sendTestItemRequest(
      {
        type: Constant.TEST_TYPE.SUITE,
        description: suiteInfo.description,
        name: suiteInfo.name,
      },
      true,
    );
    this.logger.logInfo('Start Suite Cucumber ', suiteInfo);
  }

  startScenarioCucumber(scenario) {
    this.currentIsScenario = true;
    const scenarioObject = new Scenario(scenario);
    const scenarioDescription = scenarioObject.toString();
    this.agent.sendTestItemRequest(
      {
        type: Constant.TEST_TYPE.TEST,
        description: scenarioDescription,
        name: scenarioObject.name,
      },
      true,
    );
    this.logger.logInfo('Start Scenario Cucumber ', scenario);
  }

  logStepInfo(logLevel, message) {
    this.agent.sendLogItemRequest({
      level: logLevel,
      message: message,
    });
  }

  endScenarioCucumber(scenario) {
    this.currentIsScenario = false;
    const scenarioObject = new Scenario(scenario);
    this.agent.sendTestItemRequest(
      { status: scenarioObject.result.status },
      false,
      false,
    );

    this.logger.logInfo('End Scenario Cucumber ', scenario);
  }

  endSuiteCucumber() {
    this.agent.sendTestItemRequest({}, false, true);
    this.logger.logInfo('End Suite Cucumber');
  }

  endLaunchCucumber() {
    return this.agent.sendLaunchRequest({}, false, true).promise.then(_ => {
      this.logger.logInfo('End Launch Cucumber');
    });
  }
}

exports.CucumberReportAgent = CucumberReportAgent;
