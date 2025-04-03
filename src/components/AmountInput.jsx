import React from 'react';

const AmountInput = ({ value, onChange }) => {
    return (
        <div className="space-y-2 mb-4">
            <label className="block text-lg font-bold">Enter Amount</label>
            <input 
                type="number" 
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter amount" 
                className="w-full p-3 rounded-xl bg-gray-800 text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
        </div>
    );
};

export default AmountInput;
