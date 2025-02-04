const { URL } = require('./../../utils/constants');

module.exports = class Page {
    open() {
        return browser.url(URL.LOGIN);
    }

    getCurrentUrl() {
        return browser.getUrl();
    }

    async waitForNewWindow(currentHandles, timeout = 5000) {
        await browser.waitUntil(
            async () => {
                const currentWindowHandles = await this.getWindowHandles();
                return currentWindowHandles.length > currentHandles.length;
            },
            { timeout, timeoutMsg: 'Expected a new tab to open' }
        );
    }

    async getWindowHandles() {
        return await browser.getWindowHandles();
    }

    async switchToWindow(newTab) {
        await browser.switchToWindow(newTab);
    }

    async closeCurrentWindow() {
        await browser.closeWindow();
    }

    async switchToOriginalWindow() {
        const windowHandles = await browser.getWindowHandles();
        await browser.switchToWindow(windowHandles[0]);
    }
}
