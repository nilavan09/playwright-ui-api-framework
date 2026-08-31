/**
 * Pages Fixture Module
 * 
 * Extends Playwright's base test with custom page object fixtures.
 * Provides injected instances of page object classes to all tests,
 * enabling convenient access to page-specific locators and methods.
 * 
 * Fixtures included:
 * - projectBoardPage: ProjectBoardPage instance for board view interactions
 * - addTaskPage: AddTaskPage instance for task creation dialog interactions
 * - taskDetailsPage: TaskDetailsPage instance for task detail panel interactions
 */

import { test as base , expect } from '@playwright/test';
import { ProjectBoardPage } from '@pages/project/ProjectBoardPage';
import { AddTaskPage } from '@pages/task/AddTaskPage';
import { TaskDetailsPage } from '@pages/task/TaskDetailsPage';

/**
 * Type definition for the page fixtures.
 * Each test can request these fixtures as parameters.
 */
type PageFixture = {
    projectBoardPage : ProjectBoardPage;
    addTaskPage : AddTaskPage;
    taskDetailsPage : TaskDetailsPage;

}

/**
 * Extended test object with custom page fixtures.
 * Each fixture instantiates the corresponding page object
 * when requested by a test.
 */
export const test = base.extend<PageFixture>({

    // Provides a ProjectBoardPage instance for interacting with the board view.
    projectBoardPage: async ({page},use) => {
        await use(new ProjectBoardPage(page));
    },

    // Provides an AddTaskPage instance for interacting with the add task dialog.
    addTaskPage : async ({page},use) =>{
        await use(new AddTaskPage(page));
    },

    // Provides a TaskDetailsPage instance for interacting with the task details panel.
    taskDetailsPage : async ({page},use)=>{
        await use(new TaskDetailsPage(page));
    }

});

// Re-export expect for convenience in tests.
export {expect} ;