const { expect } = require('chai');
const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');
const { URL, USER } = require('./../../utils/constants');

describe('Burger menu functionality', () => {
    before(async () => {
        await loginPage.login(USER.VALID_USERNAME, USER.VALID_PASSWORD);
    });

    it('4 - should expand menu and log out', async () => {
        await inventoryPage.expandMenu();
        expect(await inventoryPage.isMenuExpanded()).to.be.true;

        await inventoryPage.logout();
        const currentUrl = await inventoryPage.getCurrentUrl();
        expect(currentUrl).to.equal(
            URL.LOGIN,
            'User was not redirected to the login page.'
        );

        expect(await loginPage.isUsernameFieldEmpty()).to.be.true;
        expect(await loginPage.isPasswordFieldEmpty()).to.be.true;
    });
});
