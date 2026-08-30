import { taskData } from "@data/taskData";
import { Locator, Page } from "@playwright/test";

/**
 * Page Object representing the Project Board page.
 * 
 * Encapsulates locators and actions related to the Board view,
 * including status columns, toolbar options, and task creation entry point.
 */

export class ProjectBoardPage {

    // Shared Playwright page instance used to build locators and interact with the browser.
    private readonly page: Page;

    // Board header and view locators.
    readonly projectName: Locator;
    readonly boardView: Locator;

    // Status column and task-list locators for To Do / In Progress / Complete.
    readonly todoColumn: Locator;
    readonly inProgressColumn: Locator;
    readonly completeColumn: Locator;
    readonly todoTaskList: Locator;
    readonly inProgressTaskList: Locator;
    readonly completeTaskList: Locator;
    readonly todoStatusGroup: Locator;
    readonly inProgressStatusGroup: Locator;
    readonly completeStatusGroup: Locator;

    // Board toolbar locators.
    readonly sortButton: Locator;
    readonly filterButton: Locator;
    readonly assigneeButton: Locator;
    readonly taskFilterButton: Locator;
    readonly searchButton: Locator;
    readonly customizeButton: Locator;

    // Task creation and task deletion action locators.
    readonly addTaskButton: Locator;
    private readonly moreButton: Locator;
    private readonly deleteButton: Locator;


    /**
     * Initializes locators for the Project Board page.
     * @param page - Playwright Page instance
     */

    // Constructor initializes all board locators used across the project-board flow.
    constructor(page: Page) {
        this.page = page;

        // Project header and board-toggle selectors.
        this.projectName = page.locator('[data-test="location-editable__location-title"]');
        this.boardView = page.getByText('Board');

        // Board status selectors.
        this.todoColumn = page.locator('.cu-status-group-header__label').filter({ hasText: 'TO DO' });
        this.inProgressColumn = page.locator('.cu-status-group-header__label').filter({ hasText: 'IN PROGRESS' });
        this.completeColumn = page.locator('.cu-status-group-header__label').filter({ hasText: 'COMPLETE' });
        this.todoTaskList = page.locator('[data-test="board-group__task-list__0"]');
        this.inProgressTaskList = page.locator('[data-test="board-group__task-list__1"]');
        this.completeTaskList = page.locator('[data-test="board-group__task-list__2"]');
        this.todoStatusGroup = page.locator('div.board-group__viewport-inner').nth(0);
        this.inProgressStatusGroup = page.locator('div.board-group__viewport-inner').nth(1);
        this.completeStatusGroup = page.locator('div.board-group__viewport-inner').nth(2);

        // Toolbar selectors.
        this.sortButton = page.getByRole('button', { name: "Sort" });
        this.filterButton = page.getByRole('button', { name: "Filter" }).first();
        this.assigneeButton = page.getByRole('button', { name: "Assignee" }).nth(2);
        this.taskFilterButton = page.locator('[data-test="me-mode-avatar-toggle"]');
        this.searchButton = page.locator('.view-filter-search__toggle');
        this.customizeButton = page.locator('[cutooltip="Customize your view settings"]');

        // Add-task and delete-task selectors.
        this.addTaskButton = page.locator('[data-test="cu2-views-bar__create-menu-view-bar-collapsed"]');
        this.moreButton = page.locator('button').filter({ hasText: 'More actions' }).first();
        this.deleteButton = page.getByText('Delete');



    }
    // Returns the board card matching the provided task name so assertions can target the right item.
    getTaskByName(name: string): Locator {
        return this.page
            .locator('[data-test^="board-group__task-list-item__"]')
            .filter({ has: this.page.locator(`[data-test="board-task__card__${name}"]`) });
    }

    // Resolves the actual viewport drop zone for a given status column.
    getStatusGroup(statusColumn: Locator): Locator {
        return statusColumn
            .locator('xpath=ancestor::*[contains(@class, "cu-status-group")][1]')
            .locator('div.board-group__viewport-inner');
    }

    // Returns the task card inside a particular status list for column-specific verification.
    getTaskInStatusGroup(name: string, taskList: Locator): Locator {
        return taskList
            .locator('[data-test^="board-group__task-list-item__"]')
            .filter({ hasText: name });
    }

    // Drags a task card to the target status group so the board workflow test can move items across columns.
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

    // Completes the selected task from the task actions menu on the board card.
    async markTaskComplete(name: string) {
        await this.getTaskByName(name)
            .getByRole('button', { name: 'Mark complete' })
            .click();
    }

    /** Opens the newly created task by clicking on it so details can be validated. */
    async openCreatedTask() {
        await this.getTaskByName(taskData.taskName).click();
    }

    // Deletes the default created task used in the board-level create-and-cleanup flow.
    async deleteTask() {
        await this.deleteTaskByName(taskData.taskName);
    }

    // Deletes a task by name from the board using the card menu options.
    async deleteTaskByName(name: string) {
        await this.getTaskByName(name).hover();
        await this.moreButton.click();
        await this.deleteButton.click();
    }

    // Deletes a task directly from the status list where it currently appears.
    async deleteTaskInStatus(name: string, taskList: Locator) {
        const task = this.getTaskInStatusGroup(name, taskList);

        await task.hover();
        await task.locator('[data-test^="board-actions-menu__ellipsis__"]').click();
        await this.deleteButton.click();
    }


}