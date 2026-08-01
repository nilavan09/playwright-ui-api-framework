import {Page, Locator} from "@playwright/test";
import { BasePage } from "@pages/base/BasePage";

export class AddTaskPage extends BasePage {
    // Locators
    private readonly taskNameInput: Locator;
    private readonly descriptionInput: Locator;
    private readonly assigneeButton: Locator;
    private readonly dueDateButton: Locator;
    private readonly priorityButton: Locator;
    private readonly tagsButton: Locator;
    private readonly closeButton: Locator;
    private readonly descriptionPlaceholder: Locator;
    private readonly priorityDropdown: Locator;
    private readonly highPriorityOption: Locator;
    private readonly DueDatePicker: Locator;
    private readonly DueDatePickerDay: Locator;
    private readonly assigeeSelector: Locator;
    private readonly assigneeOption: Locator;
    private readonly createTaskButton: Locator;




    // Constructor
    constructor(page: Page) {

        super(page);

        this.taskNameInput = page.locator('[data-test="draft-view__title-task"]');
        this.descriptionInput = page.locator('[data-test="prompt-template-empty-description__task-v4-layout"]');
        this.assigneeButton = page.locator('[cupendoid="quick-create-task-draft-assignee"]');
        this.dueDateButton = page.locator('[data-test="draft-view__due-date"]');
        this.priorityButton = page.locator('[data-test="priorities-list__dropdown-toggle"]').nth(4);
        this.tagsButton = page.locator('[data-test="dropdown__toggle"]');
        this.closeButton = page.locator('[data-test="modal-close-btn"]');
        this.descriptionPlaceholder = page.locator('.ql-block');
        this.priorityDropdown = page.locator('[data-test="priorities-list__dropdown-toggle"]').nth(4);
        this.highPriorityOption = page.getByRole('button', { name: 'Normal' });
        this.DueDatePicker = page.locator('[data-test="draft-view__due-date"]');
        this.DueDatePickerDay = page.locator('[data-test-id="tomorrow"]');
        this.assigeeSelector = page.locator('[data-pendo="quick-create-task-draft-assignee"]');
        this.assigneeOption = page.locator('[class="user-list-item__icon"]').last();
        this.createTaskButton = page.locator('[data-test="draft-view__quick-create-create"]');
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

    async selectNormalPriority() {
        await this.click(this.priorityDropdown);
        await this.click(this.highPriorityOption);
    }

    async verifyNormalPrioritySelected() {
        await this.expectToHaveText(this.priorityDropdown , " Normal priority");
    }   

    async selectDueDate() {
        await this.click(this.DueDatePicker);
        await this.click(this.DueDatePickerDay);
    }

    async verifyDueDateSelected() {
        await this.expectToHaveText(this.DueDatePicker , "Tomorrow");
    }

    async selectAssignee() {
        await this.click(this.assigeeSelector);
        await this.click(this.assigneeOption);
    }

    async verifyAssigneeSelected(assigneeName: string) {
        await this.expectToHaveText(this.assigeeSelector , assigneeName);
    }

    async createTask() {
        await this.fillTaskName("Sample Task");
        await this.verifyTaskName("Sample Task");
        await this.fillDescription("This is a sample task description");
        await this.verifyDescription("This is a sample task description");
        await this.selectNormalPriority();
        await this.verifyNormalPrioritySelected();
        await this.selectDueDate();
        await this.verifyDueDateSelected();
        await this.selectAssignee();
        await this.verifyAssigneeSelected("R");
        await this.click(this.createTaskButton);
    }

}