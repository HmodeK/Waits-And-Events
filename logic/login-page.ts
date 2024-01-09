import { Locator, Page } from "@playwright/test";
import { BasePage } from "../infra/base-page";

export class LoginPage extends BasePage {
    private emailInput: Locator
    private passwordInput: Locator
    private loginButton: Locator
    constructor(page: Page) {
        super(page)
        this.emailInput = page.locator('#email-login')
        this.passwordInput = page.locator('#password-login')
        this.loginButton = page.locator('#btn-login')
        this.initPage()
    }
    initPage = async () => {
        await this.page.waitForLoadState("domcontentloaded")
    }
    fillEmail = async (email: string) => {
        await this.emailInput.type(email,{delay:100})
    }
    fillPassword = async (password: string) => {
        await this.passwordInput.type(password,{delay:100})
    }
    clickLoginButton = async () => {
        await this.loginButton.click()
    }
    makeLogin =async (email:string,password:string) => {
        await this.fillEmail(email)
        await this.fillPassword(password)
        await this.clickLoginButton()
    }
}