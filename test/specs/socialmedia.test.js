const { expect } = require('chai')
const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

describe('Social Media Links', () => {
    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';

    before(async () => {
        await LoginPage.open();
        await LoginPage.login(validUsername, validPassword);
    });

    it('7.1 - should open the Twitter page in a new tab', async () => {
        const newTab = await InventoryPage.clickSocialMediaIcon(InventoryPage.twitterIcon);
        await browser.switchToWindow(newTab);
        const url = await browser.getUrl();
        // expect(url).to.include('twitter.com', 'Twitter URL does not match');
        expect(url).to.include('x.com', 'Expected URL to contain x.com, got ' + url);
        await browser.closeWindow();
        await browser.switchToWindow((await browser.getWindowHandles())[0]);
    });

    it('7.2 - should open the Facebook page in a new tab', async () => {
        const newTab = await InventoryPage.clickSocialMediaIcon(InventoryPage.facebookIcon);
        await browser.switchToWindow(newTab);
        const url = await browser.getUrl();
        expect(url).to.include('facebook.com', 'Facebook URL does not match');
        await browser.closeWindow();
        await browser.switchToWindow((await browser.getWindowHandles())[0]);
    });

    it('7.3 - should open the LinkedIn page in a new tab', async () => {
        const newTab = await InventoryPage.clickSocialMediaIcon(InventoryPage.linkedinIcon);
        await browser.switchToWindow(newTab);
        const url = await browser.getUrl();
        expect(url).to.include('linkedin.com', 'LinkedIn URL does not match');
        await browser.closeWindow();
        await browser.switchToWindow((await browser.getWindowHandles())[0]);
    });
});
