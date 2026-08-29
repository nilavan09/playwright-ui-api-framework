import { test, expect } from "@playwright/test";
import { WorkspacePage } from "@pages/workspace/WorkspacePage";

test("TC_002_Verify user can open the workspace menu", async ({ page }) => {
    const workspace = new WorkspacePage(page);
    await page.goto("/");
    await workspace.openSettings();
    await expect(page).toHaveURL(/.*settings/);
    await workspace.openPeople();
    await expect(page).toHaveURL(/.*users/);
});