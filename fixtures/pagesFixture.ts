import { test as base } from '@playwright/test';
import { ProjectBoardPage } from '@pages/project/ProjectBoardPage';
import { AddTaskPage } from '@pages/task/AddTaskPage';
import { TaskDetailsPage } from '@pages/task/TaskDetailsPage';



type PageFixture = {
    projectBoardPage : ProjectBoardPage;
    addTaskPage : AddTaskPage;
    taskDetailsPage : TaskDetailsPage;

}



export const test = base.extend<PageFixture>({

    projectBoardPage: async ({page},use) => {
        await use(new ProjectBoardPage(page));
    },

    addTaskPage : async ({page},use) =>{
        await use(new AddTaskPage(page));
    },

    taskDetailsPage : async ({page},use)=>{
        await use(new TaskDetailsPage(page));
    }

});

export {expect} from '@playwright/test' 
