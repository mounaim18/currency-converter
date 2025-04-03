import React from 'react';

const CurrencySelector = ({ label, currency, setCurrency }) => {
    return (
        <div className="space-y-2 mb-4">
            <label className="block text-lg font-bold">{label}</label>
            <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800 text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            >
                <option value="USD">USD</option>
                <option value="CAD">CAD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="AUD">AUD</option>
                <option value="JPY">JPY</option>
                <option value="CNY">CNY</option>
            </select>
        </div>
    );
};

export default CurrencySelector;
