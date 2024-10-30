import React from 'react';
import { motion } from 'framer-motion';

const Causes = () => {
    const causes = [
        {
            title: "Restaurant Practices",
            description: "Unpredictable customer demand and large portion sizes lead to excess preparation.",
            solutions: [
                "Implement portion control",
                "Better demand forecasting",
                "Proper inventory management"
            ]
        },
        {
            title: "Supermarket Operations",
            description: "Overstocking and aesthetic standards for produce create unnecessary waste.",
            solutions: [
                "Dynamic pricing for near-expiry items",
                "Improved stock management",
                "Relaxed cosmetic standards"
            ]
        },
        {
            title: "Consumer Behavior",
            description: "Over-purchasing and poor storage practices contribute to household waste.",
            solutions: [
                "Better meal planning",
                "Proper food storage",
                "Understanding expiry dates"
            ]
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-container"
        >
            <h1 className="section-title text-center">Why Food Waste Occurs</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {causes.map((cause, index) => (
                    <motion.div
                        key={cause.title}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
                                {cause.title}
                            </h2>
                            <p className="section-text mb-4">
                                {cause.description}
                            </p>
                            <h3 className="font-semibold text-green-600 dark:text-green-500 mb-2">
                                Solutions:
                            </h3>
                            <ul className="space-y-2 section-text">
                                {cause.solutions.map((solution) => (
                                    <li key={solution}>• {solution}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
                    The Cost of Inaction
                </h2>
                <p className="section-text">
                    Understanding these causes is crucial for developing effective solutions.
                    Each year we delay addressing these issues costs us $218 billion in wasted
                    food and contributes to environmental degradation and global hunger.
                </p>
            </motion.div>
        </motion.div>
    );
};

export default Causes;