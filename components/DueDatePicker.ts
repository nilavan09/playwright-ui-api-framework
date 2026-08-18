import { Locator,Page } from "@playwright/test";
import { BasePage } from "@pages/base/BasePage";

/**
 * Can be instantiated with any duedate Locator, allowing it to be
 * reused across different pages (e.g., AddTaskPage, TaskDetailsPage)
 * wherever a duedate selector appears.
 */

export class DueDatePicker extends BasePage{

        private readonly dueDatePicker:Locator;

        constructor (page:Page,duedate:Locator){

            super(page)
            this.dueDatePicker=duedate;
        }   

    async selectDate(date:string){
        await this.click(this.dueDatePicker)
        await this.page.locator(`[data-test-id="${date}"]`).click();

    }

    async verifyDate(date:string){
        await this.expectToContainText(this.dueDatePicker,date);
    }

}