import { taskData } from '@data/taskData';
import { expect, test } from '@fixtures/pagesFixture';

test.describe.serial('Add Task validation and recovery', () => {
    test.beforeEach(async ({ page, projectBoardPage }) => {
        await page.goto('/');
        await projectBoardPage.boardView.click();
    });

    test('TC_023_Verify empty task name validation keeps the dialog open', async ({
        projectBoardPage,
        addTaskPage,
    }) => {
        await projectBoardPage.addTaskButton.click();
        await addTaskPage.createTaskButton.click();

        await expect(addTaskPage.taskNameInput).toBeVisible();
        await expect(addTaskPage.taskNameInput).toHaveValue('');
        await expect(addTaskPage.taskNameRequiredError).toBeVisible();
    });

    test('TC_024_Verify long task names are accepted in the Add Task dialog', async ({
        projectBoardPage,
        addTaskPage,
    }) => {
        await projectBoardPage.addTaskButton.click();
        await addTaskPage.taskNameInput.fill(taskData.longTaskName);

        await expect(addTaskPage.taskNameInput).toHaveValue(taskData.longTaskName);
        await addTaskPage.closeButton.click();
    });

    test('TC_025_Verify special characters are accepted in the task name field', async ({
        projectBoardPage,
        addTaskPage,
    }) => {
        await projectBoardPage.addTaskButton.click();
        await addTaskPage.taskNameInput.fill(taskData.specialTaskName);

        await expect(addTaskPage.taskNameInput).toHaveValue(taskData.specialTaskName);
        await addTaskPage.closeButton.click();
    });

    test('TC_026_Verify cancelling a draft removes the unsaved task after confirmation', async ({
        projectBoardPage,
        addTaskPage,
    }) => {
        await projectBoardPage.addTaskButton.click();
        await addTaskPage.createTask(false, taskData.cancelledTaskName);
        await addTaskPage.closeButton.click();

        await expect(addTaskPage.deleteDraftButton).toBeVisible();
        await addTaskPage.deleteDraftButton.click();

        await expect(addTaskPage.taskNameInput).not.toBeVisible();
        await expect(projectBoardPage.getTaskByName(taskData.cancelledTaskName)).not.toBeVisible();
    });

    test('TC_027_Verify canceling the save-draft prompt keeps the task draft available', async ({
        projectBoardPage,
        addTaskPage,
    }) => {
        await projectBoardPage.addTaskButton.click();
        await addTaskPage.createTask(false);
        await addTaskPage.closeButton.click();

        await expect(addTaskPage.cancelDraftButton).toBeVisible();
        await addTaskPage.cancelDraftButton.click();

        await expect(addTaskPage.taskNameInput).toBeVisible();
        await expect(addTaskPage.taskNameInput).toHaveValue(taskData.taskName);

        await addTaskPage.closeButton.click();
        await addTaskPage.deleteDraftButton.click();
        await expect(addTaskPage.taskNameInput).not.toBeVisible();
    });
});
