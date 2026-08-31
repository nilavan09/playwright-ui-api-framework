import {Locator , Page} from "@playwright/test";


export class WorkspacePage  {
    // Locators for workspace menu elements
    readonly workspaceToggleButton :Locator;
    readonly settingsButton :Locator;
    readonly peopleButton :Locator;
    
    // Constructor to initialize locators
    constructor(page: Page) {
    
        this.workspaceToggleButton = page.locator('[data-test="workspace-picker-toggle__button"]');
        this.settingsButton = page.getByRole('menuitem', { name: 'Settings' });
        this.peopleButton = page.locator('[data-test="workspace-picker__manage-users"]');
    
    
    }
    // Opens the workspace settings menu by clicking the workspace toggle and selecting "Settings".
    async openSettings() {
        await this.workspaceToggleButton.click();
        await this.settingsButton.click();
    }
    // Opens the workspace people menu by clicking the workspace toggle and selecting "People".
    async openPeople() {
        await this.workspaceToggleButton.click();
        await this.peopleButton.click();
    }

}