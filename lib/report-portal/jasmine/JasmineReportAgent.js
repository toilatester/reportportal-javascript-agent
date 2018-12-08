const { Constant } = require('../helper');
const { LoggerHelper } = require('../../log4js');
const logger = new LoggerHelper('JasmineAgent');
class JasmineAgent {
  constructor(reportAgent) {
    this.reportAgent = reportAgent;
  }

  jasmineStarted(info) {
    logger.logInfo(
      '============================ jasmineStarted ============================',
    );
    this.reportAgent.sendLaunchRequest({}, true);
    logger.logInfo(info);
  }

  suiteStarted(suite) {
    logger.logInfo(
      '============================ suiteStarted ============================',
    );
    logger.logInfo(suite);
    this.reportAgent.sendTestItemRequest(
      {
        type: Constant.TEST_TYPE.SUITE,
        description: suite.description,
        name: suite.fullName,
      },
      true,
    );
  }

  specStarted(spec) {
    logger.logInfo(
      '============================ specStarted ============================',
    );
    logger.logInfo(spec);
    this.reportAgent.sendTestItemRequest(
      {
        type: Constant.TEST_TYPE.TEST,
        description: spec.description,
        name: spec.fullName,
      },
      true,
    );
  }

  specDone(spec) {
    logger.logInfo(
      '============================ specDone ============================',
    );
    logger.logInfo(spec);
    this.sendTestDoneMessage(spec);
    this.reportAgent.sendTestItemRequest({ status: spec.status }, false, false);
  }

  suiteDone(suite) {
    logger.logInfo(
      '============================ suiteDone ============================',
    );
    logger.logInfo(suite);
    this.reportAgent.sendTestItemRequest({}, false, true);
  }

  jasmineDone(info) {
    logger.logInfo(
      '============================ jasmineDone ============================',
    );
    logger.logInfo(info);
  }

  sendTestDoneMessage(spec) {
    if (spec.status === 'failed') {
      this.reportAgent.sendLogItemRequest({
        level: Constant.LOG_LEVEL.ERROR,
        message: this.getFailuresMessage(spec),
      });
    } else {
      this.reportAgent.sendLogItemRequest({
        level: Constant.LOG_LEVEL.INFO,
        message: JSON.stringify(spec),
      });
    }
  }

  getFailuresMessage(spec) {
    let failures = [];
    spec.failedExpectations.forEach(failure => {
      failures.push(`message: ${this.escapeMarkdown(failure.message)}`);
      failures.push(`stackTrace: ${this.escapeMarkdown(failure.stack)}`);
    });
    return failures.join('\n');
  }
  escapeMarkdown(string) {
    return string.replace(/_/gm, '\\_').replace(/\*/gm, '\\*');
  }
}

exports.JasmineAgent = JasmineAgent;
