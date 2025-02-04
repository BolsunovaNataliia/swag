const Page = require('./page');

class CartPage extends Page {
    get cartItems() { return $('.cart_list'); }
    get continueShoppingBtn() { return $('#continue-shopping'); }
    get removeCardBtn() { return $(' #remove-sauce-labs-backpack '); }
    get checkoutBtn() { return $('#checkout'); }
    get cartItem() { return $('.cart_item'); }

    async isPageDisplayed() {
        return await this.cartItems.isDisplayed();
    }

    async getCartItemName() {
        return await this.cartItem.getText();
    }

    async removeCard() {
        await this.removeCardBtn.click();
    }

    async clickCheckoutBtn() {
        await this.checkoutBtn.click();
    }

    async isProductDisplayed() {
        return await this.cartItem.isDisplayed();
    }

    async continueShopping() {
        await this.continueShoppingBtn.click();
    }
}

module.exports = new CartPage();
