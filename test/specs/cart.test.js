const { expect } = require('chai')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');

describe('Cart functionality', () => {
    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';

    before(async () => {
        await LoginPage.open();
        await LoginPage.login(validUsername, validPassword);
    });

    it('5 - the card added to the cart should be available after logout and then login',
        async () => {
        await InventoryPage.addToCart();
        const cartBadgeText = await InventoryPage.cartBadge.getText();
        expect(cartBadgeText).to.equal(
            '1',
            'Cart badge count did not update.'
        );

        await InventoryPage.expandMenu();
        expect(await InventoryPage.isMenuExpanded()).to.be.true;

        await InventoryPage.logout();
        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.equal(
            'https://www.saucedemo.com/',
            'User was not redirected to the login page.'
        );

        await LoginPage.login(validUsername, validPassword);

        await InventoryPage.openCart();
        const isCartPageDisplayed = await CartPage.isPageDisplayed();
        expect(isCartPageDisplayed).to.be.true;

        const cartItems = await CartPage.cartItems.getText();
        expect(cartItems).to.include(
            'Sauce Labs Backpack',
            'Product not found in the cart.'
        );

        await CartPage.removeCard();
        await CartPage.continueShoppingBtn.click();
    });

    it('should add a product to the cart and verify it in the cart page',
        async () => {
        await InventoryPage.addToCart();
        const cartBadgeText = await InventoryPage.cartBadge.getText();
        expect(cartBadgeText).to.equal(
            '1',
            'Cart badge count did not update.'
        );

        await InventoryPage.openCart();
        const isCartPageDisplayed = await CartPage.isPageDisplayed();
        expect(isCartPageDisplayed).to.be.true;

        const cartItems = await CartPage.cartItems.getText();
        expect(cartItems).to.include(
            'Sauce Labs Backpack',
            'Product not found in the cart.'
        );
        await CartPage.removeCard();
    });

    it('should return to inventory from the cart page',
        async () => {
        await CartPage.continueShoppingBtn.click();
        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.equal(
            'https://www.saucedemo.com/inventory.html',
            'User was not redirected to the inventory page.'
        );
    });
})
