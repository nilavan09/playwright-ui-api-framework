import { Page, Locator, expect } from '@playwright/test';
import { taskData } from "@data/taskData";
import { PriorityDropdown } from "@components/PriorityDropdown";
import { DueDatePicker } from '@components/DueDatePicker';


/**
 * Page Object representing the Task Details page.
 * 
 * Encapsulates locators and verification methods for task attributes
 * such as title, status, assignee, priority, due date, description,
 * and the activity/history section.
 */
export class TaskDetailsPage  {

    private readonly page: Page;

    // ---------------------------------------------------------------------
    // Locators
    // ---------------------------------------------------------------------
    readonly taskTitle: Locator;
    readonly statusButton: Locator;
    readonly assigneeButton: Locator;
    readonly priorityButton: Locator;
    readonly dueDateButton: Locator;
    readonly descriptionInput: Locator;
    readonly activitySection: Locator;
    readonly closeButton: Locator;
    private readonly taskEditor: Locator;
    private readonly dateInputClear:Locator;
    private readonly removeAssignee:Locator;
    private readonly assigneeDropdownOpener:Locator;
    private readonly selectAssigneeName:Locator;
    readonly priorityDropdown: PriorityDropdown;
    readonly dueDateDropdown: DueDatePicker;

    

    /**
     * Initializes locators for the Task Details page.
     * @param page - Playwright Page instance
     */
    constructor(page: Page) {
        
        this.page = page;

        this.taskTitle = page.getByRole('textbox', { name: 'Edit task name' });
        this.statusButton = page.locator('[data-test="status-button-badge__body"]');
        // Assumes the assignee avatar is the last item in the assignees list
        this.assigneeButton = page.locator('[data-test^="avatar-group__user-icon"]').last();
        this.dueDateButton = page.locator('[data-test="task-dates-display-button"]');
        this.priorityButton = page.locator('[data-test="task-hero-section-priority__row-data"]');
        this.priorityDropdown = new PriorityDropdown(this.priorityButton);
        this.dueDateDropdown = new DueDatePicker(this.dueDateButton);
        // Targets the first block in the rich text description editor
        this.descriptionInput = page.locator('[data-test="task-editor"] .ql-editor');
        this.activitySection = page.locator('[data-link-preview-list-container="task-activity-stream"]');
        this.closeButton = page.locator('[data-test="task-close-v3"]');
        this.taskEditor = page.locator('[data-test="task-editor"]');
        this.dateInputClear = page.locator('[data-test="datetime-input__clear-button"]').last();
        this.removeAssignee = page.locator('[data-test="user-group__remove"]') 
        this.assigneeDropdownOpener = page.getByRole('button', { name: 'Open assignees dropdown' });
        this.selectAssigneeName =page.locator('cu-user-item').filter({ hasText: 'Me' });
        
        
    }
     /**
     * Returns a locator for a status options
     * (e.g., "TO DO", "IN PROGRESS", "COMPLETE").
     * @param label - The visible label of the  options
     */
    private statusoptions(label: string): Locator {
        return this.page.locator(`[data-test-status="${label.toLowerCase()}"]`);
        //return this.page.locator('[data-test-status="in progress"]');

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
        await this.descriptionInput.fill(taskData.taskDescriptionEdited);
    }

    /**
    * Edits the task assignee by removing the current assignee
    * and selecting a new one from the assignee dropdown.
    */
    async editAssignee(){
        await this.assigneeButton.hover();
        await this.removeAssignee.click();
        await this.assigneeDropdownOpener.click();
        await this.selectAssigneeName.click();
    }

    /**
    * Edits the task status by removing the current status.
    * and selecting a new one from the status options.
    */
    async editStatus(){
        await this.statusButton.click();
        await this.statusoptions(taskData.statusOptions[1]).click();

    }


}