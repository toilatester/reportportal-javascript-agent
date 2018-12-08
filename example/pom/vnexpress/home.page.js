const { BasePage } = require("../base.page");
const { NavBarComponent, NavBarMobileComponent } = require("./component");
const info = require("../../config/currentSessionInfo.json");

const env = info.browser.simulator;

class HomePage extends BasePage {
    constructor() {
        super("https://vnexpress.net", "Tin nhanh VnExpress - Đọc báo, tin tức online 24h ");
        this.__navbar = undefined;
    }

    /**
     * @returns {NavBarComponent}
     */
    get navBar() {
        if (!this.__navbar) {
            switch (Object.keys(env).length === 0) {
                case true:
                    this.__navbar = new NavBarComponent();
                    break;
                case false:
                    this.__navbar = new NavBarMobileComponent();
                    break;
                default:
                    this.__navbar = new NavBarMobileComponent();
                    break;
            }
        }
        return this.__navbar;
    }
}

exports.HomePage = HomePage;