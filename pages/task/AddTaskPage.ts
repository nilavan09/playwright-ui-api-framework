import {Page, Locator, expect} from "@playwright/test";
import { BasePage } from "@pages/base/BasePage";

export class AddTaskPage extends BasePage {
    // Locators
    private readonly taskNameInput: Locator;
    private readonly descriptionInput: Locator;
    private readonly assigneeButton: Locator;
    private readonly dueDateButton: Locator;
    private readonly priorityButton: Locator;
    private readonly tagsButton: Locator;
    private readonly createTaskButton: Locator;
    private readonly closeButton: Locator;
    private readonly descriptionPlaceholder: Locator;



    // Constructor
    constructor(page: Page) {

        super(page);

        this.taskNameInput = page.locator('[data-test="draft-view__title-task"]');
        this.descriptionInput = page.locator('[data-test="prompt-template-empty-description__task-v4-layout"]');
        this.assigneeButton = page.locator('[cupendoid="quick-create-task-draft-assignee"]');
        this.dueDateButton = page.locator('[data-test="draft-view__due-date"]');
        this.priorityButton = page.locator('[data-test="priorities-list__dropdown-toggle"]').nth(4);
        this.tagsButton = page.locator('[data-test="dropdown__toggle"]');
        this.createTaskButton = page.locator('[data-test="draft-view__quick-create-create"]');
        this.closeButton = page.locator('[data-test="modal-close-btn"]');
        this.descriptionPlaceholder = page.locator('.ql-block');
    }

    async verifyAddTaskDialog() {
        await this.expectVisible(this.taskNameInput);
        await this.expectVisible(this.descriptionInput);
        await this.expectVisible(this.assigneeButton);
        await this.expectVisible(this.dueDateButton);
        await this.expectVisible(this.priorityButton);
        await this.expectVisible(this.tagsButton);
        await this.expectVisible(this.createTaskButton);
        await this.expectVisible(this.closeButton);
    }

    async fillTaskName(taskName: string) {
        await this.fill(this.taskNameInput, taskName);
    }

    async verifyTaskName(taskName: string) {

        await this.expectValue(this.taskNameInput , taskName);
    }

    async fillDescription(description: string) {
        await this.click(this.descriptionInput);
        await this.fill(this.descriptionPlaceholder, description);
    }   

    async verifyDescription(description: string) {
        await this.expectToHaveText(this.descriptionPlaceholder , description);
    }
}