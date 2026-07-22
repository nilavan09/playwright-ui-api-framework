import { test, expect } from '@playwright/test';


test('check authentication', async ({ page }) => {

    await page.goto('/');

    await expect(
        page.getByText("Pozhilnilavan G's Workspace")
    ).toBeVisible();

    await page.getByRole('button',{name:'More'}).click();
    // console.log(await page.url());

    // await page.waitForTimeout(5000);

});

// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../../pages/authentication/LoginPage';


// test.describe('Login Functionality', () => {


//     let loginPage: LoginPage;


//     test.beforeEach(async ({ page }) => {

//         loginPage = new LoginPage(page);

//         await loginPage.navigate();

//     });


//     test('Verify login page elements are visible', async () => {

//         await loginPage.assertLoginFormVisible();

//     });


//     test('User should login successfully with valid credentials', async ({ page }) => {


//         await loginPage.login(
//             process.env.USER_EMAIL!,
//             process.env.USER_PASSWORD!
//         );


//         await expect(page).toHaveURL(/^https:\/\/app\.clickup\.com\//);

//     });


// });