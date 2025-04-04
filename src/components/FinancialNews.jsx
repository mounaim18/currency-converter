import React from 'react';
import { motion } from 'framer-motion';

const FinancialNews = ({ financialNews }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {financialNews.map((news, index) => (
                <motion.div 
                    key={index} 
                    className="p-4 bg-gray-200 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-300" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                >
                    <h3 className="font-bold text-lg">{news.title}</h3>
                    <p className="text-sm mt-2">{news.description}</p>
                </motion.div>
            ))}
        </div>
    );
};

export default FinancialNews;
