const TEST_TYPE_TO_STATE = {
  LAUNCH: ['LAUNCH'],
  BEFORE_AFTER_SUITE: [
    'BEFORE_SUITE',
    'AFTER_SUITE',
    'BEFORE_GROUPS',
    'AFTER_GROUPS'
  ],
  SUITE: ['SUITE'],
  BEFORE_AFTER_TEST: [
    'BEFORE_TEST',
    'AFTER_TEST',
    'BEFORE_METHOD',
    'AFTER_METHOD'
  ],
  TEST: ['TEST', 'SCENARIO'],
  STEP: ['STEP']
};

const EXECUTION_STATE = {
  LAUNCH: 'LAUNCH',
  BEFORE_AFTER_SUITE: 'BEFORE_AFTER_SUITE',
  SUITE: 'SUITE',
  BEFORE_AFTER_TEST: 'BEFORE_AFTER_TEST',
  TEST: 'TEST',
  BEFORE_AFTER_SCENARIO: 'BEFORE_AFTER_SCENARIO',
  SCENARIO: 'SCENARIO',
  STEP: 'STEP'
};

const setStateProcess = (ctx, stateClazz) => {
  return new stateClazz(ctx);
};

const setContexItemProcess = (ctx, itemId) => {
  ctx.state.setItem(itemId);
  ctx.currentState.push(ctx.state.getCurrentState());
};

const clearContexItemProcess = (ctx, nextStateClazz) => {
  ctx.state.finishItem();
  ctx.currentState.pop();
  if (ctx.state.isEmptyItem()) {
    ctx.state = new nextStateClazz(ctx);
  }
};

const getStateByTestType = type => {
  for (let key of Object.keys(TEST_TYPE_TO_STATE)) {
    const mapValue = TEST_TYPE_TO_STATE[key];
    if (mapValue.includes(type)) {
      return key;
    }
  }
  throw `Test Type ${type} is not map to implemented state`;
};

const returnItemObjectInState = (launchItem, currentItem, parentItem) => {
  return {
    launchItem: launchItem,
    currentItem: currentItem,
    parentItem: parentItem
  };
};

const SET_STATE_REDUCER = {
  LAUNCH: ctx => setStateProcess(ctx, LaunchState),
  BEFORE_AFTER_SUITE: ctx => setStateProcess(ctx, BeforeAfterSuiteState),
  SUITE: ctx => setStateProcess(ctx, SuiteState),
  BEFORE_AFTER_TEST: ctx => setStateProcess(ctx, BeforeAfterTestState),
  TEST: ctx => setStateProcess(ctx, TestState)
};

const SET_ITEM_REDUCER = {
  LAUNCH: (ctx, itemId) => setContexItemProcess(ctx, itemId),
  BEFORE_AFTER_SUITE: (ctx, itemId) => setContexItemProcess(ctx, itemId),
  SUITE: (ctx, itemId) => setContexItemProcess(ctx, itemId),
  BEFORE_AFTER_TEST: (ctx, itemId) => setContexItemProcess(ctx, itemId),
  TEST: (ctx, itemId) => setContexItemProcess(ctx, itemId)
};

const CLEAR_ITEM_REDUCER = {
  LAUNCH: ctx => clearContexItemProcess(ctx, LaunchState),
  BEFORE_AFTER_SUITE: ctx => clearContexItemProcess(ctx, LaunchState),
  SUITE: ctx => clearContexItemProcess(ctx, LaunchState),
  BEFORE_AFTER_TEST: ctx => clearContexItemProcess(ctx, SuiteState),
  TEST: ctx => clearContexItemProcess(ctx, SuiteState)
};

class State {
  constructor(ctx) {
    this.contex = ctx;
  }

  getItem() {
    throw 'Method need to be implemented';
  }

  setItem(itemId) {
    throw 'Method need to be implemented';
  }

  getCurrentState() {
    throw 'Method need to be implemented';
  }

  finishItem() {
    throw 'Method need to be implemented';
  }

  getParentId(parentList) {
    if (!parentList.length) {
      return null;
    }
    return parentList[parentList.length - 1];
  }

  isEmptyItem() {
    throw 'Method need to be implemented';
  }
}

class LaunchState extends State {
  constructor(ctx) {
    super(ctx);
  }

  setItem(itemId) {
    this.contex.launchItem.push(itemId);
  }

  /**
   * Get parent item for launch is null
   * Currently only 1 launch per instance of ReportObjectHolder
   */
  getItem() {
    return returnItemObjectInState(
      this.getParentId(this.contex.launchItem),
      this.getParentId(this.contex.launchItem),
      null
    );
  }

  getCurrentState() {
    return EXECUTION_STATE.LAUNCH;
  }

  finishItem() {
    this.contex.launchItem.pop();
  }

  isEmptyItem() {
    return this.contex.launchItem.length === 0;
  }
}

class BeforeAfterSuiteState extends State {
  constructor(ctx) {
    super(ctx);
  }

  setItem(itemId) {
    this.contex.prePostItem.push(itemId);
  }

  getItem() {
    return returnItemObjectInState(
      this.getParentId(this.contex.launchItem),
      this.getParentId(this.contex.prePostItem),
      this.getParentId(this.contex.prePostItem)
    );
  }

  getCurrentState() {
    return EXECUTION_STATE.BEFORE_AFTER_SUITE;
  }

  finishItem() {
    this.contex.prePostItem.pop();
  }

  isEmptyItem() {
    return this.contex.prePostItem.length === 0;
  }
}

class BeforeAfterTestState extends State {
  constructor(ctx) {
    super(ctx);
  }

  setItem(itemId) {
    this.contex.prePostItem.push(itemId);
  }

  getItem() {
    return returnItemObjectInState(
      this.getParentId(this.contex.launchItem),
      this.getParentId(this.contex.prePostItem),
      this.getParentId(this.contex.suiteItem)
    );
  }

  getCurrentState() {
    return EXECUTION_STATE.BEFORE_AFTER_TEST;
  }

  finishItem() {
    this.contex.prePostItem.pop();
  }

  isEmptyItem() {
    return this.contex.prePostItem.length === 0;
  }
}

class SuiteState extends State {
  constructor(ctx) {
    super(ctx);
  }

  setItem(itemId) {
    this.contex.suiteItem.push(itemId);
  }

  getItem() {
    return returnItemObjectInState(
      this.getParentId(this.contex.launchItem),
      this.getParentId(this.contex.suiteItem),
      this.getParentId(this.contex.suiteItem)
    );
  }

  getCurrentState() {
    return EXECUTION_STATE.SUITE;
  }

  finishItem() {
    this.contex.suiteItem.pop();
  }

  isEmptyItem() {
    return this.contex.suiteItem.length === 0;
  }
}

class TestState extends State {
  constructor(ctx) {
    super(ctx);
  }

  setItem(itemId) {
    this.contex.currentItem.push(itemId);
    this.contex.testItem.push(itemId);
  }

  getItem() {
    return returnItemObjectInState(
      this.getParentId(this.contex.launchItem),
      this.getParentId(this.contex.testItem),
      this.getParentId(this.contex.suiteItem)
    );
  }

  getCurrentState() {
    return EXECUTION_STATE.TEST;
  }

  finishItem() {
    this.contex.currentItem.pop();
    this.contex.testItem.pop();
  }

  isEmptyItem() {
    return this.contex.testItem.length === 0;
  }
}

class AgentContex {
  constructor() {
    this.launchItem = [];
    this.currentItem = [];
    this.suiteItem = [];
    this.testItem = [];
    this.prePostItem = [];
    this.state = new LaunchState(this);
    this.currentState = [];
    this.setItem = this.setItem.bind(this);
  }

  setState(testType) {
    const state = getStateByTestType(testType);
    const setContexState = SET_STATE_REDUCER[state];
    this.state = setContexState(this);
  }

  setItem(testType, itemId) {
    const state = getStateByTestType(testType);
    const setItem = SET_ITEM_REDUCER[state];
    if (!setItem) {
      throw `State ${state} need to be implemente`;
    }
    setItem(this, itemId);
  }

  getItem() {
    return this.state.getItem();
  }

  finishItem() {
    const clearItem = CLEAR_ITEM_REDUCER[this.getCurrentContexState()];
    clearItem(this);
  }

  getCurrentContexState() {
    if (!this.currentState.length) {
      return EXECUTION_STATE.LAUNCH;
    }
    return this.currentState[this.currentState.length - 1];
  }
}

exports.AgentContex = AgentContex;
