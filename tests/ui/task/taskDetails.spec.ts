import { test } from "@fixtures/pagesFixture";

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

    await taskDetailsPage.closeTask();
});

test("TC_011_Verify Task Details page opens", async ({ taskDetailsPage }) => {

    //verify task opens and showing detials.
    await taskDetailsPage.verifyTaskDetails();

});

test('TC_012_verify user can edit task title', async ({ taskDetailsPage }) => {

    // Edit the existing task.
    await taskDetailsPage.editTask();

    // verify edited task name
    await taskDetailsPage.verifyEditedTask();

})

test('TC_013_verify user can edit task description', async ({ taskDetailsPage }) => {

    // Edit the existing task.
    await taskDetailsPage.editDescription();
    // Verify updated Description.
    await taskDetailsPage.verifyEditedDescripition();
})

test('TC_014_verify user can edit task priority', async ({ taskDetailsPage }) => {

    // Edit the existing task priority.
    await taskDetailsPage.editPriority();
    // Verify updated priority.
    await taskDetailsPage.verifyEditedPriority();
})

test('TC_015_verify user can edit task duedate', async ({ taskDetailsPage }) => {

    // Edit the existing task duedate.
    await taskDetailsPage.selectDuedate();
    // Verify updated duedate.
    await taskDetailsPage.verifyDueDate();

})

test('TC_016_verify user can edit task asignee', async ({ taskDetailsPage }) => {

    // Edit the existing task's assignee..
    await taskDetailsPage.editAssignee();
    // Verify the updated assignee.
    await taskDetailsPage.verifyEditedAsssignee();

})

test('TC_017_verify user can edit task status', async ({ taskDetailsPage }) => {

    // Edit the existing task's status.
    await taskDetailsPage.editStatus();
    // Verify the updated task status.
    await taskDetailsPage.verifyEditedStatus();

})

test('TC_018_verify user can close task detials', {annotation: {type: "skipCleanup",description: "Close task is being tested"}},async ({ taskDetailsPage }) => {

        // close the existing task.
        await taskDetailsPage.closeTask();

        // Verify the updated task status.
        await taskDetailsPage.verifyTaskDetailsClosed();
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
        await projectBoardPage.verifydeletedTask();
    }   
);


