const { LoggerHelper } = require('../../log4js');
const { Constant, Utils } = require('../helper');
const isGenerator = require('is-generator');
const promisePoly = require('bluebird');
const logger = new LoggerHelper('CucumberReportListener');
const {
  After,
  Before,
  BeforeAll,
  AfterAll,
  setDefinitionFunctionWrapper
} = require('cucumber');

const CucumberReportListener = function(
  agent,
  name = 'Default Suite',
  suiteDescription = 'Test Suite Run With Cucumber-JS'
) {
  const ignoreFunctionHook = [
    'beforeAllReportPortalHook',
    'beforeReportPortalHook',
    'afterReportPortalHook',
    'afterAllReportPortalHook'
  ];
  const dispatchAction = func => {
    try {
      return func();
    } catch (err) {
      logger.logError(err);
      throw err;
    }
  };
  BeforeAll(function beforeAllReportPortalHook() {
    return dispatchAction(() => {
      agent.startLaunchCucumber();
      agent.startSuiteCucumber({ name: name, description: suiteDescription });
      return Promise.resolve();
    });
  });

  Before(function beforeReportPortalHook(scenario) {
    return dispatchAction(() => {
      agent.startScenarioCucumber(scenario);
    });
  });

  setDefinitionFunctionWrapper(function(func) {
    if (isGenerator.fn(func)) {
      return promisePoly.coroutine(wrapperAsyncStepExecute(func));
    }
    if (func.constructor.name === 'AsyncFunction') {
      return wrapperAsyncStepExecute(func);
    }
    return wraperFunction(func);
  });

  function wraperFunction(func) {
    const funcName = func.name;
    if (ignoreFunctionHook.includes(funcName)) {
      return func;
    }
    return wrapperStepFunction(func);
  }

  function wrapperStepFunction(func) {
    return async (...args) => {
      let fileObject = null;
      try {
        await func(...args);
        fileObject = await Utils.takeScreenshot();
        agent.logStepScreenShot(
          Constant.LOG_LEVEL.INFO,
          'Capture ScreenShot After Step',
          fileObject
        );
      } catch (err) {
        logger.logError(err);
        fileObject = await Utils.takeScreenshot();
        agent.logStepInfo(Constant.LOG_LEVEL.ERROR, err.stack);
        agent.logStepScreenShot(
          Constant.LOG_LEVEL.ERROR,
          err.stack,
          fileObject
        );
        throw err;
      }
    };
  }

  function wrapperAsyncStepExecute(func) {
    const funcName = func.name;
    if (ignoreFunctionHook.includes(funcName)) {
      return func;
    }
    return wrapperAsyncStepFunction(func);
  }

  async function wrapperAsyncStepFunction(func) {
    return async (...args) => {
      let fileObject = null;
      try {
        const result = await func(...args);
        fileObject = await Utils.takeScreenshot();
        agent.logStepScreenShot(
          Constant.LOG_LEVEL.INFO,
          'Capture ScreenShot After Step',
          fileObject
        );
        return Promise.resolve(result);
      } catch (err) {
        fileObject = await Utils.takeScreenshot();
        logger.logError(err);
        agent.logStepInfo(Constant.LOG_LEVEL.ERROR, err.stack);
        agent.logStepScreenShot(
          Constant.LOG_LEVEL.ERROR,
          err.stack,
          fileObject
        );
        throw err;
      }
    };
  }

  After(function afterReportPortalHook(scenario) {
    return dispatchAction(() => {
      agent.endScenarioCucumber(scenario);
    });
  });

  AfterAll(function afterAllReportPortalHook() {
    return dispatchAction(() => {
      agent.endSuiteCucumber();
      return agent.endLaunchCucumber();
    });
  });
};

const CucumberReportHook = function(
  agent,
  name = 'Default Suite',
  suiteDescription = 'Test Suite Run With Cucumber-JS'
) {
  if (!agent) {
    logger.logError('Missing ReportAgent Object');
    throw 'Missing ReportAgent Object';
  }
  logger.logInfo('AgentObject ', agent);
  return CucumberReportListener(agent, name, suiteDescription);
};

exports.CucumberReportHook = CucumberReportHook;
