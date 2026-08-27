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

test.beforeEach(async ({ page,projectBoardPage }) => {

    await page.goto('/');
    await projectBoardPage.boardView.click();
}); 


// Project Board - Page Load & UI Verification


test('TC_001_Verify Project Board page loads successfully',async ({projectBoardPage})=>{
    // Verify project title and default status columns (To Do / In Progress / Complete) render correctly.
    await expect(projectBoardPage.projectName).toBeVisible();
    await expect(projectBoardPage.todoColumn).toBeVisible();
    await expect(projectBoardPage.inProgressColumn).toBeVisible();
    await expect(projectBoardPage.completeColumn).toBeVisible();
    
})

test('TC_002_Verify Project Board toolbar is displayed',async ({projectBoardPage})=>{
    // Verify Sort, Filter, Assignee, Task Filter, Search, and Customize options are visible.
    await expect(projectBoardPage.sortButton).toBeVisible();
    await expect(projectBoardPage.filterButton).toBeVisible();
    await expect(projectBoardPage.assigneeButton).toBeVisible();
    await expect(projectBoardPage.taskFilterButton).toBeVisible();
    await expect(projectBoardPage.searchButton).toBeVisible();
    await expect(projectBoardPage.customizeButton).toBeVisible();
})

test('TC_003_Verify "Create Task" button is displayed',async ({projectBoardPage})=>{
    // Verify Create Task button is visible and enabled.
    await expect(projectBoardPage.addTaskButton).toBeVisible();
    await expect(projectBoardPage.addTaskButton).toBeEnabled();
})

// Add Task Dialog - Field Level Verification

test('TC_004_Verify clicking "Create Task" button opens Add Task dialog',async ({projectBoardPage,addTaskPage})=>{
    // Verify all required fields/buttons are present in the Add Task dialog.
    await projectBoardPage.addTaskButton.click();
    await expect(addTaskPage.taskNameInput).toBeVisible();
    await expect(addTaskPage.descriptionInput).toBeVisible();
    await expect(addTaskPage.assigneeButton).toBeVisible();
    await expect(addTaskPage.dueDateButton).toBeVisible();
    await expect(addTaskPage.priorityButton).toBeVisible();
    await expect(addTaskPage.tagsButton).toBeVisible();
    await expect(addTaskPage.createTaskButton).toBeVisible();
    await expect(addTaskPage.closeButton).toBeVisible();
    
});

test('TC_005_Verify user can enter task name', async ({ projectBoardPage,addTaskPage }) => {
    await projectBoardPage.addTaskButton.click();
    // Enter task name and verify it reflects correctly in the input field.
    await addTaskPage.taskNameInput.fill(taskData.taskName);
    await expect(addTaskPage.taskNameInput).toHaveValue(taskData.taskName);
});

test('TC_006_Verify user can enter task description', async ({ projectBoardPage,addTaskPage }) => {

    await projectBoardPage.addTaskButton.click();
    // Enter task description using centralized test data and verify it's saved correctly.
    await addTaskPage.descriptionInput.click(); 
    await addTaskPage.descriptionPlaceholder.fill(taskData.taskDescription);
    await expect(addTaskPage.descriptionPlaceholder).toHaveText(taskData.taskDescription);
});

test('TC_007_Verify user can enter select Priority', async ({ projectBoardPage,addTaskPage }) => {

    await projectBoardPage.addTaskButton.click();
    // Select "Normal" priority from dropdown and verify selection is reflected.
    await addTaskPage.priorityDropdown.selectPriority(taskData.priorityOptions[0]);
    await expect(addTaskPage.priorityButton).toContainText(taskData.priorityOptions[0]);
});

test('TC_008_Verify user can select Due Date', async ({ projectBoardPage,addTaskPage }) => {

    await projectBoardPage.addTaskButton.click();
    // Select "Tomorrow" as due date and verify it's applied.
    await addTaskPage.dueDateDropdown.selectDate(taskData.dueDateOptions[1].value);
    await expect(addTaskPage.dueDateButton).toHaveText(taskData.dueDateOptions[1].label);
});

test('TC_009_Verify user can select Assignee', async ({ projectBoardPage,addTaskPage }) => {

    await projectBoardPage.addTaskButton.click();
    // Select assignee from dropdown and verify correct user initial is displayed.
    await addTaskPage.selectAssignee();
    await expect(addTaskPage.assigeeSelector).toHaveText(taskData.assignee[0]);
});

// End-to-End Task Creation

test('TC_010_Verify user can create a task and appears on Board', async ({projectBoardPage, addTaskPage  }) => {
    
    await projectBoardPage.addTaskButton.click();  
    // Fill all task fields, submit, and verify the task appears on the Board view.
    await addTaskPage.createTask();
    await expect(projectBoardPage.getTaskByName(taskData.taskName)).toBeVisible();

});
