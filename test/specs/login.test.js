const { expect } = require('chai');
const loginPage = require('../pageobjects/login.page');
const inventoryPage = require("../pageobjects/inventory.page");
const data = require('./../../utils/data');
const { URL, USER } = require('./../../utils/constants');

describe('Login', () => {
    it('1 - should login with valid credentials', async () => {
        await loginPage.open();
        await loginPage.fillCredentials(USER.VALID_USERNAME, USER.VALID_PASSWORD);
        expect(await loginPage.getUsername()).to.equal(USER.VALID_USERNAME);
        expect(await loginPage.getPassword()).to.equal(USER.VALID_PASSWORD);

        const passwordFieldType = await loginPage.getPasswordFieldType();
        expect(passwordFieldType).to.equal('password');

        await loginPage.clickLoginBtn()
        const currentUrl = await loginPage.getCurrentUrl();
        expect(currentUrl).to.equal(
            URL.INVENTORY ,
            'User was not redirected to the inventory page.'
        );
        expect(await inventoryPage.isPageDisplayed()).to.be.true;
        expect(await inventoryPage.isCartIconDisplayed()).to.be.true;
    })

    data.userData.forEach(({ username, password }) => {
        it(`2-3 - should show error with username: ${username} or password: ${password}`,
            async () => {
            await loginPage.open();
            await loginPage.fillCredentials(username, password);
            expect(await loginPage.getUsername()).to.equal(username);
            expect(await loginPage.getPassword()).to.equal(password);

            const passwordFieldType = await loginPage.getPasswordFieldType();
            expect(passwordFieldType).to.equal('password');

            await loginPage.clickLoginBtn();

            expect(await loginPage.isErrorIconUsernameFieldDisplayed()).to.be.true;
            expect(await loginPage.isErrorIconPasswordFieldDisplayed()).to.be.true;

            const actualErrorMessage = await loginPage.getErrorMessageText();
            expect(actualErrorMessage).to.include(
                'Username and password do not match',
                'Error message was not displayed for invalid username or password.'
            );

            const currentUrl = await loginPage.getCurrentUrl();
            expect(currentUrl).to.equal(
                URL.LOGIN,
                'User should not be redirected on invalid login.'
            );
        });
    });
})
