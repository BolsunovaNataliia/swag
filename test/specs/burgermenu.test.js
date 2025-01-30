const { expect } = require('chai')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/inventory.page');

describe('Burger menu functionality', () => {
    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';

    before(async () => {
        await LoginPage.open();
        await LoginPage.login(validUsername, validPassword);
    });

    it('4 - should expand menu and log out', async () => {
        await InventoryPage.expandMenu();
        expect(await InventoryPage.isMenuExpanded()).to.be.true;

        await InventoryPage.logout();
        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.equal(
            'https://www.saucedemo.com/',
            'User was not redirected to the login page.'
        );

        const usernameValue = await LoginPage.usernameField.getValue();
        const passwordValue = await LoginPage.passwordField.getValue();
        expect(usernameValue).to.equal('', 'Username field is not empty.');
        expect(passwordValue).to.equal('', 'Password field is not empty.');
    })
})
