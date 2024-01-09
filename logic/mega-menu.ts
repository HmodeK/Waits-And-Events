import { Locator, Page } from "@playwright/test";
import { BasePage } from "../infra/base-page";

export class MegaMenu extends BasePage{
    private tradeStatistics: Locator
    constructor(page:Page){
        super(page)
        this.tradeStatistics = page.getByText('סטטיסטיקות מסחר',{exact:true})
        this.initMenu()
    }
    initMenu =async () => {
        await this.page.waitForLoadState("load")
    }

    clickOnTradeStatistics =async () => {
        await this.tradeStatistics.first().click()
    }
}