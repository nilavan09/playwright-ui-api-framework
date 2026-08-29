import { test, expect } from '@playwright/test';


test('TC_001_Verify user can open ClickUp successfully', async ({ page }) => {

    await page.goto('/');

    await expect(
        page.getByText("Pozhilnilavan G's Workspace").first()
    ).toBeVisible();


});
