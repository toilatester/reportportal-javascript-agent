const { Constant, Utils } = require('../helper');
class JasmineAgent {
  constructor(reportAgent, allowSendScreenShot) {
    this.reportAgent = reportAgent;
    this.allowSendScreenShot = !allowSendScreenShot
      ? true
      : allowSendScreenShot;
  }

  jasmineStarted() {
    beforeAll(done => {
      done();
    });

    beforeEach(done => {
      done();
    });

    afterEach(done => {
      done();
      // const fileName =
      //   'AttachmentPicutre_' +
      //   Math.floor(Math.random() * 10000000000).toString();
      // Utils.takeScreenshot(fileName).then(
      //   fileObject => {
      //     fileObject = this.allowSendScreenShot ? fileObject : null;
      //     this.reportAgent
      //       .sendLogItemRequest(
      //         {
      //           level: Constant.LOG_LEVEL.INFO,
      //           message: 'Capture Screenshot After Test Done'
      //         },
      //         fileObject
      //       )
      //       .promise.then(_ => {
      //         done();
      //       });
      //   },
      //   err => {
      //     this.reportAgent
      //       .sendLogItemRequest({
      //         level: Constant.LOG_LEVEL.ERROR,
      //         message: JSON.stringify(err)
      //       })
      //       .promise.then(_ => {
      //         done();
      //       });
      //   }
      // );
    });

    afterAll(done => {
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
    let promise = Promise.resolve(null);
    if (this.allowSendScreenShot) {
      promise = Utils.takeScreenshot(spec.fullName);
    }
    promise.then(fileObject => {
      this.sendTestDoneMessage(spec, fileObject);
    });
    this.reportAgent.sendTestItemRequest({ status: spec.status }, false, false);
    // this.sendTestDoneMessage(spec);
    // this.reportAgent.sendTestItemRequest({ status: spec.status }, false, false);
  }

  suiteDone() {
    this.reportAgent.sendTestItemRequest({}, false, true);
  }

  jasmineDone() {}

  sendTestDoneMessage(spec, fileObject) {
    if (spec.status === 'failed') {
      const response = this.reportAgent.sendLogItemRequest(
        {
          level: Constant.LOG_LEVEL.ERROR,
          message: this.getFailuresMessage(spec)
        },
        fileObject
      );
      return response;
    } else {
      const response = this.reportAgent.sendLogItemRequest(
        {
          level: Constant.LOG_LEVEL.INFO,
          message: JSON.stringify(spec)
        },
        fileObject
      );
      return response;
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
