const { Constant, Utils } = require('../helper');
class JasmineAgent {
  constructor(reportAgent, allowSendScreenShot) {
    this.reportAgent = reportAgent;
    this.allowSendScreenShot = !allowSendScreenShot
      ? true
      : allowSendScreenShot;
    this.__async_flow = [];
    this.jasmineStarted = this.jasmineStarted.bind(this);
  }

  jasmineStarted() {
    beforeAll(async done => {
      this.__async_flow = [];
      await this.reportAgent.sendLaunchRequest({}, true);
      done();
    });
    /**
     * Currently Jasminse v2.x does not support hook with async
     * and we use afterEach method to capture screenshot after test
     */
    afterEach(async done => {
      let fileObjectPromise = null;
      if (this.allowSendScreenShot) {
        const fileName =
          'SceenShot_' + Math.floor(Math.random() * 10000000000).toString();
        fileObjectPromise = await Utils.takeScreenshot();
      }
      const fileObject = await fileObjectPromise;
      this.reportAgent.sendLogItemRequest(
        {
          level: Constant.LOG_LEVEL.INFO,
          message: 'Capture ScreenShot After Test'
        },
        fileObject
      );
      done();
    });

    afterAll(async done => {
      await this.reportAgent.finishAllAgentRequests();
      await this.reportAgent.sendLaunchRequest({}, false, true);
      done();
    });
  }

  suiteStarted(suite) {
    this.reportAgent.sendTestItemRequest(
      {
        type: Constant.TEST_TYPE.SUITE,
        description: suite.description,
        name: suite.fullName
      },
      true
    );
  }

  specStarted(spec) {
    this.reportAgent.sendTestItemRequest(
      {
        type: Constant.TEST_TYPE.TEST,
        description: spec.description,
        name: spec.fullName
      },
      true
    );
  }

  specDone(spec) {
    this.sendTestDoneMessage(spec);
    this.reportAgent.sendTestItemRequest({ status: spec.status }, false, false);
  }

  suiteDone() {
    this.reportAgent.sendTestItemRequest({}, false, true);
  }

  jasmineDone() {}

  sendTestDoneMessage(spec) {
    if (spec.status === 'failed') {
      return this.reportAgent.sendLogItemRequest({
        level: Constant.LOG_LEVEL.ERROR,
        message: this.getFailuresMessage(spec)
      });
    } else {
      return this.reportAgent.sendLogItemRequest({
        level: Constant.LOG_LEVEL.INFO,
        message: JSON.stringify(spec)
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
