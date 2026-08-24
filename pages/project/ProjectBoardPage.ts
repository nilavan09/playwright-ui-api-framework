import { Locator, Page, expect } from "@playwright/test";

/**
 * Page Object representing the Project Board page.
 * 
 * Encapsulates locators and actions related to the Board view,
 * including status columns, toolbar options, and task creation entry point.
 */

export class ProjectBoardPage {

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
    private readonly createdTask: Locator;
    private readonly moreButton: Locator;
    private readonly deleteButton: Locator;


    /**
     * Initializes locators for the Project Board page.
     * @param page - Playwright Page instance
     */
    
    // Constructor
    constructor(page:Page){

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
        this.createdTask = page.locator('[data-test^="board-group__task-list-item__"]').nth(3);
        this.moreButton = page.locator('button').filter({ hasText: 'More actions' }).first()
        this.deleteButton = page.getByText('Delete');
        
        

    }
    // Actions

    /** Switches the current view to Board view. */
     async openBoardView(){
        await this.boardView.click();
    }
   /** Opens the Add Task dialog by clicking the Create Task button. */ 
    async clickAddTask() {
    await this.addTaskButton.click();
    }

    //Verifications
    /** Verifies the project name/title is visible on the Board page. */
    async verifyProjectName(){
        await expect(this.projectName).toBeVisible();
    }
    /** Verifies that To Do, In Progress, and Complete status columns are visible. */
    async verifyStatusColumns(){
        await expect(this.todoColumn).toBeVisible();
        await expect(this.inProgressColumn).toBeVisible();
        await expect(this.completeColumn).toBeVisible();
    }
    /** Verifies that all toolbar options (Sort, Filter, Assignee, Task Filter, Search, Customize) are visible. */
    async verifyToolBarOptions(){
        await expect(this.sortButton).toBeVisible();
        await expect(this.filterButton).toBeVisible();
        await expect(this.AssigneeButton).toBeVisible();
        await expect(this.taskFilterButton).toBeVisible();
        await expect(this.searchButton).toBeVisible();
        await expect(this.customizeButton).toBeVisible();
    }    
    /** Verifies the Create Task button is visible and enabled. */
    async verifyCreateTaskButton() {
        await expect(this.addTaskButton).toBeVisible();
        await expect(this.addTaskButton).toBeEnabled();

    }
    /** Verifies that the newly created task is visible in the task list. */
    async verifyCreatedTask() {
        await expect(this.createdTask).toBeVisible();
    }

    /** Opens the newly created task by clicking on it. */
    async openCreatedTask() {
        await this.createdTask.click();
    }

    // Delete created task.
    async deleteTask(){
        await this.createdTask.hover();
        await this.moreButton.click();
        await this.deleteButton.click();
    }

    // verify Deleted task is not visible on the board.
    async verifydeletedTask(){
        await expect(this.createdTask).not.toBeVisible();
    }

}