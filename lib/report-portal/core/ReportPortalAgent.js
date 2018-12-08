const { AbstractAgent } = require('./AbstractAgent');
const ReportportalClient = require('reportportal-client');
const { Constant, AgentContex } = require('../helper');

function launchRequestBody() {
  return {
    description: '',
    name: '',
    tags: [],
  };
}

function testRequestBody() {
  return {
    type: '',
    description: '',
    name: '',
  };
}

function logRequestBody() {
  return {
    level: '',
    message: '',
  };
}

const finishItemRequestBody = () => {
  return {
    status: '',
  };
};

class ReportPortalAgent extends AbstractAgent {
  /**
   * Create a client for RP.
   * @param {Object} params - Config object.
   * params should look like this
   * {
   *      token: "00000000-0000-0000-0000-000000000000",
   *      endpoint: "http://localhost:8080/api/v1",
   *      launch: "YOUR LAUNCH NAME",
   *      project: "PROJECT NAME",
   * }
   */
  constructor(config) {
    super(config);
    this.agentContex = new AgentContex();
    this.checkConnection(this.client);
  }

  /**
   *
   * @param {Object} config
   */
  __createAgentClient(config) {
    if (!this.client) {
      return new ReportportalClient(config);
    }
    return this.client;
  }
  /**
   *
   * @param {ReportportalClient} client
   * param initial from reportportal-client
   */
  checkConnection(client) {
    client.checkConnect().then(
      response => {
        this.logger.logInfo('CHECK AgentClient: ', this.client);
        this.logger.logInfo(`Check Connect Pass: `, response);
      },
      error => {
        this.logger.logError('CHECK AgentClient: ', this.client);
        this.logger.logError(`CHECK CONNECT FAIL: `, error);
      },
    );
  }

  /**
   *
   * @param {Object} launchInfo
   *
   * params should look like this with isStartLaunch=true
   * launchInfo = {}
   *
   * params should look like this with isStartLaunch=false,isAutoDectectStatus=true
   * launchInfo = {}
   *
   *
   * params should look like this with isStartLaunch=false,isAutoDectectStatus=false
   * TestStatus can get from Constant.TEST_STATUS
   * launchInfo = {status:"PASSED"}
   *
   * @param {Boolean} isStartLaunch
   *
   * Param to send start launch or finish launch
   *
   * @param {Boolean} isAutoDectectStatus
   *
   * Pram to send finish launch with
   */
  sendLaunchRequest(launchInfo, isStartLaunch, isAutoDectectStatus) {
    if (isStartLaunch) {
      return this.__startLaunchItem(launchInfo);
    } else {
      return this.__finishLaunchItem(launchInfo, isAutoDectectStatus);
    }
  }

  /**
   * Private method
   * @param {Object} launchInfo
   */
  __startLaunchItem(launchInfo = {}) {
    const launchItemBody = this.requestDataBodyBuilder(
      launchRequestBody,
      launchInfo,
      true,
    );
    const launchObject = this.dispatchAgentRequest(
      this.client.startLaunch,
      launchItemBody,
    );
    this.logger.logInfo(`START LAUNCH: `, launchObject, launchItemBody);
    this.agentContex.setItem(Constant.TEST_TYPE.LAUNCH, launchObject.tempId);
    return launchObject;
  }

  /**
   *
   * @param {Object} launchInfo
   * @param {Boolean} isAutoDectectStatus
   */
  __finishLaunchItem(launchInfo, isAutoDectectStatus) {
    const { launchItem } = this.agentContex.getItem();
    const launchItemBody = this.requestDataBodyBuilder(
      finishItemRequestBody,
      launchInfo,
      isAutoDectectStatus,
    );
    const launchObject = this.dispatchAgentRequest(
      this.client.finishLaunch,
      launchItem,
      launchItemBody,
    );
    this.agentContex.finishItem();
    this.logger.logInfo('FINISH LAUNCH ', launchObject, launchItemBody);
    return launchObject;
  }

  /**
   *
   * @param {Boolean} itemInfo
   *
   * params should look like this with isStartItem=true
   * itemInfo = {
   *   type: 'TEST',
   *   description: 'TEST DESCRIPTION',
   *   name: 'TEST METHOD NAME',
   * }
   *
   * params should look like this with isStartItem=false and isAutoDectectStatus=false
   * TestStatus can get from Constant.TEST_STATUS
   * itemInfo = {
   *   status: 'PASSED'
   * }
   *
   * params should look like this with isStartItem=false and isAutoDectectStatus=true
   * itemInfo = {}
   *
   *
   * @param {Object} isStartItem
   * @param {Object} isAutoDectectStatus
   */
  sendTestItemRequest(itemInfo, isStartItem, isAutoDectectStatus) {
    const allowEmptyItemInfo = false;
    if (isStartItem) {
      return this.__startTestItem(itemInfo, allowEmptyItemInfo);
    } else {
      return this.__finishTestItem(itemInfo, isAutoDectectStatus);
    }
  }
  /**
   * Private method
   * @param {Object} itemInfo
   * @param {Boolean} allowEmptyItemInfo
   */
  __startTestItem(itemInfo, allowEmptyItemInfo) {
    this.agentContex.setState(itemInfo.type);
    const { launchItem, parentItem } = this.agentContex.getItem();
    const testItemBody = this.requestDataBodyBuilder(
      testRequestBody,
      itemInfo,
      allowEmptyItemInfo,
    );
    const testObject = this.dispatchAgentRequest(
      this.client.startTestItem,
      testItemBody,
      launchItem,
      parentItem,
    );
    this.logger.logInfo(`START ${itemInfo.type}: `, testObject, testItemBody);
    this.agentContex.setItem(itemInfo.type, testObject.tempId);
    return testObject;
  }

  /**
   * Private method
   * @param {Object} itemInfo
   * @param {Boolean} allowEmptyItemInfo
   */
  __finishTestItem(itemInfo, allowEmptyItemInfo) {
    const { currentItem } = this.agentContex.getItem();
    const testItemBody = this.requestDataBodyBuilder(
      finishItemRequestBody,
      itemInfo,
      allowEmptyItemInfo,
    );
    const testObject = this.dispatchAgentRequest(
      this.client.finishTestItem,
      currentItem,
      testItemBody,
    );
    this.agentContex.finishItem();
    this.logger.logInfo(
      `FINISH ${this.agentContex.state.getCurrentState()}`,
      testObject,
      testItemBody,
    );
    return testObject;
  }
  /**
   *
   * @param {Object} itemInfo
   * LogLevel can get from Constant.LOG_LEVEL
   * params should look like this with
   * itemInfo = {
   *   level: INFO,
   *   message: 'Sample message',
   * }
   *
   *  @param {Object} fileObject
   *
   *  params should look like this
   *  fileObject = {
   *   type: image/png,
   *   name: fileName,
   *   content: Base64String,
   *  }
   *
   *  @param {String} parrentId
   *
   *  Allow user to attach specific item to attach log
   */
  sendLogItemRequest(itemInfo, fileObject, parrentId) {
    const allowEmptyItemInfo = false;
    const { currentItem } = this.agentContex.getItem();
    // Allow user send log with specific itemId
    // If parameter is not input agent will get the current item in contex
    const attachItemId = parrentId ? parrentId : currentItem;
    const testItemBody = this.requestDataBodyBuilder(
      logRequestBody,
      itemInfo,
      allowEmptyItemInfo,
    );
    this.dispatchAgentRequest(
      this.client.sendLog,
      attachItemId,
      testItemBody,
      fileObject,
    );
    this.logger.logInfo(
      `SEND LOG ${this.agentContex.state.getCurrentState()}`,
      testItemBody,
    );
  }
}
exports.ReportPortalAgent = ReportPortalAgent;
