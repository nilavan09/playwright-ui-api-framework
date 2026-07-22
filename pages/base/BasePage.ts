import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigation
    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
        await this.waitForPageLoad();
    }

    async reloadPage(): Promise<void> {
        await this.page.reload();
        await this.waitForPageLoad();
    }

    // Actions
    async click(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "visible" });
        await locator.click();
    }

    async fill(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: "visible" });
        await locator.fill(value);
    }

    async press(locator: Locator, key: string): Promise<void> {
        await locator.press(key);
    }

    async hover(locator: Locator): Promise<void> {
        await locator.hover();
    }

    // Getters
    async getText(locator: Locator): Promise<string> {
        return (await locator.innerText()).trim();
    }

    async getTitle(): Promise<string> {
        return this.page.title();
    }

    async getUrl(): Promise<string> {
        return this.page.url();
    }

    // Assertions
    async expectVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    // Waits
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState("networkidle");
    }

    async waitForVisible(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "visible" });
    }

    async waitForHidden(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "hidden" });
    }

    async waitForAttached(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "attached" });
    }

    async waitForDetached(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "detached" });
    }
}