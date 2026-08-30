import { taskData } from "@data/taskData";
import { expect, test } from "@fixtures/pagesFixture";

/**
 * Test Suite: Task Details Page
 * 
 * Covers verification and editing of a task's details — title, status,
 * priority, due date, assignee, and description — as well as closing
 * the Task Details panel.
 * 
 * TC_013 to TC_020 are grouped under a "Task Details" describe block and
 * share a single task instance: opened in beforeEach and closed in afterEach.
 * 
 * TC_021 verifies task deletion from the Board view.
 */
test.describe.serial("Task Details", () => {

    /**
     * Creates one task at the beginning of the Task Details test flow.
     */
    test("Setup - Create task for Task Details tests", async ({
        page,
        projectBoardPage,
        addTaskPage
    }) => {
        await page.goto("/");
        await projectBoardPage.boardView.click();

        await projectBoardPage.addTaskButton.click();
        await addTaskPage.createTask();
    });

    /**
     * Runs before each test.
     * Navigates to the home page and opens the Board view.
     * The setup test only creates the task and does not need to open it.
     */
    test.beforeEach(async ({ page, projectBoardPage }, testInfo) => {
        await page.goto("/");
        await projectBoardPage.boardView.click();

        if (testInfo.title !== "Setup - Create task for Task Details tests") {
            // Open the previously created task.
            await projectBoardPage.openCreatedTask();
        }
    });

    test.afterEach(async ({ taskDetailsPage }, testInfo) => {

        // TC_021 closes the task itself, so no cleanup is required.
        if (
            testInfo.title !== "Setup - Create task for Task Details tests" &&
            testInfo.title !== "TC_020_verify user can close task detials"
        ) {
            await taskDetailsPage.closeButton.click();
        }
    });

    test("TC_014_Verify Task Details page opens", async ({ taskDetailsPage }) => {

        //verify task opens and showing detials.
        //Verify the task title matches the expected task name.
        await expect(taskDetailsPage.taskTitle).toHaveValue(taskData.taskName);
        //Verify the task status is displayed correctly.
        await expect(taskDetailsPage.statusButton).toHaveText(taskData.statusOptions[0]);
        //Verify the task assignee is displayed correctly.
        await expect(taskDetailsPage.assigneeButton).toHaveText(taskData.assignee[0]);
        //Verify the task priority is displayed correctly.
        await expect(taskDetailsPage.priorityButton).toHaveText(taskData.priorityOptions[0]);
        //Verify the task due date is displayed correctly.
        await expect(taskDetailsPage.dueDateButton).toHaveText(taskData.dueDateOptions[1].label);
        //Verify the task description is displayed correctly.
        await expect(taskDetailsPage.descriptionInput).toHaveText(taskData.taskDescription);
        //Verify the activity/history section is visible on the task details page.
        await expect(taskDetailsPage.activitySection).toBeVisible();
    });

    test('TC_015_verify user can edit task title', async ({ taskDetailsPage }) => {

        // Edit the existing task.
        await taskDetailsPage.editTask();

        // verify edited task name
        await expect(taskDetailsPage.taskTitle).toHaveValue(taskData.taskNameEdit);

    });

    test('TC_016_verify user can edit task description', async ({ taskDetailsPage }) => {

        // Edit the existing task.
        await taskDetailsPage.editDescription();
        // Verify updated Description.
        await expect(taskDetailsPage.descriptionInput).toHaveText(taskData.taskDescriptionEdited);
    });

    test('TC_017_verify user can edit task priority', async ({ taskDetailsPage }) => {

        // Edit the existing task priority.
        await taskDetailsPage.priorityDropdown.selectPriority(taskData.priorityOptions[1]);
        // Verify updated priority.
        await expect(taskDetailsPage.priorityButton).toHaveText(taskData.priorityOptions[1]);


    });

    test('TC_018_verify user can edit task duedate', async ({ taskDetailsPage }) => {

        // Edit the existing task duedate.
        await taskDetailsPage.dueDateDropdown.selectDate(taskData.dueDateOptions[0].value);
        // Verify updated duedate.
        await expect(taskDetailsPage.dueDateButton).toHaveText(taskData.dueDateOptions[0].label);
        
        
    });

    test('TC_019_verify user can edit task asignee', async ({ taskDetailsPage }) => {

        // Edit the existing task's assignee..
        await taskDetailsPage.editAssignee();
        // Verify the updated assignee.
        await expect(taskDetailsPage.assigneeButton).toHaveText(taskData.assignee[1]);

    });

    test('TC_020_verify user can edit task status', async ({ taskDetailsPage }) => {

        // Edit the existing task's status.
        await taskDetailsPage.editStatus();
        // Verify the updated task status.
        await expect(taskDetailsPage.statusButton).toHaveText(taskData.statusOptions[1]);

    });

    test('TC_021_verify user can close task detials', async ({ taskDetailsPage }) => {

        // close the existing task.
        await taskDetailsPage.closeButton.click();

        // Verify the task details panel is closed.
        await expect(taskDetailsPage.taskTitle).not.toBeVisible();
    });

   

});

 /**
    * TC_022_Verify user can delete task
    *
     * Deletes the same task that was created by the setup test.
     */
    test("TC_022_Verify user can delete edited task", async ({ page, projectBoardPage }) => {

        // Verify the task can be deleted from the Board view and no longer appears in the list of tasks.
        await page.goto("/");
        await projectBoardPage.boardView.click();

        // Delete the task from the Board view.
        await projectBoardPage.deleteTask();

        // Verify the task no longer appears on the Board.
        await expect(projectBoardPage.getTaskByName(taskData.taskNameEdit)).not.toBeVisible();
    });