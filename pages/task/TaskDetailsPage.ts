import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
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
    private readonly dateInputClear:Locator;
    private readonly removeAssignee:Locator;
    private readonly assigneeDropdownOpener:Locator;
    private readonly selectAssigneeName:Locator;
    private readonly priorityDropdown: PriorityDropdown;
    private readonly dueDateDropdown: DueDatePicker;

    

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
        this.priorityDropdown = new PriorityDropdown(page,this.priorityButton);
        this.dueDateDropdown = new DueDatePicker(page, this.dueDateButton);
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
        await this.waitForVisible(this.closeButton)
        await this.click(this.closeButton);
    }

    /**Verify task opens and verify detials */
    async verifyTaskDetails() {
        // Verify the task title matches the expected task name.
        await this.verifyTaskTitle(taskData.taskName);

        // Verify the task status is displayed correctly.
        await this.verifyStatus(taskData.statusOptions[0]);

        // verify the assignee is displayed correctly.
        await this.verifyAssignee(taskData.assignee[0])

        // Verify the task priority is displayed correctly.
        await this.priorityDropdown.verifyPriority(taskData.priorityOptions[0]);

        // Verify the task due date is displayed correctly.
        await this.dueDateDropdown.verifyDate(taskData.dueDateOptions[1].label);
    
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
    //Edits the task priority using the shared PriorityDropdown component.
    async editPriority(){
        await this.priorityDropdown.selectPriority(taskData.priorityOptions[1]);
    }
    //Verifies the task priority reflects the updated value
    async verifyEditedPriority(){
        await this.priorityDropdown.verifyPriority(taskData.priorityOptions[1])
    }
    //Selects the due date using the shared DueDatePicker component
    async selectDuedate(){
        await this.dueDateDropdown.selectDate(taskData.dueDateOptions[0].value);
    }
    //Verifies the selected due date is reflected correctly in the picker
    async verifyDueDate(){
        await this.dueDateDropdown.verifyDate(taskData.dueDateOptions[0].label);
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
    //Verifies the task assignee reflects the updated value. 
    async verifyEditedAsssignee(){
        await this.verifyAssignee(taskData.assignee[1]);
    }

    /**
    * Edits the task status by removing the current status.
    * and selecting a new one from the status options.
    */
    async editStatus(){
        await this.statusButton.click();
        await this.statusoptions(taskData.statusOptions[1]).click();

    }
    //Verifies the task status reflects the updated value. 
    async verifyEditedStatus(){
        await this.verifyStatus(taskData.statusOptions[1]);
    }

    /** Verifies the Task Details panel is closed (no longer visible). */
    async verifyTaskDetailsClosed() {
        await this.expectHidden(this.taskTitle);
    }


}