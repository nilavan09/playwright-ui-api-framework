import { test, expect } from "@playwright/test";
import { WorkspacePage } from "@pages/workspace/WorkspacePage";

test("Open workspace menu", async ({ page }) => {

    await page.goto("/");

    const workspace = new WorkspacePage(page);

    //await workspace.openWorkspaceMenu();

    //await expect(workspace.settingsButton).toBeVisible();

    await workspace.openSettings();
    await workspace.openPeople();
});