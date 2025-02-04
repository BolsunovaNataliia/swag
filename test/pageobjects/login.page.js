const Page = require('./page');

class LoginPage extends Page {
    get usernameField() { return $('#user-name'); }
    get passwordField() { return $('#password'); }
    get loginBtn() { return $('#login-button'); }
    get xIconUsernameField() { return $('div.form_group #user-name + .error_icon') }
    get xIconPasswordField() { return $('div.form_group #password + .error_icon') }
    get errorMessage() { return $('#login_button_container .error-message-container'); }

    async fillCredentials(username, password) {
        await this.usernameField.setValue(username);
        await this.passwordField.setValue(password);
    }

    async clickLoginBtn() {
        await this.loginBtn.click();
    }

    async login(username, password) {
        await this.open();
        await this.fillCredentials(username, password);
        await this.clickLoginBtn();
    }

    async getUsername() {
        return await this.usernameField.getValue();
    }

    async getPassword() {
        return await this.passwordField.getValue();
    }

    async isUsernameFieldEmpty() {
        const usernameValue = await this.usernameField.getValue();
        return usernameValue === '';    }


    async isPasswordFieldEmpty() {
        const passwordValue = await this.passwordField.getValue();
        return passwordValue === '';
    }

    async isErrorIconUsernameFieldDisplayed() {
        return await this.xIconUsernameField.isDisplayed();
    }

    async isErrorIconPasswordFieldDisplayed() {
        return await this.xIconPasswordField.isDisplayed();
    }

    async getPasswordFieldType() {
        return await this.passwordField.getAttribute('type');
    }

    async getErrorMessageText() {
        return await this.errorMessage.getText();
    }
}

module.exports = new LoginPage();
