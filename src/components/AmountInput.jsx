import React from 'react';

const AmountInput = ({ amount, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Enter amount"
            value={amount}
            onChange={onChange}
            className="p-3 border rounded transition focus:ring focus:ring-blue-300"
        />
    );
};

export default AmountInput;
