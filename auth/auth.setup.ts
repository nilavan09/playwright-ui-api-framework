/**
 * Authentication Setup Module
 * 
 * Handles user authentication for the ClickUp application.
 * Logs in with valid credentials and saves the authenticated session
 * to a storage state file for use in subsequent tests.
 * 
 * This setup runs once before all tests to establish a logged-in session.
 */

import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/authentication/LoginPage';
import { loginData } from '@data/loginData';

const authFile = 'auth/clickup.json';

setup('authenticate clickup user', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await page.goto(process.env.BASE_URL + '/login');

    await loginPage.submitLogin(loginData.validUser.email, loginData.validUser.password);


    // Wait until login is completed
    await expect(page.getByText("Pozhilnilavan G's Workspace")).toBeVisible();


    // Save logged-in session
    await page.context().storageState({path: authFile});

});

