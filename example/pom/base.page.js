const { action } = require('../core/actions');
const { wait } = require('../core/wait');

class BasePage {
  constructor(url, title) {
    this.url = url;
    this.title = title;
  }

  async openPage() {
    await action.navigate(this.url);
    await wait.waitForUrlContains(this.url);
  }

  async openPageWithRedirect() {
    await action.navigate(this.url);
  }
}

exports.BasePage = BasePage;
