const { $ } = require('@wdio/globals')
const Page = require('./page');

class LoginPage extends Page {
    get usernameField() { return $('#user-name'); }
    get passwordField() { return $('#password'); }
    get loginBtn() { return $('#login-button'); }
    get xIconUsernameField() { return $('div.form_group #user-name + .error_icon\n') }
    get xIconPasswordField() { return $('div.form_group #password + .error_icon\n') }

    async fillCredentials(username, password) {
        await this.usernameField.setValue(username);
        await this.passwordField.setValue(password);
    }

    async clickLoginBtn() {
        await this.loginBtn.click();
    }

    async login (username, password) {
        await this.fillCredentials(username, password);
        await this.clickLoginBtn();
    }


    open () {
        return super.open('');
    }

    async isErrorIconUsernameFieldDisplayed() {
        return await this.xIconUsernameField.isDisplayed();
    }

    async isErrorIconPasswordFieldDisplayed() {
        return await this.xIconPasswordField.isDisplayed();
    }
}

module.exports = new LoginPage();
