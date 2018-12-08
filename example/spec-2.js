const { LoggerHelper } = require('../lib/log4js');
const log = new LoggerHelper('Test Suite A');

describe('Protractor Demo App Spec-2', function() {
  it('should create data successfully Spec 2', function() {
    log.logInfo('Spec 2 Testing Log4js');
    log.logInfo('Error Message for Spec-2');
    expect(3).toEqual(3);
  });

  it('should update data successfully Spec 2', function() {
    log.logInfo('Spec 1 Testing Log4js');
    log.logInfo('Error Message for Spec-2');
    expect(13).toEqual(3);
  });

  it('should edit data successfully Spec 2', function() {
    log.logInfo('Spec 1 Testing Log4js');
    log.logInfo('Error Message for Spec-2');
    expect(13).toEqual(13);
  });

  it('should delete data successfully Spec 2', function() {
    log.logInfo('Spec 1 Testing Log4js');
    log.logInfo('Error Message for Spec-2');
    expect(3).toEqual(3);
  });
});
