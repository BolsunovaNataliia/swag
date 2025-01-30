const { $ } = require('@wdio/globals')
const Page = require('./page');

class CheckoutPage extends Page {
    get firstNameField() { return $('#first-name'); }
    get lastNameField() { return $('#last-name'); }
    get postalCodeField() { return $('#postal-code'); }
    get continueBtn() { return $('#continue'); }
    get finishBtn() { return $('#finish'); }
    get backHomeBtn() { return $('#back-to-products'); }
    get checkoutCompleteHeader() { return $('.complete-header'); }
    get totalPriceLabel() { return $('.summary_total_label'); }

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

    async isCheckoutComplete() {
        return await this.checkoutCompleteHeader.getText();
    }

    async getTotalPrice() {
        const priceText = await this.totalPriceLabel.getText();
        return parseFloat(priceText.replace('Total: $', ''));
    }
}

module.exports = new CheckoutPage();
