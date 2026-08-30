import { taskData } from '@data/taskData';
import { expect, test } from '@fixtures/pagesFixture';

test.describe.serial('Add Task validation and recovery', () => {
    // Navigate to the board for each test so validation cases start from the same page state.
    test.beforeEach(async ({ page, projectBoardPage }) => {
        await page.goto('/');
        await projectBoardPage.boardView.click();
    });

    // Verifies the required task-name validation keeps the Create Task dialog open with the proper error shown.
    test('TC_023_Verify empty task name validation keeps the dialog open', async ({
        projectBoardPage,
        addTaskPage,
    }) => {
        await projectBoardPage.addTaskButton.click();
        await addTaskPage.createTaskButton.click();

        // The dialog should stay open and display the required-field message instead of submitting an empty task.
        await expect(addTaskPage.taskNameInput).toBeVisible();
        await expect(addTaskPage.taskNameInput).toHaveValue('');
        await expect(addTaskPage.taskNameRequiredError).toBeVisible();
    });

    // Ensures the task-name field accepts longer values without validation failure or truncation.
    test('TC_024_Verify long task names are accepted in the Add Task dialog', async ({
        projectBoardPage,
        addTaskPage,
    }) => {
        await projectBoardPage.addTaskButton.click();
        await addTaskPage.taskNameInput.fill(taskData.longTaskName);

        // The entered long text should remain intact in the input before the user closes the dialog.
        await expect(addTaskPage.taskNameInput).toHaveValue(taskData.longTaskName);
        await addTaskPage.closeButton.click();
    });

    // Validates that special characters are accepted as part of the task title without breaking the dialog.
    test('TC_025_Verify special characters are accepted in the task name field', async ({
        projectBoardPage,
        addTaskPage,
    }) => {
        await projectBoardPage.addTaskButton.click();
        await addTaskPage.taskNameInput.fill(taskData.specialTaskName);

        // The input should preserve special characters exactly as typed by the user.
        await expect(addTaskPage.taskNameInput).toHaveValue(taskData.specialTaskName);
        await addTaskPage.closeButton.click();
    });

    // Confirms that choosing delete-draft after closing the dialog removes the unsaved task and leaves no board trace.
    test('TC_026_Verify cancelling a draft removes the unsaved task after confirmation', async ({
        projectBoardPage,
        addTaskPage,
    }) => {
        await projectBoardPage.addTaskButton.click();
        await addTaskPage.createTask(false, taskData.cancelledTaskName);
        await addTaskPage.closeButton.click();

        // After confirmation, the draft should be removed and the unsaved task should not appear on the board.
        await expect(addTaskPage.deleteDraftButton).toBeVisible();
        await addTaskPage.deleteDraftButton.click();

        await expect(addTaskPage.taskNameInput).not.toBeVisible();
        await expect(projectBoardPage.getTaskByName(taskData.cancelledTaskName)).not.toBeVisible();
    });

    // Verifies that canceling the draft prompt reopens the dialog with the entered values still intact.
    test('TC_027_Verify canceling the save-draft prompt keeps the task draft available', async ({
        projectBoardPage,
        addTaskPage,
    }) => {
        await projectBoardPage.addTaskButton.click();
        await addTaskPage.createTask(false);
        await addTaskPage.closeButton.click();

        // The draft should remain preserved when the user chooses cancel instead of deleting it.
        await expect(addTaskPage.cancelDraftButton).toBeVisible();
        await addTaskPage.cancelDraftButton.click();

        await expect(addTaskPage.taskNameInput).toBeVisible();
        await expect(addTaskPage.taskNameInput).toHaveValue(taskData.taskName);

        // Clean up the reopened draft to keep the test environment stable for later runs.
        await addTaskPage.closeButton.click();
        await addTaskPage.deleteDraftButton.click();
        await expect(addTaskPage.taskNameInput).not.toBeVisible();
    });
});
