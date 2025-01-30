const { expect } = require('chai')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require("../pageobjects/inventory.page");
const CartPage = require("../pageobjects/cart.page");

describe('Login', () => {
    it('1 - should login with valid credentials', async () => {
        await LoginPage.open()
        await LoginPage.fillCredentials('standard_user', 'secret_sauce')

        const passwordField = $('#password');
        const passwordFieldType = await passwordField.getAttribute('type');
        expect(passwordFieldType).to.equal('password');

        await LoginPage.clickLoginBtn()
        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.equal(
            'https://www.saucedemo.com/inventory.html',
            'User was not redirected to the inventory page.');

        const isInventoryPageDisplayed = await InventoryPage.isPageDisplayed();
        expect(isInventoryPageDisplayed).to.be.true;

        const isProductsDisplayed = await InventoryPage.isPageDisplayed();
        expect(isProductsDisplayed).to.be.true;
    })

    const testData = [
        { username: 'standard_user', password: 'invalid_password' },
        { username: 'invalid_user', password: 'secret_sauce' },
    ];

    testData.forEach(({ username, password }) => {
        it(`2-3 - should show error with username: ${username} or password: ${password}`,
            async () => {
            await LoginPage.open();
            await LoginPage.fillCredentials(username, password);

            const passwordField = $('#password');
            const passwordFieldType = await passwordField.getAttribute('type');
            expect(passwordFieldType).to.equal('password');

            await LoginPage.clickLoginBtn();

            expect(await LoginPage.isErrorIconUsernameFieldDisplayed()).to.be.true;
            expect(await LoginPage.isErrorIconPasswordFieldDisplayed()).to.be.true;

            const actualErrorMessage = await $('#login_button_container .error-message-container').getText();
            expect(actualErrorMessage).to.include(
                'Username and password do not match',
                'Error message was not displayed for invalid username or password.'
            );

            const currentUrl = await browser.getUrl();
            expect(currentUrl).to.equal(
                'https://www.saucedemo.com/',
                'User should not be redirected on invalid login.'
            );
        });
    });
})
