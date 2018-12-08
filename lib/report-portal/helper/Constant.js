const TEST_STATUS = {
  PASSED: 'PASSED',
  FAILED: 'FAILED',
  STOPPED: 'STOPPED',
  SKIPPED: 'SKIPPED',
  RESETED: 'RESETED',
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING',
};

const LOG_LEVEL = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  TRACE: 'trace',
  FATAL: 'fatal',
  UNKNOWN: 'unknown',
};
const TEST_TYPE = {
  LAUNCH: 'LAUNCH',
  SUITE: 'SUITE',
  STORY: 'STORY',
  TEST: 'TEST',
  SCENARIO: 'SCENARIO',
  STEP: 'STEP',
  BEFORE_GROUPS: 'BEFORE_GROUPS',
  BEFORE_METHOD: 'BEFORE_METHOD',
  BEFORE_SUITE: 'BEFORE_SUITE',
  BEFORE_TEST: 'BEFORE_TEST',
  AFTER_GROUPS: 'AFTER_GROUPS',
  AFTER_METHOD: 'AFTER_METHOD',
  AFTER_SUITE: 'AFTER_SUITE',
  AFTER_TEST: 'AFTER_TEST',
};

const ERROR_MESSAGE = (...args) => {
  const errorMessage = args.map(func => JSON.stringify(func()));
  errorMessage.join('\n');
  return `ReportPortal request is invalid \n${errorMessage.join('\n')}`;
};

exports.Constant = {
  TEST_STATUS,
  TEST_TYPE,
  LOG_LEVEL,
  ERROR_MESSAGE,
};
