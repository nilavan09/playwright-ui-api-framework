import { expect, Locator,Page } from "@playwright/test";

/**
 * Reusable component representing a Due Date picker.
 * 
 * Can be instantiated with any due date Locator, allowing it to be
 * reused across different pages (e.g., AddTaskPage, TaskDetailsPage)
 * wherever a due date selector appears.
 */

export class DueDatePicker {

    private readonly page:Page;
        private readonly dueDatePicker:Locator;
        /**
         * @param page - Playwright Page instance
         * @param duedate - Locator for the due date picker dropdown on the host page
         */
        constructor (page:Page,duedate:Locator){

            this.page=page;
            this.dueDatePicker=duedate;
        }   
        /**
     * Opens the due date picker and selects the given date option.
     * @param date - Date identifier to select (e.g., "tomorrow")
     */
    async selectDate(date:string){
        await this.dueDatePicker.click();
        await this.page.locator(`[data-test-id="${date}"]`).click();

    }
    /**
     * Verifies the due date picker displays the expected date.
     * @param date - Expected date text
     */
    async verifyDate(date:string){
        await expect(this.dueDatePicker).toContainText(date);
    }

}