import {  Locator } from "@playwright/test";

/**
 * Reusable component representing a Due Date picker.
 * 
 * Can be instantiated with any due date Locator, allowing it to be
 * reused across different pages (e.g., AddTaskPage, TaskDetailsPage)
 * wherever a due date selector appears.
 */

export class DueDatePicker {

        private readonly dueDatePicker:Locator;
        /**
        * @param dueDate - Locator for the due date picker on the host page.
        */
        constructor (duedate:Locator){

            this.dueDatePicker=duedate;
        }   
        /**
     * Opens the due date picker and selects the given date option.
     * @param date - Date identifier to select (e.g., "tomorrow")
     */
    async selectDate(date:string){
        // Clicks the due date picker to open it and selects the specified date option.
        await this.dueDatePicker.click();
        await this.dueDatePicker.page().locator(`[data-test-id="${date}"]`).click();

    }
    

}