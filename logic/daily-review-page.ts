import { Locator, Page } from "@playwright/test";
import { BasePage } from "../infra/base-page";
import { CsvReader } from "./csv-reader";
import configJson from "../config.json";
export class DailyReviewPage extends BasePage {
    private downloadReviewButton: Locator
    private csvDownloadButton: Locator
    private totalRecors: Locator
    private filePath: string = configJson.downloads_folder
    constructor(page: Page) {
        super(page)
        this.downloadReviewButton = page.locator('//button[@aria-label="הורדת נתונים"]')
        this.totalRecors = page.locator('//div[@class="main_table_top_row clearfix"]//span[2]')
        this.csvDownloadButton = page.getByText('CSV', { exact: true })
        this.initPage()
    }

    initPage = async () => {
        await this.page.waitForLoadState("load")
    }

    downloadCsvReview = async () => {
        await this.downloadReviewButton.click()
        await this.csvDownloadButton.click()
        const downloadPromise = this.page.waitForEvent('download')
        const download = await downloadPromise;
        this.filePath += `${await this.getFormattedDateTime()}.csv`
        await download.saveAs(this.filePath)
    }

    getFileTitle = async (): Promise<string> => {
        const csvReader = new CsvReader(this.filePath);
        const csvData = csvReader.readCSV();
        return Object.keys((await csvData).at(0)).toString()
    }

    getFileRecordsCount = async (): Promise<number> => {
        const csvReader = new CsvReader(this.filePath);
        const csvData = csvReader.readCSV();
        return (await csvData).length - 2
    }

    getRecordsCount = async (): Promise<number> => {
        await this.totalRecors.waitFor()
        return await this.extractNumberFromString(await this.totalRecors.innerText())
    }
    

    getFormattedDateTime = async (): Promise<string> => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;
    }
    extractNumberFromString = async (string: string): Promise<number> => {
        const matches = string.match(/\d+/);
        return matches ? Number(matches[0]) : 0;
    }
}