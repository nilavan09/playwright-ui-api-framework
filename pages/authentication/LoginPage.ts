import { Locator, Page } from '@playwright/test';

export class LoginPage {
    // Locators for the login form elements
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    // Constructor to initialize locators
    constructor(page: Page) {
        this.emailInput = page.locator('[data-test="form__email-input"]');
        this.passwordInput = page.locator('[data-test="form__password-input"]');
        this.loginButton = page.locator('[data-test="login-submit"]');
    }
    // Method to submit login credentials
    async submitLogin(username: string, password: string) {
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
};




// import { expect, Locator, Page } from '@playwright/test';

// export class LoginPage {
//   readonly page: Page;

//   readonly emailInput: Locator;
//   readonly passwordInput: Locator;
//   readonly loginButton: Locator;

//   constructor(page: Page) {
//     this.page = page;
//     this.emailInput = page.locator('[data-test="form__email-input"]');
//     this.passwordInput = page.locator('[data-test="form__password-input"]');
//     this.loginButton = page.locator('[data-test="login-submit"]');
//   }

//   async navigate(path = '/login') {
//     await this.page.goto(process.env.BASE_URL + path);
//   }

//   async assertLoginFormVisible() {
//     await expect(this.emailInput).toBeVisible();
//     await expect(this.passwordInput).toBeVisible();
//     await expect(this.loginButton).toBeVisible();
//   }

//   async login(email: string, password: string) {
//     await this.emailInput.fill(process.env.EMAIL!);
//     await this.passwordInput.fill(process.env.PASSWORD!);
//     await this.loginButton.click();
//   }
// }
