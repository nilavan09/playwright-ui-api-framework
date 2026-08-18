import { Locator,Page } from "@playwright/test";
import { BasePage } from "@pages/base/BasePage";

/**
 * Reusable component representing a Due Date picker.
 * 
 * Can be instantiated with any due date Locator, allowing it to be
 * reused across different pages (e.g., AddTaskPage, TaskDetailsPage)
 * wherever a due date selector appears.
 */

export class DueDatePicker extends BasePage{

        private readonly dueDatePicker:Locator;
        /**
         * @param page - Playwright Page instance
         * @param duedate - Locator for the due date picker dropdown on the host page
         */
        constructor (page:Page,duedate:Locator){

            super(page)
            this.dueDatePicker=duedate;
        }   
        /**
     * Opens the due date picker and selects the given date option.
     * @param date - Date identifier to select (e.g., "tomorrow")
     */
    async selectDate(date:string){
        await this.click(this.dueDatePicker)
        await this.page.locator(`[data-test-id="${date}"]`).click();

    }
    /**
     * Verifies the due date picker displays the expected date.
     * @param date - Expected date text
     */
    async verifyDate(date:string){
        await this.expectToContainText(this.dueDatePicker,date);
    }

}