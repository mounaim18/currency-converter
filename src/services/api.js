import axios from 'axios';

// Fetch Exchange Rate
export const fetchExchangeRate = async (fromCurrency, toCurrency, apiKey) => {
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_RATE_API_KEY}/latest/${fromCurrency}`);
        return response.data.conversion_rates[toCurrency];
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        return null;
    }
};

// Fetch Financial News
export const fetchFinancialNews = async (finnhubApiKey) => {
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/news?category=general&token=${import.meta.env.VITE_FINNHUB_API_KEY}`);
        return response.data.slice(0, 6);
    } catch (error) {
        console.error('Error fetching financial news:', error);
        return [];
    }
};

// Fetch Historical Rates
export const fetchHistoricalRates = async (fromCurrency, toCurrency) => {
    try {
        const response = await axios.get(`https://api.exchangerate.host/timeseries?start_date=2025-01-01&end_date=2025-04-01&base=${fromCurrency}&symbols=${toCurrency}`);
        return response.data.rates;
    } catch (error) {
        console.error('Error fetching historical rates:', error);
        return {};
    }
};
