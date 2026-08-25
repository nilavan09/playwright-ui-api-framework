import { taskData } from "@data/taskData";
import { expect, test } from "@fixtures/pagesFixture";

/**
 * Test Suite: Task Details Page
 * 
 * Covers verification and editing of a task's details — title, status,
 * priority, due date, assignee, and description — as well as closing
 * the Task Details panel.
 * 
 * TC_011 to TC_018 are grouped under a "Task Details" describe block and
 * share a single task instance: opened in beforeEach and closed in afterEach
 * (except TC_018, which tests the close action itself and skips cleanup
 * via the "skipCleanup" annotation).
 * 
 * TC_019 runs independently and verifies task deletion from the Board view.
 */
test.describe("Task Details", () => {
/**
 * Runs before each test.
 * Navigates to the home page and opens the Board view
 * so each test starts from a consistent state.
 */
test.beforeEach(async ({ page, projectBoardPage }) => {
    await page.goto("/");
    await projectBoardPage.openBoardView();
    // Open the previously created task from the Board view(TC_010).
    await projectBoardPage.openCreatedTask();
});

test.afterEach(async ({ taskDetailsPage }, testInfo) => {
    const skipCleanup = testInfo.annotations.some(
        annotation => annotation.type === "skipCleanup"
    );

    if (skipCleanup) {
        return;
    }

    await taskDetailsPage.closeButton.click();
});

test("TC_011_Verify Task Details page opens", async ({ taskDetailsPage }) => {

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

test('TC_012_verify user can edit task title', async ({ taskDetailsPage }) => {

    // Edit the existing task.
    await taskDetailsPage.editTask();

    // verify edited task name
    await expect(taskDetailsPage.taskTitle).toHaveValue(taskData.taskNameEdit);

});

test('TC_013_verify user can edit task description', async ({ taskDetailsPage }) => {

    // Edit the existing task.
    await taskDetailsPage.editDescription();
    // Verify updated Description.
    await expect(taskDetailsPage.descriptionInput).toHaveText(taskData.taskDescriptionEdited);
});

test('TC_014_verify user can edit task priority', async ({ taskDetailsPage }) => {

    // Edit the existing task priority.
    await taskDetailsPage.priorityDropdown.selectPriority(taskData.priorityOptions[1]);
    // Verify updated priority.
    await taskDetailsPage.priorityDropdown.verifyPriority(taskData.priorityOptions[1]);
    

});

test('TC_015_verify user can edit task duedate', async ({ taskDetailsPage }) => {

    // Edit the existing task duedate.
    await taskDetailsPage.dueDateDropdown.selectDate(taskData.dueDateOptions[0].value);
    // Verify updated duedate.
    await taskDetailsPage.dueDateDropdown.verifyDate(taskData.dueDateOptions[0].label);
    
    

});

test('TC_016_verify user can edit task asignee', async ({ taskDetailsPage }) => {

    // Edit the existing task's assignee..
    await taskDetailsPage.editAssignee();
    // Verify the updated assignee.
    await expect(taskDetailsPage.assigneeButton).toHaveText(taskData.assignee[1]);

});

test('TC_017_verify user can edit task status', async ({ taskDetailsPage }) => {

    // Edit the existing task's status.
    await taskDetailsPage.editStatus();
    // Verify the updated task status.
    await expect(taskDetailsPage.statusButton).toHaveText(taskData.statusOptions[1]);

});

test('TC_018_verify user can close task detials', {annotation: {type: "skipCleanup",description: "Close task is being tested"}},async ({ taskDetailsPage }) => {

        // close the existing task.
        await taskDetailsPage.closeButton.click();

        // Verify the updated task status.
        await expect(taskDetailsPage.taskTitle).not.toBeVisible();
    }
);

}
);
/**
 * TC_019_Verify user can delete task
 * 
 * Runs independently of the "Task Details" describe block since it
 * deletes the task rather than editing/closing it. Uses "skipCleanup"
 * to avoid the shared afterEach logic acting on an already-deleted task.
 */
test("TC_019_Verify user can delete task",
    {
        annotation: {
            type: "skipCleanup",
            description: "Task is being deleted"
        }
    },
    async ({ page, projectBoardPage }) => {

        await page.goto("/");
        await projectBoardPage.openBoardView();
         // Delete the task from the Board view.
        await projectBoardPage.deleteTask();
        // Verify the task no longer appears on the Board.
        await expect(projectBoardPage.createdTask).not.toBeVisible();
    }   
);


