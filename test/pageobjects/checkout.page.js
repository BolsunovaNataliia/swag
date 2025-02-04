const Page = require('./page');

class CheckoutPage extends Page {
    get firstNameField() { return $('#first-name'); }
    get lastNameField() { return $('#last-name'); }
    get postalCodeField() { return $('#postal-code'); }
    get continueBtn() { return $('#continue'); }
    get finishBtn() { return $('#finish'); }
    get backHomeBtn() { return $('#back-to-products'); }
    get checkoutSuccessMessage() { return $('.complete-header'); }
    get itemPriceLabel() { return $('.summary_subtotal_label'); }
    get errorMessage() { return $('[class*="error-message"]'); }

    async fillCheckoutForm(firstName, lastName, postalCode) {
        await this.firstNameField.setValue(firstName);
        await this.lastNameField.setValue(lastName);
        await this.postalCodeField.setValue(postalCode);
    }

    async clickContinue() {
        await this.continueBtn.click();
    }

    async clickFinish() {
        await this.finishBtn.click();
    }

    async clickBackHome() {
        await this.backHomeBtn.click();
    }

    async getCheckoutSuccessMessage() {
        return await this.checkoutSuccessMessage.getText();
    }

    async getItemPrice() {
        const priceText = await this.itemPriceLabel.getText();
        return parseFloat(priceText.replace('Item total: $', ''));
    }

    async getErrorMessageText() {
        return await this.errorMessage.getText();
    }

    async isFirstNameFieldDisplayed() {
        return await this.firstNameField.isDisplayed();
    }

    async getFirstNameValue() {
        return await this.firstNameField.getValue();
    }

    async getLastNameValue() {
        return await this.lastNameField.getValue();
    }

    async getPostalCodeValue() {
        return await this.postalCodeField.getValue();
    }
}

module.exports = new CheckoutPage();
