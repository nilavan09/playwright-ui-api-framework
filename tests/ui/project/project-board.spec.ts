import { test , expect } from '@fixtures/pagesFixture';
import { taskData } from '@data/taskData';


/**
 * Test Suite: Project Board - Task Creation
 * 
 * Covers verification of the Project Board page, its toolbar,
 * the Add Task dialog, and end-to-end task creation flow.
 */

/**
 * Runs before every test.
 * Navigates to the home page and opens the Board view
 * so each test starts from a consistent state.
 */

test.beforeEach(async ({ projectBoardPage }) => {

    await projectBoardPage.navigate('/');
    await projectBoardPage.openBoardView();
}); 


// Project Board - Page Load & UI Verification


test('TC_001_Verify Project Board page loads successfully',async ({projectBoardPage})=>{
    // Verify project title and default status columns (To Do / In Progress / Complete) render correctly.
    await projectBoardPage.verifyProjectName();
    await projectBoardPage.verifyStatusColumns();
})

test('TC_002_Verify Project Board toolbar is displayed',async ({projectBoardPage})=>{
    // Verify Sort, Filter, Assignee, Task Filter, Search, and Customize options are visible.
    await projectBoardPage.verifyToolBarOptions();
})

test('TC_003_Verify "Create Task" button is displayed',async ({projectBoardPage})=>{
    // Verify Create Task button is visible and enabled.
    await projectBoardPage.verifyCreateTaskButton();
})

// Add Task Dialog - Field Level Verification

test('TC_004_Verify clicking "Create Task" button opens Add Task dialog',async ({projectBoardPage,addTaskPage})=>{
    // Verify all required fields/buttons are present in the Add Task dialog.
    await projectBoardPage.clickAddTask();
    await addTaskPage.verifyAddTaskDialog();
});

test('TC_005_Verify user can enter task name', async ({ projectBoardPage,addTaskPage }) => {
    await projectBoardPage.clickAddTask();
    // Enter task name and verify it reflects correctly in the input field.
    await addTaskPage.fillTaskName(taskData.taskName);
    await addTaskPage.verifyTaskName(taskData.taskName);
});

test('TC_006_Verify user can enter task description', async ({ projectBoardPage,addTaskPage }) => {

    await projectBoardPage.clickAddTask();
    // Enter task description using centralized test data and verify it's saved correctly.
    await addTaskPage.fillDescription(taskData.taskDescription);
    await addTaskPage.verifyDescription(taskData.taskDescription);
});

test('TC_007_Verify user can enter select Priority', async ({ projectBoardPage,addTaskPage }) => {

    await projectBoardPage.clickAddTask();
    // Select "Normal" priority from dropdown and verify selection is reflected.
    await addTaskPage.selectNormalPriority();
    await addTaskPage.verifyNormalPrioritySelected();
});

test('TC_008_Verify user can select Due Date', async ({ projectBoardPage,addTaskPage }) => {

    await projectBoardPage.clickAddTask();  
    // Select "Tomorrow" as due date and verify it's applied.
    await addTaskPage.selectDueDate();
    await addTaskPage.verifyDueDateSelected();
});

test('TC_009_Verify user can select Assignee', async ({ projectBoardPage,addTaskPage }) => {

    await projectBoardPage.clickAddTask();  
    // Select assignee from dropdown and verify correct user initial is displayed.
    await addTaskPage.selectAssignee();
    await addTaskPage.verifyAssigneeSelected(taskData.assignee[0]);
});

// End-to-End Task Creation

test('TC_010_Verify user can create a task and appears on Board', async ({projectBoardPage, addTaskPage  }) => {
    
    await projectBoardPage.clickAddTask();  
    // Fill all task fields, submit, and verify the task appears on the Board view.
    await addTaskPage.createTask();
    await projectBoardPage.verifyCreatedTask();
});
