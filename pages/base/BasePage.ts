import { expect, Locator, Page } from "@playwright/test";

/**
 * BasePage contains reusable methods shared across all page objects.
 * It provides common browser interactions, assertions, navigation,
 * and wait utilities for the Playwright framework.
 */
export class BasePage {

    protected readonly page: Page;

    /**
     * Creates an instance of BasePage.
     *
     * @param page - Playwright Page instance.
     */
    constructor(page: Page) {
        this.page = page;
    }

    // Navigation

    /**
     * Navigates to the specified URL and waits for the page to fully load.
     *
     * @param url - URL to navigate to.
     */
    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
        await this.waitForPageLoad();
    }

    /**
     * Reloads the current page and waits until loading is complete.
     */
    async reloadPage(): Promise<void> {
        await this.page.reload();
        await this.waitForPageLoad();
    }

    // Actions

    /**
     * Waits for an element to become visible and performs a click.
     *
     * @param locator - Element locator.
     */
    async click(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "visible" });
        await locator.click();
    }

    /**
     * Waits for an input element and enters the specified value.
     *
     * @param locator - Input element locator.
     * @param value - Text to enter.
     */
    async fill(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: "visible" });
        await locator.fill(value);
    }

    /**
     * Presses a keyboard key on the specified element.
     *
     * @param locator - Element locator.
     * @param key - Keyboard key to press.
     */
    async press(locator: Locator, key: string): Promise<void> {
        await locator.press(key);
    }

     /**
     * Presses a keyboard key on the specified element.
     *
     * @param locator - Element locator.
     * @param key - Keyboard keys to press.
     */
    async pressSequentially(locator: Locator, key: string): Promise<void> {
        await locator.pressSequentially(key);
    }



    /**
     * Moves the mouse pointer over the specified element.
     *
     * @param locator - Element locator.
     */
    async hover(locator: Locator): Promise<void> {
        await locator.hover();
    }

    // Getters

    /**
     * Returns the visible text of an element.
     *
     * @param locator - Element locator.
     * @returns Trimmed element text.
     */
    async getText(locator: Locator): Promise<string> {
        return (await locator.innerText()).trim();
    }

    /**
     * Returns the current page title.
     *
     * @returns Page title.
     */
    async getTitle(): Promise<string> {
        return this.page.title();
    }

    /**
     * Returns the current page URL.
     *
     * @returns Current page URL.
     */
    async getUrl(): Promise<string> {
        return this.page.url();
    }

    // Assertions

    /**
     * 
     * @param locator - Elemrnt Locator
     * @param value  - String value that we pass.
     */
    async expectValue(locator: Locator, value: string): Promise<void> {
        await expect(locator).toHaveValue(value);
   }

   /**
     * 
     * @param locator - Elemrnt Locator
     * @param value  - String value that we pass.
     */
    async expectToHaveText(locator: Locator, value: string): Promise<void> {
        await expect(locator).toHaveText(value);
   }
    /**
     * Verifies that an element is visible.
     *
     * @param locator - Element locator.
     */
    async expectVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    /**
     * Checks whether an element is visible.
     *
     * @param locator - Element locator.
     * @returns True if the element is visible; otherwise false.
     */
    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    /**
     * 
     * @param locator -Element Locator
     * @returns True if the element is visible; otherwise false.
     */

    async toBeEnabled(locator: Locator): Promise<void> {
        await expect(locator).toBeEnabled();
    }

    // Waits

    /**
     * Waits until the page reaches the network idle state.
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState("networkidle");
    }

    /**
     * Waits for an element to become visible.
     *
     * @param locator - Element locator.
     */
    async waitForVisible(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "visible" });
    }

    /**
     * Waits for an element to become hidden.
     *
     * @param locator - Element locator.
     */
    async waitForHidden(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "hidden" });
    }

    /**
     * Waits for an element to be attached to the DOM.
     *
     * @param locator - Element locator.
     */
    async waitForAttached(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "attached" });
    }

    /**
     * Waits for an element to be detached from the DOM.
     *
     * @param locator - Element locator.
     */
    async waitForDetached(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "detached" });
    }
}