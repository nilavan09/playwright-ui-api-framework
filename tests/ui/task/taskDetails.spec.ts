import { test } from "@fixtures/pagesFixture";

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

    // Open the previously created task from the Board view(TC_010).
    await projectBoardPage.openCreatedTask();

    //verify task opens and showing detials.
    await taskDetailsPage.verifyTaskDetails();
    
});

test ('TC_012_verify user can edit task description',async ({projectBoardPage,taskDetailsPage})=>{

    // Open the previously created task from the Board view(TC_010).
    await projectBoardPage.openCreatedTask();
    // Edit the existing task.
    await taskDetailsPage.editTask()
    
    // verify edited task name
    await taskDetailsPage.verifyEditedTask()

})