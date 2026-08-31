/**
 * Workspace Page Object
 * 
 * Encapsulates locators and actions for workspace-level menu operations.
 * Provides methods to open workspace settings and manage users/people sections.
 */

import {Locator , Page} from "@playwright/test";

export class WorkspacePage  {
    // Locators for workspace menu elements
    readonly workspaceToggleButton: Locator;
    readonly settingsButton: Locator;
    readonly peopleButton: Locator;
    
    /**
     * Initializes locators for the Workspace menu.
     * @param page - Playwright Page instance
     */
    constructor(page: Page) {
    
        // Workspace toggle button to open workspace menu.
        this.workspaceToggleButton = page.locator('[data-test="workspace-picker-toggle__button"]');
        // Settings menu item locator.
        this.settingsButton = page.getByRole('menuitem', { name: 'Settings' });
        // People/manage users menu item locator.
        this.peopleButton = page.locator('[data-test="workspace-picker__manage-users"]');
    
    }

    /**
     * Opens the workspace settings menu.
     * Clicks the workspace toggle button and then selects Settings.
     */
    async openSettings() {
        await this.workspaceToggleButton.click();
        await this.settingsButton.click();
    }

    /**
     * Opens the workspace people/users management menu.
     * Clicks the workspace toggle button and then selects People.
     */
    async openPeople() {
        await this.workspaceToggleButton.click();
        await this.peopleButton.click();
    }

}