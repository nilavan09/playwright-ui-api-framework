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

test ('TC_012_verify user can edit task title',async ({projectBoardPage,taskDetailsPage})=>{

    // Open the previously created task from the Board view(TC_010).
    await projectBoardPage.openCreatedTask();
    // Edit the existing task.
    await taskDetailsPage.editTask();
    
    // verify edited task name
    await taskDetailsPage.verifyEditedTask();

})

test ('TC_013_verify user can edit task description',async ({projectBoardPage,taskDetailsPage})=>{

    // Open the previously created task from the Board view(TC_010).
    await projectBoardPage.openCreatedTask();
    // Edit the existing task.
    await taskDetailsPage.editDescription();
    // Verify updated Description.
    await taskDetailsPage.verifyEditedDescripition();
})

test ('TC_014_verify user can edit task priority',async ({projectBoardPage,taskDetailsPage})=>{

    // Open the previously created task from the Board view(TC_010).
    await projectBoardPage.openCreatedTask();
    // Edit the existing task priority.
    await taskDetailsPage.editPriority();
    // Verify updated priority.
    await taskDetailsPage.verifyEditedPriority();
})

test ('TC_015_verify user can edit task duedate',async ({projectBoardPage,taskDetailsPage})=>{

    // Open the previously created task from the Board view(TC_010).
    await projectBoardPage.openCreatedTask();
    // Edit the existing task duedate.
    await taskDetailsPage.editDueDate();
    // Verify updated duedate.
    await taskDetailsPage.verifyeditedDueDate();

})
                            
test ('TC_016_verify user can edit task asignee',async ({projectBoardPage,taskDetailsPage})=>{

    // Open the previously created task from the Board view(TC_010).
    await projectBoardPage.openCreatedTask();
    // Edit the existing task's assignee..
    await taskDetailsPage.editAssignee();
    // Verify the updated assignee.
    await taskDetailsPage.verifyEditedAsssignee();

})

test ('TC_017_verify user can edit task status',async ({projectBoardPage,taskDetailsPage})=>{

    // Open the previously created task from the Board view(TC_010).
    await projectBoardPage.openCreatedTask();
    // Edit the existing task's status.
    await taskDetailsPage.editStatus();
    // Verify the updated task status.
    await taskDetailsPage.verifyEditedStatus();

})

test ('TC_018_verify user can close task detials',async ({projectBoardPage,taskDetailsPage})=>{

    // Open the previously created task from the Board view(TC_010).
    await projectBoardPage.openCreatedTask();
    // close the existing task.
    await taskDetailsPage.closeTask();
    // Verify the updated task status.
    await taskDetailsPage.verifyTaskDetailsClosed();

})



