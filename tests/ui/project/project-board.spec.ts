import { test } from '@playwright/test';
import {ProjectBoardPage} from '@pages/project/ProjectBoardPage';
import { AddTaskPage } from '@pages/task/AddTaskPage';


let projectBoardPage: ProjectBoardPage;
let addTaskPage: AddTaskPage;

test.beforeEach(async ({ page }) => {
    
    projectBoardPage = new ProjectBoardPage(page);  
    addTaskPage = new AddTaskPage(page);

    await projectBoardPage.navigate('/');
    await projectBoardPage.openBoardView();
}); 




test('TC_001_Verify Project Board page loads successfully',async ({page})=>{
    const projectBoardPage = new ProjectBoardPage(page);

    await projectBoardPage.verifyProjectName();
    await projectBoardPage.verifyStatusColumns();
})

test('TC_002_Verify Project Board toolbar is displayed',async ({page})=>{
    const projectBoardPage = new ProjectBoardPage(page);

    await projectBoardPage.verifyToolBarOptions();
})

test('TC_003_Verify "Create Task" button is displayed',async ({page})=>{
    const projectBoardPage = new ProjectBoardPage(page);

    await projectBoardPage.verifyCreateTaskButton();
})

test('TC_004_Verify clicking "Create Task" button opens Add Task dialog',async ({page})=>{
    const projectBoardPage = new ProjectBoardPage(page);
    const addTaskPage = new AddTaskPage(page);

    await projectBoardPage.clickAddTask();
    await addTaskPage.verifyAddTaskDialog();
});

test('TC_005_Verify user can enter task name', async ({ page }) => {

    const projectBoardPage = new ProjectBoardPage(page);
    const addTaskPage = new AddTaskPage(page);
    const taskName = "TC_005_Playwright Demo Task";

    await projectBoardPage.clickAddTask();

    await addTaskPage.fillTaskName(taskName);
    await addTaskPage.verifyTaskName(taskName);
});

test('TC_006_Verify user can enter task description', async ({ page }) => {

    const projectBoardPage = new ProjectBoardPage(page);
    const addTaskPage = new AddTaskPage(page);
    const taskDescription = "This is a demo task description for TC_006";

    await projectBoardPage.clickAddTask();

    await addTaskPage.fillDescription(taskDescription);
    await addTaskPage.verifyDescription(taskDescription);
});

test('TC_007_Verify user can enter select Priority', async ({ page }) => {

    const projectBoardPage = new ProjectBoardPage(page);
    const addTaskPage = new AddTaskPage(page);

    await projectBoardPage.clickAddTask();

    await addTaskPage.selectNormalPriority();
    await addTaskPage.verifyNormalPrioritySelected();
});

test('TC_008_Verify user can select Due Date', async ({ page }) => {

    const projectBoardPage = new ProjectBoardPage(page);
    const addTaskPage = new AddTaskPage(page);  

    await projectBoardPage.clickAddTask();  

    await addTaskPage.selectDueDate();
    await addTaskPage.verifyDueDateSelected();
});

test('TC_009_Verify user can select Assignee', async ({ page }) => {

    const projectBoardPage = new ProjectBoardPage(page);
    const addTaskPage = new AddTaskPage(page);

    await projectBoardPage.clickAddTask();  

    await addTaskPage.selectAssignee();
    await addTaskPage.verifyAssigneeSelected("R");
});

    test('TC_010_Verify user can create a task and appears on Board', async ({ page }) => {

    const projectBoardPage = new ProjectBoardPage(page);
    const addTaskPage = new AddTaskPage(page);

    await projectBoardPage.clickAddTask();  

    await addTaskPage.createTask();
    await projectBoardPage.verifyCreatedTask();
});
