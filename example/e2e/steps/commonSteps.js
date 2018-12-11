const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const { LoggerHelper } = require('../../../lib/log4js');
const { browser } = require('protractor');
const logger = new LoggerHelper('Common Step');
Given(/^Sample URL$/, function() {
  items = [
    'http://www.google.com',
    'https://toilatester.wordpress.com/',
    'https://github.com/minhhoangvn',
    'https://github.com/toilatester/reportportal-javascript-agent'
  ];
  const url = items[Math.floor(Math.random() * items.length)];
  logger.logInfo('Given Sample URL ', url);
  this.number = 10;
  return browser.navigate().to(url);
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
