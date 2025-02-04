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
    get menuItems() { return $$('.menu-item'); }
    get logoutBtn() { return $('#logout_sidebar_link'); }
    get twitterIcon() { return $('.social_twitter'); }
    get facebookIcon() { return $('.social_facebook'); }
    get linkedinIcon() { return $('.social_linkedin'); }

    async isPageDisplayed() {
        return await this.productsContainer.isDisplayed() && this.cartIcon.isDisplayed();
    }

    async isCartIconDisplayed() {
        return await this.cartIcon.isDisplayed();
    }

    async addToCart() {
        await this.addToCartBtn.click();
    }

    async getCartBadgeNumber() {
        return await this.cartBadge.getText();
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async isCartEmpty() {
        return await this.cartIcon.getText() === '';
    }

    async selectSortingOption(optionText) {
        await this.sortDropdown.selectByVisibleText(optionText);
        await this.sortDropdown.click();
    }

    async getProductPrice() {
        const firstProductPriceElement = await this.productPrices[0];
        const priceText = await firstProductPriceElement.getText();
        return parseFloat(priceText.replace('$', ''));
    }

    async getProductNames() {
        return await Promise.all(
            await this.productNames
                .map(async (product) => await product.getText())
        );
    }

    async getProductPrices() {
        return await Promise.all(await this.productPrices.map(async (price) => {
            return parseFloat((await price.getText()).replace('$', ''));
        }));
    }

    async expandMenu() {
        await this.burgerMenuBtn.click();
    }

    async logout() {
        await this.logoutBtn.click();
    }

    async isMenuExpanded() {
        const menuItems = await this.menuItems;
        const menuItemsArray = Array.from(menuItems);

        return menuItemsArray.length === 4;
    }

    getSocialMediaIcon(name) {
        const icons = {
            Twitter: this.twitterIcon,
            Facebook: this.facebookIcon,
            LinkedIn: this.linkedinIcon,
        };
        return icons[name] || null;
    }

    async clickSocialMediaIcon(iconElement) {
        const currentHandles = await this.getWindowHandles();
        await iconElement.click();

        await this.waitForNewWindow(currentHandles);

        const newHandles = await this.getWindowHandles();
        return newHandles.find(handle => currentHandles.indexOf(handle) === -1);
    }
}

module.exports = new InventoryPage();
