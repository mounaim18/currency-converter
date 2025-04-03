import React from 'react';

const ConversionResult = ({ result }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow mt-4">
            <h3 className="text-xl font-bold">Conversion Result</h3>
            <p className="text-lg mt-2">{result}</p>
        </div>
    );
};

export default ConversionResult;
