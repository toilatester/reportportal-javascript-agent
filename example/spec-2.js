const { LoggerHelper } = require('../lib/log4js');
const log = new LoggerHelper('Test');
const { browser } = require('protractor');
describe('Protractor Demo App Spec-2', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('https://github.com/toilatester/reportportal-javascript-agent');
  });

  it('should create data successfully Spec 2', function() {
    log.logInfo('Spec 2 Testing Log4js');
    expect(3).toEqual(3);
  });

  // it('should update data successfully Spec 2', function() {
  //   log.logInfo('Spec 1 Testing Log4js');
  //   expect(13).toEqual(131);
  // });

  // it('should edit data successfully Spec 2', function() {
  //   log.logInfo('Spec 1 Testing Log4js');
  //   expect(13).toEqual(313);
  // });

  // it('should delete data successfully Spec 2', function() {
  //   log.logInfo('Spec 1 Testing Log4js');
  //   expect(3).toEqual(13);
  // });
});
