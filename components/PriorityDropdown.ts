import { Locator, Page, expect } from "@playwright/test";

/**
 * Reusable component representing a Priority dropdown.
 * 
 * Can be instantiated with any dropdown Locator, allowing it to be
 * reused across different pages (e.g., AddTaskPage, TaskDetailsPage)
 * wherever a priority selector appears.
 */
export class PriorityDropdown {

    private readonly dropdown: Locator;
    /**
     * @param page - Playwright Page instance
     * @param dropdown - Locator for the priority dropdown toggle on the host page.
     */
    constructor(page: Page, dropdown: Locator) {
        this.dropdown = dropdown;
    }
    /**
     * Opens the priority dropdown and selects the given priority option.
     * @param priority - Priority to select (e.g., "High", "Normal", "Low","Urgent")
     */
    async selectPriority(priority: string) {
        await expect(this.dropdown).toBeVisible();
        await this.dropdown.click();
        //await this.click(this.page.locator('[data-test="priorities-list__item-High"]'));
        const priorityOption = this.dropdown.page().locator(`[data-test="priorities-list__item-${priority}"]`);
        await expect(priorityOption).toBeVisible();
        await priorityOption.click();
    }
    /**
     * Verifies the dropdown displays the expected priority.
     * @param priority - Expected priority text
     */
    async verifyPriority(priority: string){
        await expect(this.dropdown).toContainText(priority);
    }
}