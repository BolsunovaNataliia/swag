const { expect } = require('chai');
const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');
const cartPage = require('../pageobjects/cart.page');
const { URL, USER } = require('./../../utils/constants');
const data = require('./../../utils/data');

describe('Cart functionality', () => {
    beforeEach(async () => {
        await loginPage.login(USER.VALID_USERNAME, USER.VALID_PASSWORD);
    });

    it('5 - the cart item should persist after logout and login',
        async () => {
        await inventoryPage.addToCart();
        expect(await inventoryPage.getCartBadgeNumber()).to.equal(
            '1', 'Cart badge count did not update.'
        );

        await inventoryPage.expandMenu();
        expect(await inventoryPage.isMenuExpanded()).to.be.true;

        await inventoryPage.logout();
        expect(await inventoryPage.getCurrentUrl()).to.equal(
            URL.LOGIN,
            'User was not redirected to the login page.'
        );
        expect(await loginPage.isUsernameFieldEmpty()).to.be.true;
        expect(await loginPage.isPasswordFieldEmpty()).to.be.true;

        await loginPage.login(USER.VALID_USERNAME, USER.VALID_PASSWORD);
        const currentUrl = await loginPage.getCurrentUrl();
        expect(currentUrl).to.equal(
            URL.INVENTORY ,
            'User was not redirected to the inventory page.'
        );
        expect(await inventoryPage.isPageDisplayed()).to.be.true;
        expect(await inventoryPage.isCartIconDisplayed()).to.be.true;

        await inventoryPage.openCart();
        expect(await cartPage.isPageDisplayed()).to.be.true;

        expect(await cartPage.getCartItemName()).to.include(
            data.products.firstProductName,
            'Product not found in the cart.'
        );
    });

    it('should be able to return to inventory from the cart page',
        async () => {
        await inventoryPage.openCart();
        expect(await cartPage.isPageDisplayed()).to.be.true;

        await cartPage.continueShopping();
        expect(await cartPage.getCurrentUrl()).to.equal(
            URL.INVENTORY,
            'User was not redirected to the inventory page.'
        );
    });
})
