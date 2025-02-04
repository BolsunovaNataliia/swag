module.exports = {
    sortPrices: (prices, order) => {
        return [...prices].sort((a, b) => (order === 'asc' ? a - b : b - a));
    },

    sortNames: (names, order) => {
        return [...names].sort((a, b) => (order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)));
    }
};
