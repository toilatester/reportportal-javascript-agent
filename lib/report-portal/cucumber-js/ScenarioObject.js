const { Constant } = require('../helper');
class Scenario {
  constructor(scenario) {
    this.pickle = scenario.pickle;
    this.featureLocation = scenario.sourceLocation.uri;
    this.name = scenario.pickle.name;
    this.tag = scenario.pickle.tags;
    this.result = scenario.result;
    this.stepsObject = scenario.pickle.steps.map(step => {
      return this.testStepObject(step);
    });
  }

  testStepObject(stepRawData) {
    const StepObject = class {
      constructor(step) {
        this.stepName = step.text;
        this.arguments = step.arguments;
        this.stepLocation = step.locations;
        this.stepStatus = Constant.TEST_STATUS.PENDING;
      }
    };
    return new StepObject(stepRawData);
  }

  setStepStatus(status) {
    this.stepStatus = status;
  }
  toString() {
    const stepsName = this.stepsObject
      .map(step => {
        return step.stepName;
      })
      .join('\n');
    return `Run feature file: ${this.featureLocation}\nScenario name: ${
      this.name
    }\nSteps:\n${stepsName}
    `;
  }
}

exports.Scenario = Scenario;
