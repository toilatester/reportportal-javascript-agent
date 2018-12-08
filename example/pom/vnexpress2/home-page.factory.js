const { HomePage } = require("./home.page");
const { HomeMobilePage } = require("./home.mobile.page");
const info = require("../../config/currentSessionInfo.json");

class HomePageFactory {
    constructor() {
        this.__loadPlatform();
    };

    /**
     * This function load default platform which is determined by --capability options 
     * and stored value in config/currentSessionInfo.json
     */
    __loadPlatform() {
        const simulator = info.browser.simulator;
        if (Object.keys(simulator).length === 0) {
            this.platform = "desktop";
            this.class = HomePage;
        }
        else {
            this.platform = "mobile";
            this.class = HomeMobilePage;
        }
    }

    /**
     * 
     * @param {String} platform 
     */
    createPage(platform) {
        platform = (platform) ? platform : this.platform;
        let map = {
            default: this.class,
            desktop: HomePage,
            mobile: HomeMobilePage,
        }
        this.class = map[platform.toLowerCase()] || map["default"];
        return new this.class();
    }
}

exports.HomePageFactory = HomePageFactory;
