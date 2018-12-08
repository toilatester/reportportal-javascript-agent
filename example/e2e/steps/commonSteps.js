const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const { LoggerHelper } = require('../../../lib/log4js');
const logger = new LoggerHelper('Common Step');
Given('Sample URL', function() {
  logger.logInfo('Given Sample URL');
  this.number = 10;
});

Given('There are {int} cucumbers', function(totalCucumbers) {
  logger.logInfo('There are {int} cucumbers');
  this.sumCucumber = totalCucumbers;
});

When('I Input text to URL', function() {
  logger.logInfo('I Input text to URL');
  this.number += 1;
});

When('I eat {int} cucumbers', function(reduceCucumbers) {
  logger.logInfo('I eat {int} cucumbers');
  this.sumCucumber -= reduceCucumbers;
});

Then('Then console log input URL', function() {
  logger.logInfo('Then console log input URL');
  this.number += 1;
});

Then('I should have {int} cucumbers', function(expectNumber) {
  logger.logInfo('I should have {int} cucumbers');
  expect(expectNumber).to.be.equal(this.sumCucumber);
});

Then('I should have <start> <eat> <left> cucumbers', function(dataTable) {
  logger.logInfo('I should have <start> <eat> <left> cucumbers');
});

Then('It should failed in this step', function() {
  logger.logInfo('It should failed in this step');
  expect(true).to.be.equal(false);
});
