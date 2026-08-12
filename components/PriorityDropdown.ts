import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/base/BasePage";

/**
 * Reusable component representing a Priority dropdown.
 * 
 * Can be instantiated with any dropdown Locator, allowing it to be
 * reused across different pages (e.g., AddTaskPage, TaskDetailsPage)
 * wherever a priority selector appears.
 */
export class PriorityDropdown extends BasePage {

    private readonly dropdown: Locator;
    /**
     * @param page - Playwright Page instance
     * @param dropdown - Locator for the priority dropdown toggle on the host page.
     */
    constructor(page: Page, dropdown: Locator) {
        super(page);

        this.dropdown = dropdown;
    }
    /**
     * Opens the priority dropdown and selects the given priority option.
     * @param priority - Priority to select (e.g., "High", "Normal", "Low","Urgent")
     */
    async selectPriority(priority: string) {
        await this.click(this.dropdown);
        //await this.click(this.page.locator('[data-test="priorities-list__item-High"]'));
        await this.click(this.page.locator(`[data-test="priorities-list__item-${priority}"]`));
    }
    /**
     * Verifies the dropdown displays the expected priority.
     * @param priority - Expected priority text
     */
    async verifyPriority(priority: string){
        await this.expectToContainText(this.dropdown ,priority)
    }
}