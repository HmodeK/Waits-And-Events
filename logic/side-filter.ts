import { Locator, Page } from "@playwright/test";
import { BasePage } from "../infra/base-page";

export class SideFilter extends BasePage {
    private categoryOptions: Locator
    private filterSubmitButton: Locator
    constructor(page: Page) {
        super(page)
        this.categoryOptions = page.locator('#selectByCutSingle')
        this.filterSubmitButton = page.locator('//div[@class="table_sorting_data"]//button[@aria-label=" סנן רשימה"]')
        this.initFilter()
    }
    initFilter = async () => {
        await this.page.waitForLoadState("load")
    }
    selectCategory = async (category: string) => {
        await this.categoryOptions.selectOption(category)
    }
    submitFilter = async () => {
        await this.filterSubmitButton.click()
    }
    filterData = async (category: string) => {
        await this.selectCategory(category)
        await this.submitFilter()
    }
}