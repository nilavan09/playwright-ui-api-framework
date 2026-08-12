import {Page, Locator} from "@playwright/test";
import { BasePage } from "@pages/base/BasePage";
import { taskData } from "@data/taskData";
import { PriorityDropdown } from "@components/PriorityDropdown";
/**
 * Page Object representing the Add Task dialog.
 * 
 * Encapsulates locators and actions for creating a task, including
 * task name, description, priority, due date, and assignee selection.
 */

export class AddTaskPage extends BasePage {
    // Locators
    private readonly taskNameInput: Locator;
    private readonly descriptionInput: Locator;
    private readonly assigneeButton: Locator;
    private readonly dueDateButton: Locator;
    //private readonly priorityButton: Locator;
    private readonly tagsButton: Locator;
    private readonly closeButton: Locator;
    private readonly descriptionPlaceholder: Locator;
    //private readonly priorityDropdown: Locator;
    //private readonly highPriorityOption: Locator;
    private readonly DueDatePicker: Locator;
    private readonly DueDatePickerDay: Locator;
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

        super(page);

        this.taskNameInput = page.locator('[data-test="draft-view__title-task"]');
        this.descriptionInput = page.locator('[data-test="prompt-template-empty-description__task-v4-layout"]');
        this.assigneeButton = page.locator('[cupendoid="quick-create-task-draft-assignee"]');
        this.dueDateButton = page.locator('[data-test="draft-view__due-date"]');
        this.priorityButton = page.locator('[data-test="priorities-list__dropdown"]').nth(4);
        this.tagsButton = page.locator('[data-test="dropdown__toggle"]');
        this.closeButton = page.locator('[data-test="modal-close-btn"]');
        this.descriptionPlaceholder = page.locator('.ql-block');
        //this.priorityDropdown = page.locator('[data-test="priorities-list__dropdown-toggle"]').nth(4);
        //this.highPriorityOption = page.getByRole('button', { name: 'Normal' });
        this.priorityDropdown = new PriorityDropdown(page, this.priorityButton)
        this.DueDatePicker = page.locator('[data-test="draft-view__due-date"]');
        this.DueDatePickerDay = page.locator('[data-test-id="tomorrow"]');
        this.assigeeSelector = page.locator('[data-pendo="quick-create-task-draft-assignee"]');
        this.assigneeOption = page.locator('[class="user-list-item__icon"]').last();
        this.createTaskButton = page.locator('[data-test="draft-view__quick-create-create"]');
    }

    /** Verifies all key fields/buttons in the Add Task dialog are visible. */
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

     /**
     * Fills the task name input field.
     * @param taskName - Name of the task to enter
     */
    async fillTaskName(taskName: string) {
        await this.fill(this.taskNameInput, taskName);
    }

    /**
     * Verifies the task name input holds the expected value.
     * @param taskName - Expected task name
     */
    async verifyTaskName(taskName: string) {

        await this.expectValue(this.taskNameInput , taskName);
    }

    /**
     * Fills the task description field.
     * @param description - Description text to enter
     */
    async fillDescription(description: string) {
        await this.click(this.descriptionInput);
        await this.fill(this.descriptionPlaceholder, description);
    }   

    /**
     * Verifies the task description matches the expected text.
     * @param description - Expected description text
     */
    async verifyDescription(description: string) {
        await this.expectToHaveText(this.descriptionPlaceholder , description);
    }

    // /** Opens the priority dropdown and selects "Normal" priority. */
    // async selectNormalPriority() {
    //     await this.click(this.priorityDropdown);
    //     await this.click(this.highPriorityOption);
    // }

    // /** Verifies that "Normal" priority is selected and reflected in the dropdown. */
    // async verifyNormalPrioritySelected() {
    //     await this.expectToHaveText(this.priorityDropdown , taskData.selectedPriority);
    // }  

    async selectNormalPriority() {
        await this.priorityDropdown.selectPriority(taskData.priorityOptions[0]);
    }

    async verifyNormalPrioritySelected() {
        await this.priorityDropdown.verifyPriority(taskData.priorityOptions[0]);
    }

     /** Opens the due date picker and selects "Tomorrow" as the due date. */
    async selectDueDate() {
        await this.click(this.DueDatePicker);
        await this.click(this.DueDatePickerDay);
    }

    /** Verifies the due date field displays the expected selected date. */
    async verifyDueDateSelected() {
        await this.expectToHaveText(this.DueDatePicker , taskData.dueDateOptions[1]);
    }

    /** Opens the assignee selector and selects the last available user in the list. */
    async selectAssignee() {
        await this.click(this.assigeeSelector);
        await this.click(this.assigneeOption);
    }

    /**
     * Verifies the assignee field displays the expected assignee.
     * @param assigneeName - Expected assignee initial/name
     */
    async verifyAssigneeSelected(assigneeName: string) {
        await this.expectToHaveText(this.assigeeSelector , assigneeName);
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
        await this.click(this.createTaskButton);
    }

}