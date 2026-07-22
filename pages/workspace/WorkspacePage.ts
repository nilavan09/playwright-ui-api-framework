import {Locator , Page} from "@playwright/test";
import {BasePage} from "../base/BasePage";

export class WorkspacePage extends BasePage {
    
    readonly workspaceToogleButton :Locator
    readonly settingsButton :Locator
    readonly peopleButton :Locator
    
    
    constructor(page: Page) {
        super(page);
    
        this.workspaceToogleButton = page.locator('[data-test="workspace-picker-toggle__button"]');
        this.settingsButton = page.getByText("Settings");
        this.peopleButton = page.getByText("People");
    
    
    }

    async openWorkspaceMenu() {
        await this.click(this.workspaceToogleButton);
    }

    async openSettings() {
        await this.openWorkspaceMenu();
        await this.click(this.settingsButton.nth(4));
    }

    async openPeople() {
        await this.openWorkspaceMenu();
        await this.click(this.peopleButton.nth(1));
    }

}