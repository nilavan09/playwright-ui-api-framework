import { test, expect } from "@playwright/test";
import { WorkspacePage } from "@pages/workspace/WorkspacePage";

test("TC_002_Verify user can open the workspace menu", async ({ page }) => {
    // Create the page object for workspace navigation actions and open the home page.
    const workspace = new WorkspacePage(page);
    await page.goto("/");

    // Open the workspace/settings menu and verify the app navigates to the settings area.
    await workspace.openSettings();
    await expect(page).toHaveURL(/.*settings/);

    // Open the People section from the workspace menu and verify the users page loads.
    await workspace.openPeople();
    await expect(page).toHaveURL(/.*users/);
});