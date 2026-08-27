// import { test as setup } from '@playwright/test';

// const authFile = 'auth/clickup.json';

// setup('authenticate', async ({ page }) => {


//   await page.goto('https://app.clickup.com/login');
//   await page.locator('[data-test="form__email-input"]').click();
//   await page.locator('[data-test="form__email-input"]').fill(process.env.EMAIL!);
//   await page.locator('[data-test="form__email-input"]').press('Tab');
//   await page.locator('[data-test="form__password-input"]').fill(process.env.PASSWORD!);
//   await page.locator('[data-test="login-submit"]').click();

//   await page.waitForURL(/app\.clickup\.com\/\d+/);
//   // await page.waitForTimeout(15000);


//   //   console.log('Current URL:', page.url());
  


//     await page.context().storageState({
//         path: authFile
//     });

// });

import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/authentication/LoginPage';
import { loginData } from '@data/loginData';

const authFile = 'auth/clickup.json';

setup('authenticate clickup user', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await page.goto(process.env.BASE_URL + '/login');

    await loginPage.submitlogin(loginData.validUser.email, loginData.validUser.password);


    // Wait until login is completed
    await expect(page.getByText("Pozhilnilavan G's Workspace")).toBeVisible();


    // Save logged-in session
    await page.context().storageState({path: authFile});

});

