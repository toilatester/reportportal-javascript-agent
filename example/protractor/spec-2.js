const { LoggerHelper } = require('../../lib/log4js');
const log = new LoggerHelper('Test');
const { browser } = require('protractor');
describe('Protractor Demo App Spec-2', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('https://github.com/toilatester/reportportal-javascript-agent');
  });
  it('should create data successfully Spec 2', function() {
    console.log('should create data successfully Spec 2 1');
    log.logInfo('should create data successfully Spec 2 1');
    log.logInfo('should create data successfully Spec 2 2');
    log.logInfo('should create data successfully Spec 2 3');
    log.logInfo('should create data successfully Spec 2 4');
    log.logInfo('should create data successfully Spec 2 5');
    expect(3).toEqual(13);
  });

  it('should save data successfully Spec 2', function() {
    console.log('should save data successfully Spec 2 1');
    log.logInfo('should save data successfully Spec 2 1');
    log.logInfo('should save data successfully Spec 2 2');
    log.logInfo('should save data successfully Spec 2 3');
    log.logInfo('should save data successfully Spec 2 4');
    log.logInfo('should save data successfully Spec 2 5');
    expect(3).toEqual(323);
  });

  it('should edit data successfully Spec 2', function() {
    console.log('should edit data successfully Spec 2 1');
    log.logInfo('should edit data successfully Spec 2 1');
    log.logInfo('should edit data successfully Spec 2 2');
    log.logInfo('should edit data successfully Spec 2 3');
    log.logInfo('should edit data successfully Spec 2 4');
    log.logInfo('should edit data successfully Spec 2 5');
    expect(3).toEqual(3);
  });

  it('should update data successfully Spec 2', function() {
    console.log('should update data successfully Spec 2 1');
    log.logInfo('should update data successfully Spec 2 1');
    log.logInfo('should update data successfully Spec 2 1');
    log.logInfo('should update data successfully Spec 2 2');
    log.logInfo('should update data successfully Spec 2 3');
    log.logInfo('should update data successfully Spec 2 4');
    log.logInfo('should update data successfully Spec 2 5');
    expect(3).toEqual(323);
  });
});
