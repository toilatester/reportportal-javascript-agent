const { BaseComponent } = require("../../../base.component");
const { action } = require("../../../../core/actions");

class NavBarComponent extends BaseComponent {
    /**
     * 
     * @param {ElementFinder} rootElement 
     * @param {ElementFinder} entryElement 
     */
    constructor(rootElement = $("#main_menu"), entryElement) {
        super(rootElement, entryElement);
        this.menu = {
            VIDEO: {
                src: "//video.vnexpress.net"
            },
            THOISU: {
                src: "/tin-tuc/thoi-su"
            },
            GOCNHIN: {
                src: "/tin-tuc/goc-nhin"
            },
            THEGIOI: {
                src: "/tin-tuc/the-gioi"
            }
        }
    }

    /**
     * 
     * @param {*} menuItem : A properties of menu
     */
    navigateTo(menuItem) {
        let lnkItem = this.childElement(by.xpath(`.//a[@href='${menuItem.src}']`));
        action.click(lnkItem);
    }

    async open() {
        // Do nothing here
        Logger.info("Something here");
    }
}

exports.NavBarComponent = NavBarComponent;