import React, { useState, useEffect } from 'react';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import ConversionResult from './components/ConversionResult';
import axios from 'axios';

const App = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('AUD');
    const [toCurrency, setToCurrency] = useState('USD');
    const [conversionResult, setConversionResult] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [historicalRates, setHistoricalRates] = useState([]);

    const fetchExchangeRate = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/54f7f841d4929b5e26ca3f25/latest/${fromCurrency}`);
            const rate = response.data.conversion_rates[toCurrency];
            setExchangeRate(rate);
            if (amount && rate) {
                setConversionResult(`${amount} ${fromCurrency} = ${(amount * rate).toFixed(2)} ${toCurrency}`);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            setConversionResult('Failed to fetch exchange rate. Please try again.');
            setLoading(false);
        }
    };

    const fetchHistoricalRates = async () => {
        try {
            const dates = ['2025-04-01', '2025-01-01', '2024-11-01', '2024-01-01'];
            const promises = dates.map(async (date) => {
                const response = await axios.get(`https://v6.exchangerate-api.com/v6/54f7f841d4929b5e26ca3f25/latest/${fromCurrency}`);
                const rate = response.data.conversion_rates[toCurrency];
                return { date, rate: rate ? rate : 'N/A' };
            });
            const results = await Promise.all(promises);
            setHistoricalRates(results);
        } catch (error) {
            console.error('Error fetching historical rates:', error);
            setHistoricalRates([{ date: 'Error', rate: 'Failed to fetch historical data' }]);
        }
    };

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            fetchExchangeRate();
            fetchHistoricalRates();
        }
    }, [fromCurrency, toCurrency]);

    return (
      <div className="min-h-screen w-full bg-gradient-to-r from-blue-500 to-purple-700 p-6 flex justify-center items-center">
          <div className="flex flex-col lg:flex-row gap-10 w-full max-w-screen-2xl h-full p-6 justify-around items-start">
              
              {/* Conversion Form */}
              <div className="p-6 rounded-2xl shadow-xl bg-gray-900 text-white w-full lg:w-1/3 space-y-6">
                  <h2 className="text-3xl font-bold mb-4 text-center">Amount</h2>
                  <AmountInput value={amount} onChange={setAmount} />
                  <CurrencySelector label="From" currency={fromCurrency} setCurrency={setFromCurrency} />
                  <CurrencySelector label="To" currency={toCurrency} setCurrency={setToCurrency} />
                  
                  <button 
                      onClick={fetchExchangeRate} 
                      className="px-4 py-2 mt-4 w-full bg-blue-600 text-white rounded hover:bg-blue-700 transition shadow-md"
                  >
                      {loading ? 'Loading...' : 'Convert'}
                  </button>
  
                  <div className="bg-gray-800 p-4 rounded-xl shadow mt-4">
                      <h3 className="text-xl font-bold">Conversion Result</h3>
                      <p className="text-lg mt-2">{conversionResult}</p>
                  </div>
              </div>
              
              {/* Historical Rates Section */}
              <div className="p-6 rounded-2xl shadow-xl bg-gray-900 text-white w-full lg:w-1/2 space-y-6">
                  <h2 className="text-3xl font-bold mb-4 text-center">Historical Rates</h2>
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                      {historicalRates.map((rate, index) => (
                          <div key={index} className="p-3 bg-gray-800 rounded-xl shadow-md flex justify-between items-center">
                              <span className="font-bold text-lg">{rate.date}</span>
                              <span className="text-blue-400">{rate.rate === 'N/A' ? 'No Data' : `1 ${fromCurrency} = ${rate.rate} ${toCurrency}`}</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
  );
  
};

export default App;
