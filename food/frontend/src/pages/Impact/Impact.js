import React from 'react';
import { motion } from 'framer-motion';

const Impact = () => {
    const stats = [
        { label: 'Global Food Waste', value: '2.5B', unit: 'Tons' },
        { label: 'US Food Waste', value: '60M', unit: 'Tons' },
        { label: 'Waste per Person', value: '325', unit: 'Pounds' },
        { label: 'Value of Waste', value: '$218B', unit: 'USD' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-container"
        >
            <h1 className="section-title text-center">Impact of Food Waste</h1>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
                    >
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                            {stat.value}
                        </div>
                        <div className="text-sm text-green-800 dark:text-green-300">
                            {stat.unit}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 mt-2">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid md:grid-cols-2 gap-8"
            >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
                        Environmental Impact
                    </h2>
                    <p className="section-text mb-4">
                        Food waste is a major contributor to environmental issues, including:
                    </p>
                    <ul className="space-y-2 section-text">
                        <li>• Greenhouse gas emissions from decomposing food</li>
                        <li>• Wasted water resources used in food production</li>
                        <li>• Unnecessary land use and deforestation</li>
                        <li>• Landfill space consumption</li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
                        Social Impact
                    </h2>
                    <p className="section-text mb-4">
                        While we waste food, many go hungry:
                    </p>
                    <ul className="space-y-2 section-text">
                        <li>• 800+ million people face hunger globally</li>
                        <li>• 11% of the world population is undernourished</li>
                        <li>• Wasted food could feed 3 billion people</li>
                        <li>• Economic burden on communities</li>
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Impact;