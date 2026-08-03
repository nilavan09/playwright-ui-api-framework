import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "@pages/base/BasePage";

/**
 * Page Object representing the Project Board page.
 * 
 * Encapsulates locators and actions related to the Board view,
 * including status columns, toolbar options, and task creation entry point.
 */

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
    private readonly createdTask: Locator;


    /**
     * Initializes locators for the Project Board page.
     * @param page - Playwright Page instance
     */
    
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
        this.createdTask = page.locator('[data-test^="board-group__task-list-item__"]').nth(3);
        
        

    }
    // Actions

    /** Switches the current view to Board view. */
     async openBoardView(){
        await this.click(this.boardView);
    }
   /** Opens the Add Task dialog by clicking the Create Task button. */ 
    async clickAddTask() {
    await this.click(this.addTaskButton);
    }

    //Verifications
    /** Verifies the project name/title is visible on the Board page. */
    async verifyProjectName(){
        await this.expectVisible(this.projectName);
    }
    /** Verifies that To Do, In Progress, and Complete status columns are visible. */
    async verifyStatusColumns(){
        await this.expectVisible(this.todoColumn);
        await this.expectVisible(this.inProgressColumn);
        await this.expectVisible(this.completeColumn);
    }
    /** Verifies that all toolbar options (Sort, Filter, Assignee, Task Filter, Search, Customize) are visible. */
    async verifyToolBarOptions(){
        await this.expectVisible(this.sortButton);
        await this.expectVisible(this.filterButton);
        await this.expectVisible(this.AssigneeButton);
        await this.expectVisible(this.taskFilterButton);
        await this.expectVisible(this.searchButton);
        await this.expectVisible(this.customizeButton);
    }    
    /** Verifies the Create Task button is visible and enabled. */
    async verifyCreateTaskButton() {
        await this.expectVisible(this.addTaskButton);
        await this.toBeEnabled(this.addTaskButton);

    }
    /** Verifies that the newly created task is visible in the task list. */
    async verifyCreatedTask() {
        await this.expectVisible(this.createdTask);
    }

    /** Opens the newly created task by clicking on it. */
    async openCreatedTask() {
        await this.click(this.createdTask);
    }

}