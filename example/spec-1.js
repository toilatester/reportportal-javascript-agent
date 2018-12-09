const { LoggerHelper } = require('../lib/log4js');
const log = new LoggerHelper('Test');
const { browser } = require('protractor');
describe('Protractor Demo App Spec-1', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('https://www.google.com');
  });
  // it('should create data successfully Spec 1', function() {
  //   log.logInfo('Spec 1 Testing Log4js');
  //   expect(3).toEqual(3);
  // });

  // it('should save data successfully Spec 1', function() {
  //   log.logInfo('Spec 1 Testing Log4js');
  //   expect(3).toEqual(323);
  // });

  // it('should edit data successfully Spec 1', function() {
  //   log.logInfo('Spec 1 Testing Log4js');
  //   expect(3).toEqual(3);
  // });

  it('should update data successfully Spec 1', function() {
    log.logInfo('Spec 1 Testing Log4js');
    expect(3).toEqual(323);
  });
});
