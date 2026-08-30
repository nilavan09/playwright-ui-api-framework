import { test, expect } from '@playwright/test';


test('TC_001_Verify user can open ClickUp successfully', async ({ page }) => {
    // Open the ClickUp application home page for the logged-in user.
    await page.goto('/');

    // Verify that the expected workspace is visible after successful login and app load.
    await expect(
        page.getByText("Pozhilnilavan G's Workspace").first()
    ).toBeVisible();
});
