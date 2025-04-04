import React from 'react';

const CurrencySelector = ({ currencyList, selectedCurrency, onChange }) => {
    return (
        <select
            value={selectedCurrency}
            onChange={onChange}
            className="p-3 border rounded transition focus:ring focus:ring-blue-300"
        >
            {currencyList.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
            ))}
        </select>
    );
};

export default CurrencySelector;

