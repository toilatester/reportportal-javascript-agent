const { LoggerHelper } = require('../../lib/log4js');
const log = new LoggerHelper('Test');
const { browser } = require('protractor');
describe('Protractor Demo App Spec-1', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('https://www.google.com');
  });
  it('should create data successfully Spec 1', function() {
    console.log('should create data successfully Spec 1 1');
    log.logInfo('should create data successfully Spec 1 1');
    log.logInfo('should create data successfully Spec 1 2');
    log.logInfo('should create data successfully Spec 1 3');
    log.logInfo('should create data successfully Spec 1 4');
    log.logInfo('should create data successfully Spec 1 5');
    expect(3).toEqual(3);
  });

  it('should save data successfully Spec 1', function() {
    console.log('should save data successfully Spec 1 1');
    log.logInfo('should save data successfully Spec 1 1');
    log.logInfo('should save data successfully Spec 1 2');
    log.logInfo('should save data successfully Spec 1 3');
    log.logInfo('should save data successfully Spec 1 4');
    log.logInfo('should save data successfully Spec 1 5');
    expect(3).toEqual(323);
  });

  it('should edit data successfully Spec 1', function() {
    console.log('should edit data successfully Spec 1 1');
    log.logInfo('should edit data successfully Spec 1 1');
    log.logInfo('should edit data successfully Spec 1 2');
    log.logInfo('should edit data successfully Spec 1 3');
    log.logInfo('should edit data successfully Spec 1 4');
    log.logInfo('should edit data successfully Spec 1 5');
    expect(3).toEqual(3);
  });

  it('should update data successfully Spec 1', function() {
    console.log('should update data successfully Spec 1 1');
    log.logInfo('should update data successfully Spec 1 1');
    log.logInfo('should update data successfully Spec 1 2');
    log.logInfo('should update data successfully Spec 1 3');
    log.logInfo('should update data successfully Spec 1 4');
    log.logInfo('should update data successfully Spec 1 5');
    expect(3).toEqual(323);
  });
});
