import { Locator } from "@playwright/test";

/**
 * Reusable component representing a Priority dropdown.
 * 
 * Can be instantiated with any dropdown Locator, allowing it to be
 * reused across different pages (e.g., AddTaskPage, TaskDetailsPage)
 * wherever a priority selector appears.
 */
export class PriorityDropdown {

    private readonly dropdown: Locator;
    /*
     * @param dropdown - Locator for the priority dropdown toggle on the host page.
     */
    constructor( dropdown: Locator) {
        this.dropdown = dropdown;
    }
    /**
     * Opens the priority dropdown and selects the given priority option.
     * @param priority - Priority to select (e.g., "High", "Normal", "Low","Urgent")
     */
    async selectPriority(priority: string) {
        // Clicks the dropdown to open it and selects the specified priority option.
        await this.dropdown.click();
        //await this.click(this.page.locator('[data-test="priorities-list__item-High"]'));
        const priorityOption = this.dropdown.page().locator(`[data-test="priorities-list__item-${priority}"]`);
        await priorityOption.click();
    }
    
}