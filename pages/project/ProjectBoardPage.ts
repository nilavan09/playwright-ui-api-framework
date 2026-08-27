import { taskData } from "@data/taskData";
import { Locator, Page } from "@playwright/test";

/**
 * Page Object representing the Project Board page.
 * 
 * Encapsulates locators and actions related to the Board view,
 * including status columns, toolbar options, and task creation entry point.
 */

export class ProjectBoardPage {

    private readonly page: Page;  
    // Locators
    readonly projectName: Locator;
    readonly boardView: Locator;

    readonly todoColumn: Locator;
    readonly inProgressColumn: Locator;
    readonly completeColumn: Locator;

    readonly sortButton: Locator;
    readonly filterButton: Locator;
    readonly assigneeButton: Locator;
    readonly taskFilterButton: Locator;
    readonly searchButton: Locator;
    readonly customizeButton: Locator;

    readonly addTaskButton: Locator;
    //readonly createdTask: Locator;

    private readonly moreButton: Locator;
    private readonly deleteButton: Locator;


    /**
     * Initializes locators for the Project Board page.
     * @param page - Playwright Page instance
     */

    // Constructor
    constructor(page: Page) {
        this.page = page; 
        this.projectName = page.locator('[data-test="location-editable__location-title"]');
        this.boardView = page.getByText('Board');
        this.todoColumn = page.locator('.cu-status-group-header__label').filter({ hasText: 'TO DO' });
        this.inProgressColumn = page.locator('.cu-status-group-header__label').filter({ hasText: 'IN PROGRESS' });
        this.completeColumn = page.locator('.cu-status-group-header__label').filter({ hasText: 'COMPLETE' });
        this.sortButton = page.getByRole('button', { name: "Sort" });
        this.filterButton = page.getByRole('button', { name: "Filter" }).first();
        this.assigneeButton = page.getByRole('button', { name: "Assignee" }).nth(2);
        this.taskFilterButton = page.locator('[data-test="me-mode-avatar-toggle"]');
        this.searchButton = page.locator('.view-filter-search__toggle');
        this.addTaskButton = page.locator('[data-test="cu2-views-bar__create-menu-view-bar-collapsed"]');
        this.customizeButton = page.locator('[cutooltip="Customize your view settings"]');
        //this.createdTask = page.locator('[data-test^="board-group__task-list-item__"]').nth(3);
        this.moreButton = page.locator('button').filter({ hasText: 'More actions' }).first();
        this.deleteButton = page.getByText('Delete');



    }
    getTaskByName(name: string): Locator {
        return this.page.locator('[data-test^="board-group__task-list-item__"]').filter({ hasText: name });
    }


    /** Opens the newly created task by clicking on it. */
    async openCreatedTask() {
        await this.getTaskByName(taskData.taskName).click();
    }

    // Delete created task.
    async deleteTask() {
        await this.getTaskByName(taskData.taskName).hover();
        await this.moreButton.click();
        await this.deleteButton.click();
    }


}