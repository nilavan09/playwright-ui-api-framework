import { test } from "@fixtures/pagesFixture";
import { taskData } from "@data/taskData";

/**
 * Test Suite: Task Details Page
 * 
 * Verifies that a created task can be opened from the Board view
 * and that all its details (title, status, priority, due date,
 * description, and activity log) display correctly.
 */

/**
 * Runs before each test.
 * Navigates to the home page and opens the Board view
 * so each test starts from a consistent state.
 */
test.beforeEach(async ({ projectBoardPage }) => {
    await projectBoardPage.navigate("/");
    await projectBoardPage.openBoardView();
});

test("TC_011_Verify Task Details page opens", async ({ projectBoardPage, taskDetailsPage }) => {

    // Open the previously created task from the Board view.
    await projectBoardPage.openCreatedTask();

    // Verify the task title matches the expected task name.
    await taskDetailsPage.verifyTaskTitle(taskData.taskName);

    // Verify the task status is displayed correctly.
    await taskDetailsPage.verifyStatus(taskData.status);

    // verify the assignee is displayed correctly.
    await taskDetailsPage.verifyAssignee(taskData.assignee)

    // Verify the task priority is displayed correctly.
    await taskDetailsPage.verifyPriority(taskData.priority);

    // Verify the task due date is displayed correctly.
    await taskDetailsPage.verifyDueDate(taskData.dueDate);

    // Verify the task description matches the expected content.
    await taskDetailsPage.verifyDescription(taskData.taskDescription);

    // Verify the activity/history section is visible on the task details page.
    await taskDetailsPage.verifyActivitySection();
});