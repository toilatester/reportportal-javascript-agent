const { action } = require("../../core/actions");
const { BasePage } = require("../base.page");
const Localize = require("localize");
const path = require("path");
const { element, browser, by } = require("protractor");
const info = require("../../config/currentSessionInfo.json");

const env = info.browser.simulator;

class HomePage extends BasePage {
    constructor() {
        super("https://localizejs.com/");
        this.__navbar = undefined;
        this.messages = new Localize(path.join(__projectRoot, "localization", "localizejs"));
    }

    get btnCurrentLang() {
        return element(by.id("localize-current"));
    }

    get lstLanguage() {
        return element(by.id("localize-langs"));
    }

    async changeLanguage(language) {
        let btnLang = this.lstLanguage.element(by.xpath(`.//a[contains(@onclick,'${language}')]`));
        await action.hover(this.btnCurrentLang);
        await action.click(btnLang);
    }

    expectedTitle(language) {
        this.messages.setLocale(language);
        return this.messages.translate("title");
    }
}

exports.HomePage = HomePage;
