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
    readonly todoTaskList: Locator;
    readonly inProgressTaskList: Locator;
    readonly completeTaskList: Locator;
    readonly todoStatusGroup: Locator;
    readonly inProgressStatusGroup: Locator;
    readonly completeStatusGroup: Locator;

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
        this.todoTaskList = page.locator('[data-test="board-group__task-list__0"]');
        this.inProgressTaskList = page.locator('[data-test="board-group__task-list__1"]');
        this.completeTaskList = page.locator('[data-test="board-group__task-list__2"]');
        this.todoStatusGroup = page.locator('div.board-group__viewport-inner').nth(0);
        this.inProgressStatusGroup = page.locator('div.board-group__viewport-inner').nth(1);
        this.completeStatusGroup = page.locator('div.board-group__viewport-inner').nth(2);
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
        return this.page
            .locator('[data-test^="board-group__task-list-item__"]')
            .filter({ has: this.page.locator(`[data-test="board-task__card__${name}"]`) });
    }

    getStatusGroup(statusColumn: Locator): Locator {
        return statusColumn
            .locator('xpath=ancestor::*[contains(@class, "cu-status-group")][1]')
            .locator('div.board-group__viewport-inner');
    }

    getTaskInStatusGroup(name: string, taskList: Locator): Locator {
        return taskList
            .locator('[data-test^="board-group__task-list-item__"]')
            .filter({ hasText: name });
    }

    async dragTaskToStatus(name: string, statusGroup: Locator) {
        const task = this.getTaskByName(name);

        await task.scrollIntoViewIfNeeded();
        await statusGroup.scrollIntoViewIfNeeded();

        const taskBox = await task.boundingBox();
        const targetBox = await statusGroup.boundingBox();

        if (!taskBox || !targetBox) {
            throw new Error('Task or status drop zone is not visible.');
        }

        await this.page.mouse.move(
            taskBox.x + 8,
            taskBox.y + taskBox.height / 2
        );
        await this.page.mouse.down();
        await this.page.mouse.move(
            targetBox.x + targetBox.width / 2,
            targetBox.y + Math.min(targetBox.height / 2, 40),
            { steps: 10 }
        );
        await this.page.mouse.up();
    }

    async markTaskComplete(name: string) {
        await this.getTaskByName(name)
            .getByRole('button', { name: 'Mark complete' })
            .click();
    }


    /** Opens the newly created task by clicking on it. */
    async openCreatedTask() {
        await this.getTaskByName(taskData.taskName).click();
    }

    // Delete created task.
    async deleteTask() {
        await this.deleteTaskByName(taskData.taskName);
    }

    async deleteTaskByName(name: string) {
        await this.getTaskByName(name).hover();
        await this.moreButton.click();
        await this.deleteButton.click();
    }

    async deleteTaskInStatus(name: string, taskList: Locator) {
        const task = this.getTaskInStatusGroup(name, taskList);

        await task.hover();
        await task.locator('[data-test^="board-actions-menu__ellipsis__"]').click();
        await this.deleteButton.click();
    }


}