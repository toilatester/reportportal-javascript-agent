const { BasePage } = require("../base.page");
const { NavBarComponent } = require("./component/desktop/nav-bar.component");

class HomePage extends BasePage {
    constructor() {
        super("https://vnexpress.net", "Tin nhanh VnExpress - Đọc báo, tin tức online 24h ");
        this.__navbar = undefined;
    }

    get navBar() {
        if (!this.__navbar) {
            this.__navbar = new NavBarComponent();
        }
        return this.__navbar;
    }
}

exports.HomePage = HomePage;
