const { expect } = require('chai');
const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');
const cartPage = require('../pageobjects/cart.page');
const checkoutPage = require('../pageobjects/checkout.page');
const {
    URL,
    USER,
} = require('./../../utils/constants');
const data = require('./../../utils/data');

describe('Checkout functionality', () => {
    before(async () => {
        await loginPage.login(USER.VALID_USERNAME, USER.VALID_PASSWORD);
    });

    async function proceedToCheckoutAndFillForm() {
        await cartPage.clickCheckoutBtn();
        expect(await checkoutPage.isFirstNameFieldDisplayed()).to.be.true;

        await checkoutPage.fillCheckoutForm(
            data.userCheckoutInfo.firstName,
            data.userCheckoutInfo.lastName,
            data.userCheckoutInfo.postCode,
        );
        expect(await checkoutPage.getFirstNameValue()).to.equal(data.userCheckoutInfo.firstName);
        expect(await checkoutPage.getLastNameValue()).to.equal(data.userCheckoutInfo.lastName);
        expect(await checkoutPage.getPostalCodeValue()).to.equal(data.userCheckoutInfo.postCode);
    }

    it('8 - should successfully complete the checkout process after adding a product to the cart',
        async () => {
        const firstProductPrice = await inventoryPage.getProductPrice();

        await inventoryPage.addToCart();
        expect(await inventoryPage.getCartBadgeNumber()).to.equal(
            '1',
            'Cart badge count did not update.'
        );

        await inventoryPage.openCart();
        expect(await cartPage.isPageDisplayed()).to.be.true;
        expect(await cartPage.getCartItemName()).to.include(
            data.products.firstProductName,
            'Product not found in the cart.'
        );

        await proceedToCheckoutAndFillForm();

        await checkoutPage.clickContinue();
        expect(await checkoutPage.getCurrentUrl()).to.include(URL.CHECKOUT_STEP_TWO);
        expect(await cartPage.isProductDisplayed()).to.be.true;
        expect(await checkoutPage.getItemPrice()).to.equal(
            firstProductPrice,
            'Item price in checkout does not match the product price.'
        );

        await checkoutPage.clickFinish();
        expect(await checkoutPage.getCurrentUrl()).to.include(URL.CHECKOUT);
        expect(await checkoutPage.getCheckoutSuccessMessage()).to.include(
            'Thank you for your order!'
        );

        await checkoutPage.clickBackHome();
        expect(await checkoutPage.getCurrentUrl()).to.include(URL.INVENTORY);
        expect(await inventoryPage.isCartEmpty()).to.be.true;
    });

    it('9 - should display an error when proceeding to checkout with an empty cart',
        async () => {
        await inventoryPage.openCart();
        expect(await cartPage.isPageDisplayed()).to.be.true;

            await proceedToCheckoutAndFillForm();

        await checkoutPage.clickContinue();
        expect(await checkoutPage.getErrorMessageText()).to.include(
            'Cart is empty',
            'No error message was displayed for an empty cart.'
        );
    });
});
