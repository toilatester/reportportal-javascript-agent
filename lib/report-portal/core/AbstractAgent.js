const { LoggerHelper } = require('../../log4js');
const { Constant } = require('../helper');
const ReportportalClient = require('reportportal-client');
/**
 *
 */

function mapDataToRequestObject(
  rawRequestBody,
  requestData,
  allowEmptyRequestData,
  ...message
) {
  const isEmptyObject = Object.keys(requestData).length === 0;
  const isInvalidBuildBodyData = isEmptyObject && !allowEmptyRequestData;
  checkValidDataToMapRequest(requestData, isInvalidBuildBodyData, ...message);
  return createRequestObject(
    rawRequestBody,
    requestData,
    allowEmptyRequestData
  );
}

function createRequestObject(
  rawRequestBody,
  requestData,
  allowEmptyRequestData
) {
  if (allowEmptyRequestData) {
    return {};
  }
  return Object.assign(rawRequestBody, requestData);
}

function checkValidDataToMapRequest(
  requestData,
  isInvalidBuildBodyData,
  ...message
) {
  if (!requestData) {
    throw 'Request data Object cannot null';
  }
  if (isInvalidBuildBodyData) {
    const errorMessage = Constant.ERROR_MESSAGE(...message);
    throw `${errorMessage}`;
  }
}

class AbstractAgent {
  /**
   *
   * @param {ReportportalClient} client
   * param initial from reportportal-client
   */
  constructor(config) {
    this.logger = new LoggerHelper('ReportAgentClient');
    this.client = this.__createAgentClient(config);
    this.requestsProcessList = [];
  }

  __createAgentClient(config) {
    throw `NotImplementedError`;
  }

  getClient() {
    return this.client;
  }

  /**
   *
   * @param {*} requestData
   * @param {*} allowEmptyRequestData
   */
  requestDataBodyBuilder(rawRequestBody, requestData, allowEmptyRequestData) {
    const requestBody = rawRequestBody();
    return mapDataToRequestObject(
      requestBody,
      requestData,
      allowEmptyRequestData
    );
  }

  dispatchAgentRequest(func, ...args) {
    try {
      return func.call(this.client, ...args);
    } catch (err) {
      this.logger.logError(err);
      throw err;
    }
  }

  async finishAllAgentRequests() {
    try {
      for (let requestItem of this.requestsProcessList) {
        await requestItem.call(this);
      }
    } catch (err) {
      this.logger.logError(err);
    }
  }
}

exports.AbstractAgent = AbstractAgent;
