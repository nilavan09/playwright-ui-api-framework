import { expect, test } from '@fixtures/pagesFixture';
import { taskData } from '@data/taskData';

test.describe('Project Board task status workflow', () => {
    test.beforeEach(async ({ page, projectBoardPage }) => {
        await page.goto('/');
        await projectBoardPage.boardView.click();
    });

    test('TC_013_Verify task can move from To Do to In Progress and Complete', async ({
        projectBoardPage,
        addTaskPage,
    }) => {
        await projectBoardPage.addTaskButton.click();
        await addTaskPage.createTask(true, taskData.statusTaskName);

        await expect(
            projectBoardPage.getTaskInStatusGroup(
                taskData.statusTaskName,
                projectBoardPage.todoTaskList
            )
        ).toBeVisible();

        await projectBoardPage.dragTaskToStatus(
            taskData.statusTaskName,
            projectBoardPage.inProgressStatusGroup
        );

        await expect(projectBoardPage.getTaskInStatusGroup(
            taskData.statusTaskName,
            projectBoardPage.inProgressTaskList
        )).toBeVisible();

        await projectBoardPage.markTaskComplete(taskData.statusTaskName);
        await expect(projectBoardPage.getTaskInStatusGroup(
            taskData.statusTaskName,
            projectBoardPage.completeTaskList
        )).toBeVisible();

        await projectBoardPage.deleteTaskInStatus(
            taskData.statusTaskName,
            projectBoardPage.completeTaskList
        );
        await expect(projectBoardPage.getTaskInStatusGroup(
            taskData.statusTaskName,
            projectBoardPage.completeTaskList
        )).not.toBeVisible();
    });
});
