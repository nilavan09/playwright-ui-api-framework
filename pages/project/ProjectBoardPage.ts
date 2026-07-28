import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/base/BasePage";

export class ProjectBoardPage extends BasePage {

    private readonly projectName: Locator;
    private readonly boardView: Locator;
    private readonly todoColumn: Locator;
    private readonly inProgressColumn: Locator;
    private readonly completeColumn: Locator;   

    constructor(page:Page){

        super(page);

        this.projectName = page.locator('[data-test="location-editable__location-title"]');
        this.boardView = page.getByText('Board');
        this.todoColumn = page.locator('.cu-status-group-header__label').filter({ hasText: 'TO DO' });
        this.inProgressColumn = page.locator('.cu-status-group-header__label').filter({ hasText: 'IN PROGRESS' });
        this.completeColumn = page.locator('.cu-status-group-header__label').filter({ hasText: 'COMPLETE' });


    }

    async verifyProjectName(){
        await this.expectVisible(this.projectName);
    }

    async openBoardView(){
        await this.click(this.boardView);
    }

    async verifyStatusColumns(){
        await this.expectVisible(this.todoColumn);
        await this.expectVisible(this.inProgressColumn);
        await this.expectVisible(this.completeColumn);
    }

    

    

}