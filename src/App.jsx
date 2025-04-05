import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import ConversionResult from './components/ConversionResult';
import FinancialNews from './components/FinancialNews';

const App = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('CAD');
    const [toCurrency, setToCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [historicalRates, setHistoricalRates] = useState([]);
    const [financialNews, setFinancialNews] = useState([]);
    const [loading, setLoading] = useState(false);

    const currencyList = ['USD', 'CAD', 'EUR', 'GBP', 'AUD', 'JPY', 'CNY', 'INR', 'NZD', 'CHF', 'HKD', 'SGD'];


    useEffect(() => {
        fetchExchangeRate();
        fetchFinancialNews();
        fetchHistoricalRates();
    }, [fromCurrency, toCurrency]);

    const fetchExchangeRate = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_RATE_API_KEY}/latest/${fromCurrency}`);

            const rate = response.data.conversion_rates[toCurrency]; 
            setExchangeRate(rate);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            setLoading(false);
        }
    };
    
    

    const fetchFinancialNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://finnhub.io/api/v1/news?category=general&token=cvo1fvpr01qppf5a9s4gcvo1fvpr01qppf5a9s50');
            const newsData = response.data.slice(0, 6); 
            const formattedNews = newsData.map(item => ({
                title: item.headline,
                description: item.summary
            }));
            setFinancialNews(formattedNews);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching financial news:', error);
            setLoading(false);
        }
    };
    const fetchHistoricalRates = async () => {
    setLoading(true);
    try {
        const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

        const response = await axios.get(`https://api.exchangerate.host/timeseries`, {
            params: {
                start_date: '2023-01-01',
                end_date: '2023-04-01',
                base: fromCurrency,
                symbols: toCurrency,
                access_key: process.env.VITE_EXCHANGE_RATE_API_KEY // This should work if you properly load your .env file
            }
        });

        console.log("Full Response:", response.data);

        if (response.data && response.data.success !== false && response.data.rates) {
            const rates = response.data.rates;

            const formattedRates = Object.keys(rates).map(date => ({
                date,
                rate: rates[date][toCurrency] || "No Data"
            }));

            setHistoricalRates(formattedRates);
        } else {
            console.error("No rates data returned from API", response.data);
            if (response.data.error) console.error("API Error Message:", response.data.error);
        }

        setLoading(false);
    } catch (error) {
        console.error('Error fetching historical rates:', error.response ? error.response.data : error.message);
        setLoading(false);
    }
};

    
    
    
    
    
    
    

    const handleConvert = () => {
        if (exchangeRate && amount) {
            const result = (parseFloat(amount) * exchangeRate).toFixed(2);
            setConvertedAmount(`${amount} ${fromCurrency} = ${result} ${toCurrency}`);
    
            const date = new Date().toISOString().split('T')[0];
            setHistoricalRates(prevRates => [...prevRates, { date, rate: result }]);
        }
    };
    

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-700 p-10 flex flex-col items-center justify-center space-y-6"
        >
            <h1 className="text-4xl font-bold text-white mb-8">Currency Converter App</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl">
                {/* Currency Converter Card */}
                    <div className="p-8 rounded-2xl bg-white shadow-xl w-full">
                        <h2 className="text-xl font-bold mb-4 text-black">Amount</h2>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="p-3 w-full mb-4 border border-gray-300 rounded text-black bg-white"
                        />

                        <h2 className="text-xl font-bold mb-4 text-black">From</h2>
                        <select 
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="p-3 w-full mb-4 border border-gray-300 rounded text-black bg-white"
                        >
                            {currencyList.map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>

                        <h2 className="text-xl font-bold mb-4 text-black">To</h2>
                        <select 
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="p-3 w-full mb-4 border border-gray-300 rounded text-black bg-white"
                        >
                            {currencyList.map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>

                        <button 
                            onClick={handleConvert} 
                            className="p-3 bg-blue-600 text-white rounded w-full mt-4"
                        >
                            Convert
                        </button>

                        {convertedAmount && (
                            <p className="mt-4 font-bold text-lg text-black text-center">{convertedAmount}</p>
                        )}
                    </div>


                {/* Historical Rates Card */}
                <div className="p-8 rounded-2xl bg-white shadow-xl w-full">
                    <h2 className="text-xl font-bold mb-4 text-black">Historical Rates</h2>
                    <div className="space-y-2">
                    <div className="p-2 bg-gray-200 rounded text-black">2025-05 - 500</div>
                    <div className="p-2 bg-gray-200 rounded text-black">2025-01 - 184</div>
                    <div className="p-2 bg-gray-200 rounded text-black">2023-11 - 843</div>
                    <div className="p-2 bg-gray-200 rounded text-black">2023-01 - 843</div>
                    </div>
                </div>
            </div>

            {/* Financial News Section */}
<div className="p-8 rounded-2xl bg-white shadow-xl w-full max-w-5xl mt-6">
    <h2 className="text-xl font-bold mb-4 text-black">Financial News</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {financialNews.map((news, index) => (
            <div key={index} className="p-4 bg-gray-200 rounded">
                <h3 className="font-bold text-black">{news.title}</h3>
                <p className="text-black mt-2">{news.description}</p>
            </div>
        ))}
    </div>
</div>

        </motion.div>
    );
};

export default App;
