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
    readonly taskNameInput: Locator;
    readonly descriptionInput: Locator;
    readonly assigneeButton: Locator;
    readonly dueDateButton: Locator;
    readonly tagsButton: Locator;
    readonly closeButton: Locator;
    readonly descriptionPlaceholder: Locator;
    private readonly dueDateDropdown: DueDatePicker;
    readonly assigeeSelector: Locator;
    private readonly assigneeOption: Locator;
    readonly createTaskButton: Locator;
    private readonly priorityDropdown: PriorityDropdown;
    readonly priorityButton: Locator;


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


    /**
    * Fills the task name input field.
    * @param taskName - Name of the task to enter
    */
    async fillTaskName(taskName: string) {
        await expect(this.taskNameInput).toBeVisible();
        await this.taskNameInput.fill(taskName);
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

    //Selects "Normal" priority using the shared PriorityDropdown component.
    async selectNormalPriority() {
        await this.priorityDropdown.selectPriority(taskData.priorityOptions[0]);
    }

    //Selects the due date using the shared DueDatePicker component.
    async selectDueDate() {
        await this.dueDateDropdown.selectDate(taskData.dueDateOptions[1].value);
    }

    /** Opens the assignee selector and selects the last available user in the list. */
    async selectAssignee() {
        await expect(this.assigeeSelector).toBeVisible();
        await this.assigeeSelector.click();
        await expect(this.assigneeOption).toBeVisible();
        await this.assigneeOption.click();
    }

    /**
     * End-to-end flow to create a task using centralized test data:
     * fills task name, description, priority, due date, and assignee,
     * verifying each step, then submits the task.
     */
    async createTask() {
        //Fill all required fields using centralized test data and submit the task.
        //fill task name
        await this.fillTaskName(taskData.taskName);
        //fill task description
        await this.fillDescription(taskData.taskDescription);
        //select priority
        await this.selectNormalPriority();
        //select due date
        await this.selectDueDate();
        //select assignee
        await this.selectAssignee();
        //Click the "Create Task" button to submit the new task.
        await this.createTaskButton.click();
    }

}   