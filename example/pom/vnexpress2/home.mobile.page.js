const { BasePage } = require("../base.page");
const { NavBarMobileComponent } = require("./component/mobile/nav-bar.mobile.component");

class HomeMobilePage extends BasePage {
    constructor() {
        super("https://vnexpress.net", "Tin nhanh VnExpress - Đọc báo, tin tức online 24h ");
        this.__navbar = undefined;
    }

    get navBar() {
        if (!this.__navbar) {
            this.__navbar = new NavBarMobileComponent();
        }
        return this.__navbar;
    }
}

exports.HomeMobilePage = HomeMobilePage;
