const {
  ElementFinder,
  ElementArrayFinder,
  ProtractorBy,
  element,
} = require('protractor');
const { wait } = require('../core/wait');

class BaseComponent {
  /**
   *
   * @param {ElementFinder} rootElement : Root Element of this component
   * @param {ElementFinder} entryElement : Element can be clicked to make this component display on the page. Undefined if not exist
   */
  constructor(rootElement, entryElement) {
    this.setRootElement(rootElement);
    this.entryElement = entryElement;
  }

  /**
   *
   * @param {ElementFinder} rootElement
   */
  async setRootElement(rootElement) {
    if (rootElement) {
      this.rootElement = rootElement;
    } else {
      let defaultSelector = await browser.angularAppRoot();
      this.rootElement = element(by.css(defaultSelector));
    }
  }

  /**
   *
   * @param {ProtractorBy} locator : Something
   * @return {ElementFinder}
   */
  childElement(locator) {
    return this.rootElement.element(locator);
  }

  /**
   *
   * @param {ProtractorBy} locator
   * @return {ElementArrayFinder}
   */
  childElements(locator) {
    return this.rootElement.element.all(locator);
  }

  isDisplayed() {
    return this.rootElement.isDisplayed();
  }

  async waitForDisplay() {
    wait.waitForDisplay(this.rootElement);
  }
}

exports.BaseComponent = BaseComponent;
