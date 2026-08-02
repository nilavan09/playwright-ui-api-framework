import { test as base } from '@playwright/test';
import { ProjectBoardPage } from '@pages/project/ProjectBoardPage';
import { AddTaskPage } from '@pages/task/AddTaskPage';



type PageFixture = {
    projectBoardPage : ProjectBoardPage;
    addTaskPage : AddTaskPage;

}



export const test = base.extend<PageFixture>({

    projectBoardPage: async ({page},use) => {
        await use(new ProjectBoardPage(page));
    },

    addTaskPage : async ({page},use) =>{
        await use(new AddTaskPage(page));
    }

});

export {expect} from '@playwright/test' 
