import { test, expect } from '@playwright/test';
import {ProjectBoardPage} from '@pages/project/ProjectBoardPage';
import { AddTaskPage } from '@pages/task/AddTaskPage';


test('TC_001_Verify Project Board page loads successfully',async ({page})=>{
    const projectBoardPage = new ProjectBoardPage(page);

    await projectBoardPage.navigate('/');
    await projectBoardPage.verifyProjectName();
    await projectBoardPage.openBoardView();
    await projectBoardPage.verifyStatusColumns();
})

test('TC_002_Verify Project Board toolbar is displayed',async ({page})=>{
    const projectBoardPage = new ProjectBoardPage(page);

    await projectBoardPage.navigate('/');
    await projectBoardPage.openBoardView();
    await projectBoardPage.verifyToolBarOptions();
})

test('TC_003_Verify "Create Task" button is displayed',async ({page})=>{
    const projectBoardPage = new ProjectBoardPage(page);

    await projectBoardPage.navigate('/');
    await projectBoardPage.openBoardView();
    await projectBoardPage.verifyCreateTaskButton();
})

test('TC_004_Verify clicking "Create Task" button opens Add Task dialog',async ({page})=>{
    const projectBoardPage = new ProjectBoardPage(page);
    const addTaskPage = new AddTaskPage(page);
    await projectBoardPage.navigate('/');
    await projectBoardPage.openBoardView();
    await projectBoardPage.clickAddTask();
    await addTaskPage.verifyAddTaskDialog();
});

test('TC_005_Verify user can enter task name', async ({ page }) => {

    const projectBoardPage = new ProjectBoardPage(page);
    const addTaskPage = new AddTaskPage(page);
    const taskName = "TC_005_Playwright Demo Task";

    await projectBoardPage.navigate('/');
    await projectBoardPage.openBoardView();
    await projectBoardPage.clickAddTask();

    await addTaskPage.fillTaskName(taskName);
    await addTaskPage.verifyTaskName(taskName);
});

test('TC_006_Verify user can enter task description', async ({ page }) => {

    const projectBoardPage = new ProjectBoardPage(page);
    const addTaskPage = new AddTaskPage(page);
    const taskDescription = "This is a demo task description for TC_006";

    await projectBoardPage.navigate('/');
    await projectBoardPage.openBoardView();
    await projectBoardPage.clickAddTask();

    await addTaskPage.fillDescription(taskDescription);
    await addTaskPage.verifyDescription(taskDescription);
});