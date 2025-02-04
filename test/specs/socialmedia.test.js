const { expect } = require('chai');
const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');
const data = require('./../../utils/data');
const { USER } = require('./../../utils/constants');

describe('Social Media Links', () => {
    before(async () => {
        await loginPage.login(USER.VALID_USERNAME, USER.VALID_PASSWORD);
    });

    data.socialMediaLinks.forEach(({ name, expectedUrl }) => {
        it(`7 - should open the ${name} page in a new tab`, async () => {
            const iconElement = inventoryPage.getSocialMediaIcon(name);

            expect(iconElement, `Icon for ${name} not found`).to.exist;

            const newTab = await inventoryPage.clickSocialMediaIcon(iconElement);
            await loginPage.switchToWindow(newTab);

            const url = await loginPage.getCurrentUrl();
            expect(url).to.include(expectedUrl, `Expected URL to contain ${expectedUrl}, got ${url}`);

            await loginPage.closeCurrentWindow();
            await loginPage.switchToOriginalWindow();
        });
    });
});
