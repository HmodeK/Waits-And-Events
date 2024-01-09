import { Locator, Page } from "@playwright/test";
import { BasePage } from "../infra/base-page";
import { MegaMenu } from "./mega-menu";

export class Header extends BasePage {
    private loginButton: Locator
    private CommerceAndDataTab: Locator
    constructor(page: Page) {
        super(page)
        this.loginButton = page.getByText('איזור אישי')
        this.CommerceAndDataTab = page.getByText('מסחר ונתונים',{exact:true})
        this.initHeader()
    }
    initHeader = async () => {
        await this.page.waitForLoadState("networkidle")
    }
    goToLoginPage = async () => {
        await this.loginButton.click()
    }
    goToStatisticsPage = async () => {
        await this.hoverOnCommerceAndData()
        const menu = new MegaMenu(this.page)
        menu.clickOnTradeStatistics()
    }
    hoverOnCommerceAndData =async () => {
        await this.CommerceAndDataTab.nth(0).hover()
    }
}