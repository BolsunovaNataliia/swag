const { expect } = require('chai')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/inventory.page');

describe('06 - Sorting functionality', () => {
    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';
    const sortingOptions = [
        { text: 'Price (low to high)', type: 'price', order: 'asc' },
        { text: 'Price (high to low)', type: 'price', order: 'desc' },
        { text: 'Name (A to Z)', type: 'name', order: 'asc' },
        { text: 'Name (Z to A)', type: 'name', order: 'desc' }
    ];

    before(async () => {
        await LoginPage.open();
        await LoginPage.login(validUsername, validPassword);
    });

    sortingOptions.forEach(({ text, type, order }) => {
        it(`should sort products by ${text}`, async () => {
            // Select sorting option
            await InventoryPage.selectSortingOption(text);

            // Validate sorting
            if (type === 'price') {
                const prices = await InventoryPage.getProductPrices();
                const sortedPrices = [...prices].sort((a, b) =>
                    order === 'asc' ? a - b : b - a
                );
                expect(prices).to.deep.equal(
                    sortedPrices,
                    `Products are not sorted by ${text}.`
                );
            } else if (type === 'name') {
                const names = await InventoryPage.getProductNames();
                const sortedNames = [...names].sort((a, b) =>
                    order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
                );
                expect(names).to.deep.equal(
                    sortedNames,
                    `Products are not sorted by ${text}.`
                );
            }
        })
    })
})

