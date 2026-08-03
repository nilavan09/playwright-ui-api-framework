import { Page, Locator } from 'playwright';
import { BasePage } from '@pages/base/BasePage';



export class TaskDetailsPage extends BasePage {

    // Locators
    private readonly taskTitle: Locator;
    private readonly statusButton: Locator;
    private readonly assigneeButton: Locator;
    private readonly priorityButton: Locator;
    private readonly dueDateButton: Locator;
    private readonly descriptionInput: Locator;
    private readonly activitySection: Locator;
    private readonly closeButton: Locator;


    constructor(page: Page) {
        super(page);

        this.taskTitle = page.getByRole('textbox', { name: 'Edit task name' });
        this.statusButton = page.locator('[data-test="status-button-badge__body"]');
        this.assigneeButton = page.locator('[data-test^="avatar-group__user-icon"]').last();
        this.dueDateButton = page.locator('[data-test="task-dates-display-button"]');
        this.priorityButton = page.locator('[data-test="task-hero-section-priority__row-data"]');
        this.descriptionInput = page.locator('.ql-editor .ql-block').first();
        this.activitySection = page.locator('[data-link-preview-list-container="task-activity-stream"]');
        this.closeButton = page.getByRole('button', { name: 'Close window' });
    }
    async verifyTaskTitle(taskName: string) {
        await this.expectValue(this.taskTitle, taskName);
    }

    async verifyStatus(status: string) {
        await this.expectToHaveText(this.statusButton, status);
    }

    async verifyAssignee(assignee:string){
        await this.expectToHaveText(this.assigneeButton,assignee)
    }

    async verifyPriority(priority: string) {
        await this.expectToHaveText(this.priorityButton, priority);
    }

    async verifyDueDate(date: string) {
        await this.expectToHaveText(this.dueDateButton, date);
    }

    async verifyDescription(description: string) {
        await this.expectToHaveText(this.descriptionInput, description);
    }

    async verifyActivitySection() {
        await this.expectVisible(this.activitySection);
    }

    async closeTask() {
        await this.click(this.closeButton);
    }
}