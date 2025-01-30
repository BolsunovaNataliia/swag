const { $ } = require('@wdio/globals')
const Page = require('./page');

class InventoryPage extends Page {

    get productsContainer() { return $('.inventory_list'); }
    get productNames() { return $$('.inventory_item_name'); }
    get productPrices() { return $$('.inventory_item_price'); }
    get sortDropdown() { return $('.product_sort_container'); }
    get addToCartBtn() { return $('button.btn_inventory'); }
    get cartIcon() { return $('#shopping_cart_container'); }
    get cartBadge() { return $('.shopping_cart_badge'); }
    get burgerMenuBtn() { return $('.bm-burger-button'); }
    get logoutBtn() { return $('#logout_sidebar_link'); }
    get twitterIcon() { return $('.social_twitter'); }
    get facebookIcon() { return $('.social_facebook'); }
    get linkedinIcon() { return $('.social_linkedin'); }


    async isPageDisplayed() {
        const productsDisplayed = await this.productsContainer.isDisplayed();
        const cartDisplayed = await this.cartIcon.isDisplayed();
        return productsDisplayed && cartDisplayed;
    }

    async addToCart() {
        await this.addToCartBtn.click();
    }

    async isCartEmpty() {
        return await this.cartIcon.getText() === '';
    }

    async selectSortingOption(optionText) {
        await this.sortDropdown.selectByVisibleText(optionText);
        await this.sortDropdown.click(); // check
    }

    async getProductNames() {
        return await Promise.all(
            await this.productNames.map(async (product) => await product.getText())
        );
    }

    async getProductPrices() {
        return await Promise.all(await this.productPrices.map(async (price) => {
            const text = await price.getText();
            return parseFloat(text.replace('$', ''));
        }));
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async expandMenu() {
        await this.burgerMenuBtn.click();
    }

    async logout() {
        await this.logoutBtn.click();
    }

    async isMenuExpanded() {
        const menuItems = await $$('.menu-item');
        const menuItemsArray = Array.from(menuItems);

        return menuItemsArray.length === 4;
    }

    async clickSocialMediaIcon(iconElement) {
        const currentHandles = await browser.getWindowHandles();
        await iconElement.click();

        await browser.waitUntil(
            async () => {
                const currentWindowHandles = await browser.getWindowHandles();
                return currentWindowHandles.length > currentHandles.length;
            },
            { timeout: 5000, timeoutMsg: 'Expected a new tab to open' }
        );

        const newHandles = await browser.getWindowHandles();
        return newHandles.find(handle => currentHandles.indexOf(handle) === -1);
    }
}

module.exports = new InventoryPage();
