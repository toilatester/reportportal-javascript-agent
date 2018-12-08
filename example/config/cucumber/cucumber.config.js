/**
 *
 * @param {*} isReRun is only run previous failed test script which stored in @rerun.txt or run all
 */

function getCucumberOpts(isReRun, tags) {
  tags = tags ? tags : [];
  let opts = {
    require: ['../e2e/steps/*.js', '../e2e/supports/*.js'],
    tags: tags,
    strict: true,
    profile: false,
    'no-source': true,
    format: [
      'json:' + global.REPORT_FOLDER_PATH + '/summary.json',
      // 'rerun:rerun/@rerun.txt'
    ],
  };

  // Setting to only rerun failed test case which are marked in @rerun.txt file
  if (isReRun === true) {
    opts['rerun'] = './rerun/@rerun.txt';
  } else {
    opts.format.push('rerun:rerun/@rerun.txt');
  }
  return opts;
}

module.exports = {
  getCucumberOpts,
};
