const { Constant, Utils } = require('../helper');
class JasmineAgentDebug {
  constructor(reportAgent, allowSendScreenShot) {
    this.reportAgent = reportAgent;
    this.allowSendScreenShot = !allowSendScreenShot
      ? true
      : allowSendScreenShot;
    this.__async_flow = [];
  }

  jasmineStarted() {
    const _this = this;
    beforeAll(done => {
      console.log('beforeAll');
      _this.__async_flow = [];
      done();
    });
    afterAll(async done => {
      console.log('afterAll');
      for (let flow of _this.__async_flow) {
        const response = await flow();
        console.log('processAgentRequests debug ', response);
      }
      done();
    });
  }

  suiteStarted(suite) {
    console.log('============ Suite Start ================');
    this.__async_flow.push(() => {
      console.log('Invoke suiteStarted');
      return Promise.resolve(suite);
    });
    // beforeAll(done => {
    //   console.log('suiteStarted beforeAll ', suite);
    //   this.reportAgent
    //     .sendTestItemRequest(
    //       {
    //         type: Constant.TEST_TYPE.SUITE,
    //         description: suite.description,
    //         name: suite.fullName,
    //       },
    //       true,
    //     )
    //     .then(_ => {
    //       done();
    //     });
    // });
    // this.reportAgent.sendTestItemRequest(
    //   {
    //     type: Constant.TEST_TYPE.SUITE,
    //     description: suite.description,
    //     name: suite.fullName,
    //   },
    //   true,
    // );
  }

  specStarted(spec) {
    console.log('================ Spec Start ================');
    this.__async_flow.push(() => {
      console.log('Invoke specStarted');
      return Promise.resolve(spec);
    });
    // beforeEach(done => {
    //   console.log('specStarted beforeEach ', spec);
    //   this.reportAgent
    //     .sendTestItemRequest(
    //       {
    //         type: Constant.TEST_TYPE.TEST,
    //         description: spec.description,
    //         name: spec.fullName,
    //       },
    //       true,
    //     )
    //     .then(_ => {
    //       done();
    //     });
    // });
    // this.reportAgent.sendTestItemRequest(
    //   {
    //     type: Constant.TEST_TYPE.TEST,
    //     description: spec.description,
    //     name: spec.fullName,
    //   },
    //   true,
    // );
  }

  specDone(spec) {
    console.log('================ Spec End ================');
    this.__async_flow.push(() => {
      console.log('Invoke specDone');
      return Promise.resolve(spec);
    });
    // beforeEach(done => {
    //   console.log('specDone beforeEach ', spec);
    //   let promise = Promise.resolve(null);
    //   if (this.allowSendScreenShot) {
    //     promise = Utils.takeScreenshot(spec.fullName);
    //   }
    //   promise.then(fileObject => {
    //     this.sendTestDoneMessage(spec, fileObject, null, () =>
    //       this.reportAgent
    //         .sendTestItemRequest({ status: spec.status }, false, false)
    //         .then(_ => {
    //           done();
    //         }),
    //     );
    //   });
    // });
    // let promise = Promise.resolve(null);
    // if (this.allowSendScreenShot) {
    //   promise = Utils.takeScreenshot(spec.fullName);
    // }
    // promise.then(fileObject => {
    //   this.sendTestDoneMessage(spec, fileObject, null, () =>
    //     this.reportAgent.sendTestItemRequest(
    //       { status: spec.status },
    //       false,
    //       false,
    //     ),
    //   );
    // });
    // this.reportAgent.sendTestItemRequest({ status: spec.status }, false, false);
    // this.sendTestDoneMessage(spec);
    // this.reportAgent.sendTestItemRequest({ status: spec.status }, false, false);
  }

  suiteDone(suite) {
    console.log('================ Suite End ================');
    this.__async_flow.push(() => {
      console.log('Invoke suiteDone');
      return Promise.resolve(suite);
    });
    // this.reportAgent.sendTestItemRequest({}, false, true);
  }

  jasmineDone() {}

  sendTestDoneMessage(spec, fileObject, callback) {
    if (spec.status === 'failed') {
      const response = this.reportAgent.sendLogItemRequest(
        {
          level: Constant.LOG_LEVEL.ERROR,
          message: this.getFailuresMessage(spec),
        },
        fileObject,
        null,
        callback,
      );
      return response;
    } else {
      const response = this.reportAgent.sendLogItemRequest(
        {
          level: Constant.LOG_LEVEL.INFO,
          message: JSON.stringify(spec),
        },
        fileObject,
        null,
        callback,
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

exports.JasmineAgentDebug = JasmineAgentDebug;
