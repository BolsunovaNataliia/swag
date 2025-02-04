const { expect } = require('chai');
const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');
const { USER } = require('./../../utils/constants');
const data = require('./../../utils/data');
const { sortPrices, sortNames } = require('./../../utils/sorting');

describe('06 - Sorting functionality', () => {
    before(async () => {
        await loginPage.login(USER.VALID_USERNAME, USER.VALID_PASSWORD);
    });

    data.sortingOptions.forEach(({ title, type, order }) => {
        it(`should sort products by ${title}`, async () => {
            await inventoryPage.selectSortingOption(title);
            if (type === 'price') {
                const prices = await inventoryPage.getProductPrices();
                expect(prices).to.deep.equal(
                    sortPrices(prices, order),
                    `Products are not sorted by ${title}.`
                );
            } else if (type === 'name') {
                const names = await inventoryPage.getProductNames();
                expect(names).to.deep.equal(
                    sortNames(names, order),
                    `Products are not sorted by ${title}.`
                );
            }
        });
    });
});
