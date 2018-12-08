'use strict';
const { setDefaultTimeout } = require('cucumber');
const { cucumberAgent } = require('../../config/protractor.cucumber.config');
const {
  CucumberReportHook
} = require('../../../lib/report-portal/cucumber-js');
const DEFAULT_TIMEOUT = 60000;

CucumberReportHook(cucumberAgent);
setDefaultTimeout(DEFAULT_TIMEOUT);
