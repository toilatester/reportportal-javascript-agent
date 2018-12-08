const { LoggerHelper } = require('../lib/log4js');
const log = new LoggerHelper('Test Suite B');

describe('Protractor Demo App Spec-1', function() {
  it('should create data successfully Spec 1', function() {
    log.logInfo('Spec 1 Testing Log4js');
    log.logInfo('Error Message for Spec-1');
    expect(3).toEqual(3);
  });

  it('should save data successfully Spec 1', function() {
    log.logInfo('Spec 1 Testing Log4js');
    log.logInfo('Error Message for Spec-1');
    expect(3).toEqual(3);
  });

  it('should edit data successfully Spec 1', function() {
    log.logInfo('Spec 1 Testing Log4js');
    log.logInfo('Error Message for Spec-1');
    expect(3).toEqual(3);
  });

  it('should update data successfully Spec 1', function() {
    log.logInfo('Spec 1 Testing Log4js');
    log.logInfo('Error Message for Spec-1');
    expect(3).toEqual(3);
  });
});
