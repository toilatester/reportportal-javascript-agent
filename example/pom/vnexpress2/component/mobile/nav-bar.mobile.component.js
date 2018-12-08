const { NavBarComponent } = require("../desktop/nav-bar.component");
const { action } = require("../../../../core/actions");
const { wait } = require("../../../../core/wait");

class NavBarMobileComponent extends NavBarComponent {
    constructor() {
        super($("#main_meu"), $("#header .btn_control_menu"));
    }

    async open() {
        Logger.info("Try to open nav bar in mobile env...");
        await action.click(element(by.css("#header .btn_control_menu")));
        await wait.waitForDisplay(this.rootElement);
    }
}

exports.NavBarMobileComponent = NavBarMobileComponent;