const { USER } = require('./constants');

module.exports = {
    userCheckoutInfo: {
        firstName: 'John',
        lastName: 'Fisher',
        postCode: '32025',
    },
    products: {
        firstProductName: 'Sauce Labs Backpack',
    },
    userData: [
        { username: USER.VALID_USERNAME, password: USER.INVALID_PASSWORD },
        { username: USER.INVALID_USERNAME, password: USER.VALID_PASSWORD },
    ],
    socialMediaLinks: [
        { name: 'Twitter', expectedUrl: 'x.com' },
        { name: 'Facebook', expectedUrl: 'facebook.com' },
        { name: 'LinkedIn', expectedUrl: 'linkedin.com' },
    ],
    sortingOptions: [
        { title: 'Price (low to high)', type: 'price', order: 'asc' },
        { title: 'Price (high to low)', type: 'price', order: 'desc' },
        { title: 'Name (A to Z)', type: 'name', order: 'asc' },
        { title: 'Name (Z to A)', type: 'name', order: 'desc' }
    ],
};
