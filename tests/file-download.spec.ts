import { BrowserWrapper } from "../infra/browser-wrapper";
import { test, expect, Page } from '@playwright/test';
import configJson from "../config.json"
import { Header } from "../logic/header";
import { LoginPage } from "../logic/login-page";
import { SideFilter } from "../logic/side-filter";
import { DailyReviewPage } from "../logic/daily-review-page";
let browser: BrowserWrapper;
let page: Page;

test.describe('test', () => {
    test.beforeAll(async () => {
        browser = new BrowserWrapper;
    });
    test.beforeEach(async () => {
        page = await browser.getPage(configJson.url)
        browser.maximizeWindow()
        const header = new Header(page)
        await header.goToLoginPage()
        const login = new LoginPage(page)
        await login.makeLogin(configJson.loginCredentials.userName, configJson.loginCredentials.password)
        await header.goToStatisticsPage()
    });
    test.afterEach(async () => {
        browser.closeBrowser()
    });

    test('Download Report And Validate The Title', async () => {
        const filter = new SideFilter(page)
        await filter.filterData('מדדי שווי שוק')
        const dailyReviewPage = new DailyReviewPage(page)
        await dailyReviewPage.downloadCsvReview()
        expect(await dailyReviewPage.getFileTitle()).toContain('מדדי שווי שוק')
    })

    test('Download Report And Validate The Records', async () => {
        const filter = new SideFilter(page)
        await filter.filterData('מדדי שווי שוק')
        const dailyReviewPage = new DailyReviewPage(page)
        await dailyReviewPage.downloadCsvReview()
        expect(await dailyReviewPage.getFileRecordsCount()).toBe(await dailyReviewPage.getRecordsCount())
    })
})
