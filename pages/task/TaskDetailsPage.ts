import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { taskData } from "@data/taskData";

/**
 * Page Object representing the Task Details page.
 * 
 * Encapsulates locators and verification methods for task attributes
 * such as title, status, assignee, priority, due date, description,
 * and the activity/history section.
 */
export class TaskDetailsPage extends BasePage {

    // ---------------------------------------------------------------------
    // Locators
    // ---------------------------------------------------------------------
    private readonly taskTitle: Locator;
    private readonly statusButton: Locator;
    private readonly assigneeButton: Locator;
    private readonly priorityButton: Locator;
    private readonly dueDateButton: Locator;
    private readonly descriptionInput: Locator;
    private readonly activitySection: Locator;
    private readonly closeButton: Locator;
    private readonly taskEditor: Locator;
    private readonly priorityOptionLow: Locator;

    /**
     * Initializes locators for the Task Details page.
     * @param page - Playwright Page instance
     */
    constructor(page: Page) {
        super(page);

        this.taskTitle = page.getByRole('textbox', { name: 'Edit task name' });
        this.statusButton = page.locator('[data-test="status-button-badge__body"]');
        // Assumes the assignee avatar is the last item in the assignees list
        this.assigneeButton = page.locator('[data-test^="avatar-group__user-icon"]').last();
        this.dueDateButton = page.locator('[data-test="task-dates-display-button"]');
        this.priorityButton = page.locator('[data-test="task-hero-section-priority__row-data"]');
        // Targets the first block in the rich text description editor
        this.descriptionInput = page.locator('[data-test="task-editor"] .ql-editor');
        this.activitySection = page.locator('[data-link-preview-list-container="task-activity-stream"]');
        this.closeButton = page.getByRole('button', { name: 'Close window' });
        this.taskEditor = page.locator('[data-test="task-editor"]');
        this.priorityOptionLow = page.locator('[data-test="priority-list-priorities"]').getByRole('button', { name: 'Low' })

    }

    /**
     * Verifies the task title matches the expected value.
     * @param taskName - Expected task name
     */
    async verifyTaskTitle(taskName: string) {
        await this.expectValue(this.taskTitle, taskName);
    }

    /**
     * Verifies the task status matches the expected value.
     * @param status - Expected status (e.g., "TO DO", "IN PROGRESS")
     */
    async verifyStatus(status: string) {
        await this.expectToHaveText(this.statusButton, status);
    }

    /**
     * Verifies the task assignee matches the expected value.
     * @param assignee - Expected assignee initial/name
     */
    async verifyAssignee(assignee: string) {
        await this.expectToHaveText(this.assigneeButton, assignee);
    }

    /**
     * Verifies the task priority matches the expected value.
     * @param priority - Expected priority (e.g., "Normal", "High")
     */
    async verifyPriority(priority: string) {
        await this.expectToHaveText(this.priorityButton, priority);
    }

    /**
     * Verifies the task due date matches the expected value.
     * @param date - Expected due date (e.g., "Tomorrow")
     */
    async verifyDueDate(date: string) {
        await this.expectToHaveText(this.dueDateButton, date);
    }

    /**
     * Verifies the task description matches the expected value.
     * @param description - Expected description text
     */
    async verifyDescription(description: string) {
        await this.expectToHaveText(this.descriptionInput, description);
    }

    /** Verifies the activity/history section is visible on the task details page. */
    async verifyActivitySection() {
        await this.expectVisible(this.activitySection);
    }

    /** Closes the task details view. */
    async closeTask() {
        await this.click(this.closeButton);
    }

    /**Verify task opens and verify detials */
    async verifyTaskDetails() {
        // Verify the task title matches the expected task name.
        await this.verifyTaskTitle(taskData.taskName);

        // Verify the task status is displayed correctly.
        await this.verifyStatus(taskData.status);

        // verify the assignee is displayed correctly.
        await this.verifyAssignee(taskData.assignee)

        // Verify the task priority is displayed correctly.
        await this.verifyPriority(taskData.priority);

        // Verify the task due date is displayed correctly.
        await this.verifyDueDate(taskData.dueDate);

        // Verify the task description matches the expected content.
        await this.verifyDescription(taskData.taskDescription);

        // Verify the activity/history section is visible on the task details page.
        await this.verifyActivitySection();
    }
    /**
    * Edits the task title by clearing the existing value
    * and typing the new task name from test data.
    */
    async editTask() {
        await this.taskTitle.click();
        await this.taskTitle.clear();
        await this.taskTitle.pressSequentially(taskData.taskNameEdit);
    }

    /** Verifies the task title reflects the edited value. */
    async verifyEditedTask() {
        await this.verifyTaskTitle(taskData.taskNameEdit);
    }

    /**
    * Edits the task Description by clearing the existing value
    * and typing the new task name from test data.
    */
    async editDescription() {
        // Double-click the task description area to switch the editor into edit mode.
        await this.taskEditor.dblclick();
        // Verify that the description editor is now editable.
        await expect(this.descriptionInput).toHaveAttribute(
            'contenteditable',
            'true'
        );
        // Focus the description editor before entering or updating the text.
        await this.descriptionInput.click();

        // Select existing text
        await this.descriptionInput.press('Control+A');

        // Replace with new text
        await this.page.keyboard.insertText(taskData.taskDescriptionEdited);
    }

    // Verify Edited description.
    async verifyEditedDescripition() {
        await this.verifyDescription(taskData.taskDescriptionEdited);
    }

    /**
    * Edits the task priority by opening the priority dropdown
    * and selecting the "Low" priority option.
    */
    async editPriority() {
        await this.priorityButton.click()
        await this.priorityOptionLow.click()

    }

    /** Verifies the task priority reflects the updated value. */
    async verifyEditedPriority() {
        await this.expectToHaveText(this.priorityButton, taskData.changedPriority)
    }

}