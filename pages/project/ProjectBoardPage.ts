import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "@pages/base/BasePage";

export class ProjectBoardPage extends BasePage {

     // Locators
    private readonly projectName: Locator;
    private readonly boardView: Locator;
    private readonly todoColumn: Locator;
    private readonly inProgressColumn: Locator;
    private readonly completeColumn: Locator;
    private readonly sortButton: Locator; 
    private readonly filterButton: Locator;
    private readonly AssigneeButton: Locator;
    private readonly taskFilterButton: Locator; 
    private readonly searchButton: Locator;
    private readonly customizeButton: Locator;
    private readonly addTaskButton: Locator;


    
    // Constructor
    constructor(page:Page){

        super(page);

        this.projectName = page.locator('[data-test="location-editable__location-title"]');
        this.boardView = page.getByText('Board');
        this.todoColumn = page.locator('.cu-status-group-header__label').filter({ hasText: 'TO DO' });
        this.inProgressColumn = page.locator('.cu-status-group-header__label').filter({ hasText: 'IN PROGRESS' });
        this.completeColumn = page.locator('.cu-status-group-header__label').filter({ hasText: 'COMPLETE' });
        this.sortButton = page.getByRole('button',{name:"Sort"});
        this.filterButton = page.getByRole('button',{name:"Filter"}).first();
        this.AssigneeButton = page.getByRole('button',{name:"Assignee"}).nth(2);
        this.taskFilterButton = page.locator('[data-test="me-mode-avatar-toggle"]');
        this.searchButton = page.locator('.view-filter-search__toggle');
        this.addTaskButton = page.locator('[data-test="cu2-views-bar__create-menu-view-bar-collapsed"]');
        this.customizeButton = page.locator('[cutooltip="Customize your view settings"]');
        
        

    }
    // Actions
     async openBoardView(){
        await this.click(this.boardView);
    }
    
    async clickAddTask() {
    await this.click(this.addTaskButton);
    }

    //Verifications
    async verifyProjectName(){
        await this.expectVisible(this.projectName);
    }

    async verifyStatusColumns(){
        await this.expectVisible(this.todoColumn);
        await this.expectVisible(this.inProgressColumn);
        await this.expectVisible(this.completeColumn);
    }

    async verifyToolBarOptions(){
        await this.expectVisible(this.sortButton);
        await this.expectVisible(this.filterButton);
        await this.expectVisible(this.AssigneeButton);
        await this.expectVisible(this.taskFilterButton);
        await this.expectVisible(this.searchButton);
        await this.expectVisible(this.customizeButton);
    }    

    async verifyCreateTaskButton() {
        await this.expectVisible(this.addTaskButton);
        await this.toBeEnabled(this.addTaskButton);

    }

}