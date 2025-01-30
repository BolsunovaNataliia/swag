const { expect } = require('chai');
const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');

describe('Checkout functionality', () => {
    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';
    const firstName = 'John';
    const lastName = 'Fisher';
    const postCode = '32025';

    before(async () => {
        await LoginPage.open();
        await LoginPage.login(validUsername, validPassword);
    });

    it('8 - should successfully complete the checkout process after adding a card to the cart',
        async () => {
        await InventoryPage.addToCart();
        const cartBadgeText = await InventoryPage.cartBadge.getText();
        expect(cartBadgeText).to.equal('1', 'Cart badge count did not update.');

        await InventoryPage.openCart();
        const isCartPageDisplayed = await CartPage.isPageDisplayed();
        expect(isCartPageDisplayed).to.be.true;

        await CartPage.clickCheckoutBtn();
        expect(await CheckoutPage.firstNameField.isDisplayed()).to.be.true;

        await CheckoutPage.fillCheckoutForm(firstName, lastName, postCode);
        expect(await CheckoutPage.firstNameField.getValue()).to.equal(firstName);
        expect(await CheckoutPage.lastNameField.getValue()).to.equal(lastName);
        expect(await CheckoutPage.postalCodeField.getValue()).to.equal(postCode);

        await CheckoutPage.clickContinue();
        expect(await browser.getUrl()).to.include('/checkout-step-two.html');
        expect(await CartPage.isProductDisplayed()).to.be.true;

        await CheckoutPage.clickFinish();
        expect(await browser.getUrl()).to.include('/checkout-complete.html');
        expect(await CheckoutPage.isCheckoutComplete()).to.include('Thank you for your order!');

        await CheckoutPage.clickBackHome();
        expect(await browser.getUrl()).to.include('/inventory.html');
        expect(await InventoryPage.isCartEmpty()).to.be.true;
    });

    // TODO:This test should be adjusted after the bug is fixed
    it('9 - should successfully complete the checkout process with empty cart',
        async () => {
        await InventoryPage.openCart();
        const isCartPageDisplayed = await CartPage.isPageDisplayed();
        expect(isCartPageDisplayed).to.be.true;

        await CartPage.clickCheckoutBtn();
        expect(await CheckoutPage.firstNameField.isDisplayed()).to.be.true;

        await CheckoutPage.fillCheckoutForm(firstName, lastName, postCode);
        expect(await CheckoutPage.firstNameField.getValue()).to.equal(firstName);
        expect(await CheckoutPage.lastNameField.getValue()).to.equal(lastName);
        expect(await CheckoutPage.postalCodeField.getValue()).to.equal(postCode);

        await CheckoutPage.clickContinue();
        expect(await browser.getUrl()).to.include('/checkout-step-two.html');
        expect(await CartPage.isProductDisplayed()).to.be.false;

        const totalPrice = await CheckoutPage.getTotalPrice();
        expect(totalPrice).to.equal(0);

        await CheckoutPage.clickFinish();
        expect(await browser.getUrl()).to.include('/checkout-complete.html');

        await CheckoutPage.clickBackHome();
        expect(await browser.getUrl()).to.include('/inventory.html');
        expect(await InventoryPage.isCartEmpty()).to.be.true;
    });
});
