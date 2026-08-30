import { expect, test } from '@fixtures/pagesFixture';
import { taskData } from '@data/taskData';

test.describe('Project Board task status workflow', () => {
    // Open the app and navigate to the board before each flow-run so every test starts from the same page state.
    test.beforeEach(async ({ page, projectBoardPage }) => {
        await page.goto('/');
        await projectBoardPage.boardView.click();
    });

    // Verifies the core status movement workflow: create task -> To Do -> In Progress -> Complete -> cleanup.
    test('TC_013_Verify task can move from To Do to In Progress and Complete', async ({
        projectBoardPage,
        addTaskPage,
    }) => {
        // Create a fresh task and confirm it appears in the To Do bucket first.
        await projectBoardPage.addTaskButton.click();
        await addTaskPage.createTask(true, taskData.statusTaskName);

        // Confirm the newly created task is visible in the initial To Do lane before moving it.
        await expect(
            projectBoardPage.getTaskInStatusGroup(
                taskData.statusTaskName,
                projectBoardPage.todoTaskList
            )
        ).toBeVisible();

        // Drag the task into the In Progress column and verify the move is reflected in the target list.
        await projectBoardPage.dragTaskToStatus(
            taskData.statusTaskName,
            projectBoardPage.inProgressStatusGroup
        );

        await expect(projectBoardPage.getTaskInStatusGroup(
            taskData.statusTaskName,
            projectBoardPage.inProgressTaskList
        )).toBeVisible();

        // Mark the task complete and assert it lands in the Complete status bucket.
        await projectBoardPage.markTaskComplete(taskData.statusTaskName);
        await expect(projectBoardPage.getTaskInStatusGroup(
            taskData.statusTaskName,
            projectBoardPage.completeTaskList
        )).toBeVisible();

        // Clean up the task from the completed column so the board returns to a stable state.
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
