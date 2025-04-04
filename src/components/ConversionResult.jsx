import React from 'react';
import { motion } from 'framer-motion';

const ConversionResult = ({ convertedAmount }) => {
    return (
        convertedAmount && (
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 font-bold text-lg"
            >
                {convertedAmount}
            </motion.p>
        )
    );
};

export default ConversionResult;
