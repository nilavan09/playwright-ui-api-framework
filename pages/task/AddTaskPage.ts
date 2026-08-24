import { Page, Locator,expect } from "@playwright/test";
import { taskData } from "@data/taskData";
import { PriorityDropdown } from "@components/PriorityDropdown";
import { DueDatePicker } from "@components/DueDatePicker";
/**
 * Page Object representing the Add Task dialog.
 * 
 * Encapsulates locators and actions for creating a task, including
 * task name, description, priority, due date, and assignee selection.
 */

export class AddTaskPage {
    // Locators
    private readonly taskNameInput: Locator;
    private readonly descriptionInput: Locator;
    private readonly assigneeButton: Locator;
    private readonly dueDateButton: Locator;
    private readonly tagsButton: Locator;
    private readonly closeButton: Locator;
    private readonly descriptionPlaceholder: Locator;
    private readonly dueDateDropdown: DueDatePicker;
    private readonly assigeeSelector: Locator;
    private readonly assigneeOption: Locator;
    private readonly createTaskButton: Locator;
    private readonly priorityDropdown: PriorityDropdown;
    private readonly priorityButton: Locator;


    /**
     * Initializes locators for the Add Task dialog.
     * @param page - Playwright Page instance
     */

    // Constructor
    constructor(page: Page) {
        
        this.taskNameInput = page.locator('[data-test="draft-view__title-task"]');
        this.descriptionInput = page.locator('[data-test="prompt-template-empty-description__task-v4-layout"]');
        this.assigneeButton = page.locator('[cupendoid="quick-create-task-draft-assignee"]');
        this.dueDateButton = page.locator('[data-test="draft-view__due-date"]');
        this.priorityButton = page.locator('[data-test="priorities-list__dropdown"]').nth(4);
        this.tagsButton = page.locator('[data-test="dropdown__toggle"]');
        this.closeButton = page.locator('[data-test="modal-close-btn"]');
        this.descriptionPlaceholder = page.locator('.ql-block');
        this.priorityDropdown = new PriorityDropdown(page, this.priorityButton);
        this.dueDateDropdown = new DueDatePicker(page, this.dueDateButton)
        this.assigeeSelector = page.locator('[data-pendo="quick-create-task-draft-assignee"]');
        this.assigneeOption = page.locator('[class="user-list-item__icon"]').last();
        this.createTaskButton = page.locator('[data-test="draft-view__quick-create-create"]');
    }

    /** Verifies all key fields/buttons in the Add Task dialog are visible. */
    async verifyAddTaskDialog() {
        await expect(this.taskNameInput).toBeVisible();
        await expect(this.descriptionInput).toBeVisible();
        await expect(this.assigneeButton).toBeVisible();
        await expect(this.dueDateButton).toBeVisible();
        await expect(this.priorityButton).toBeVisible();
        await expect(this.tagsButton).toBeVisible();
        await expect(this.createTaskButton).toBeVisible();
        await expect(this.closeButton).toBeVisible();
    }

    /**
    * Fills the task name input field.
    * @param taskName - Name of the task to enter
    */
    async fillTaskName(taskName: string) {
        await expect(this.taskNameInput).toBeVisible();
        await this.taskNameInput.fill(taskName);
    }

    /**
     * Verifies the task name input holds the expected value.
     * @param taskName - Expected task name
     */
    async verifyTaskName(taskName: string) {

        await expect(this.taskNameInput).toHaveValue(taskName);
    }

    /**
     * Fills the task description field.
     * @param description - Description text to enter
     */
    async fillDescription(description: string) {
        await expect(this.descriptionInput).toBeVisible();
        await this.descriptionInput.click();
        await this.descriptionPlaceholder.fill(description);
    }

    /**
     * Verifies the task description matches the expected text.
     * @param description - Expected description text
     */
    async verifyDescription(description: string) {
        await expect(this.descriptionPlaceholder).toHaveText(description);
    } 
    //Selects "Normal" priority using the shared PriorityDropdown component.
    async selectNormalPriority() {
        await this.priorityDropdown.selectPriority(taskData.priorityOptions[0]);
    }
    //Verifies "Normal" priority is selected and reflected in the dropdown. 
    async verifyNormalPrioritySelected() {
        await this.priorityDropdown.verifyPriority(taskData.priorityOptions[0]);
    }
    //Selects the due date using the shared DueDatePicker component.
    async selectDueDate() {
        await this.dueDateDropdown.selectDate(taskData.dueDateOptions[1].value);
    }
    //Verifies the selected due date is reflected correctly in the picker.
    async verifyDueDateSelected() {
        await this.dueDateDropdown.verifyDate(taskData.dueDateOptions[1].label);
    }

    /** Opens the assignee selector and selects the last available user in the list. */
    async selectAssignee() {
        await expect(this.assigeeSelector).toBeVisible();
        await this.assigeeSelector.click();
        await expect(this.assigneeOption).toBeVisible();
        await this.assigneeOption.click();
    }

    /**
     * Verifies the assignee field displays the expected assignee.
     * @param assigneeName - Expected assignee initial/name
     */
    async verifyAssigneeSelected(assigneeName: string) {
        await expect(this.assigeeSelector).toHaveText(assigneeName);
    }

    /**
     * End-to-end flow to create a task using centralized test data:
     * fills task name, description, priority, due date, and assignee,
     * verifying each step, then submits the task.
     */
    async createTask() {
        await this.fillTaskName(taskData.taskName);
        await this.verifyTaskName(taskData.taskName);
        await this.fillDescription(taskData.taskDescription);
        await this.verifyDescription(taskData.taskDescription);
        await this.selectNormalPriority();
        await this.verifyNormalPrioritySelected();
        await this.selectDueDate();
        await this.verifyDueDateSelected();
        await this.selectAssignee();
        await this.verifyAssigneeSelected(taskData.assignee[0]);
        await expect(this.createTaskButton).toBeVisible();
        await this.createTaskButton.click();
    }

}