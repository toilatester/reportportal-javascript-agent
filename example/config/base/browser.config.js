const browsers = require('./browser.json');
const DEFAULT_BROWSER = 'chrome';

function getCapability(browserName, isFullScreen) {
  // Change to default if browserName does not exist
  if (!browsers[browserName]) {
    browserName = DEFAULT_BROWSER;
  }
  let cap = browsers[browserName];

  // Check if setting for full screen
  if (isFullScreen) {
    if (cap.browserName === 'chrome') {
      cap.chromeOptions.args.push('--start-maximized');
    }
  }

  return cap;
}

module.exports = {
  getCapability,
};
