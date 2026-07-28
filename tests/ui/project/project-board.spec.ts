import { test, expect } from '@playwright/test';
import {ProjectBoardPage} from '@pages/project/ProjectBoardPage';


test('TC_001_Verify Project Board page loads successfully',async ({page})=>{
    const projectBoardPage = new ProjectBoardPage(page);

    await projectBoardPage.navigate('/');
    await projectBoardPage.verifyProjectName();
    await projectBoardPage.openBoardView();
    await projectBoardPage.verifyStatusColumns();
})