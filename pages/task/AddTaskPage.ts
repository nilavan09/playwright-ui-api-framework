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
    readonly taskNameRequiredError: Locator;
    readonly deleteDraftButton: Locator;
    readonly cancelDraftButton: Locator;
    readonly descriptionPlaceholder: Locator;
    readonly dueDateDropdown: DueDatePicker;
    readonly assigeeSelector: Locator;
    private readonly assigneeOption: Locator;
    readonly createTaskButton: Locator;
    readonly priorityDropdown: PriorityDropdown;
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
        this.priorityButton = page.locator('cu-modal-keeper').locator('[data-test="priorities-list__dropdown"]').last();
        this.tagsButton = page.locator('[data-test="dropdown__toggle"]');
        this.closeButton = page.locator('[data-test="modal-close-btn"]');
        this.taskNameRequiredError = page.getByText('Enter Task Name', { exact: true });
        this.deleteDraftButton = page.getByRole('button', { name: 'Delete draft' });
        this.cancelDraftButton = page.getByRole('button', { name: 'Cancel', exact: true });
        this.descriptionPlaceholder = page.locator('.ql-block');
        this.priorityDropdown = new PriorityDropdown(this.priorityButton);
        this.dueDateDropdown = new DueDatePicker(this.dueDateButton)
        this.assigeeSelector = page.locator('[data-pendo="quick-create-task-draft-assignee"]');
        this.assigneeOption = page.locator('.user-list-item').last();
        this.createTaskButton = page.locator('[data-test="draft-view__quick-create-create"]');
    }


    //Opens the assignee selector and selects the last available user.
    async selectAssignee() {
        // Clicks the assignee selector and chooses the last user option.
        await this.assigeeSelector.click();
        await this.assigneeOption.click();
    }

    /**
    * Creates a task using the centralized test data.
    * Fills the required fields and submits the task.
    */
    async createTask(submit = true, taskName = taskData.taskName) {
        //Fill all required fields using centralized test data and submit the task.
        //fill task name
        await this.taskNameInput.fill(taskName);
        //fill task description
        await this.descriptionInput.click();
        await this.descriptionPlaceholder.fill(taskData.taskDescription);
        //select priority
        await this.priorityDropdown.selectPriority(taskData.priorityOptions[0]);
        //select due date
        await this.dueDateDropdown.selectDate(taskData.dueDateOptions[1].value);
        //select assignee
        await this.selectAssignee();
        if (submit) {
            //Click the "Create Task" button to submit the new task.
            await this.createTaskButton.click();
        }
    }

}   