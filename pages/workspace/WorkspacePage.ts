import {Locator , Page} from "@playwright/test";


export class WorkspacePage  {
    
    readonly workspaceToogleButton :Locator
    readonly settingsButton :Locator
    readonly peopleButton :Locator
    
    
    constructor(page: Page) {
    
        this.workspaceToogleButton = page.locator('[data-test="workspace-picker-toggle__button"]');
        this.settingsButton = page.getByText("Settings");
        this.peopleButton = page.getByText("People");
    
    
    }

    async openWorkspaceMenu() {
        await this.workspaceToogleButton.click();
    }

    async openSettings() {
        await this.openWorkspaceMenu();
        await this.settingsButton.nth(4).click();
    }

    async openPeople() {
        await this.openWorkspaceMenu();
        await this.peopleButton.nth(1).click();
    }

}