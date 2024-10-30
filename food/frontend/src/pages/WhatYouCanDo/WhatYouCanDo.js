// src/pages/WhatYouCanDo/WhatYouCanDo.js
import React from 'react';
import { motion } from 'framer-motion';

const WhatYouCanDo = () => {
    const organizations = [
        {
            name: "Food Waste Reduction Alliance",
            description: "Working with food service companies to reduce waste",
            website: "https://foodwastealliance.org"
        },
        {
            name: "Feeding America",
            description: "Rescuing food to feed those in need",
            website: "https://feedingamerica.org"
        },
        {
            name: "Zero Waste Network",
            description: "Promoting zero waste practices and policies",
            website: "https://zerowastenetwork.org"
        }
    ];

    const actions = [
        {
            title: "Plan Your Meals",
            description: "Create weekly meal plans and shopping lists to avoid over-purchasing.",
            icon: "📝"
        },
        {
            title: "Store Food Properly",
            description: "Learn proper storage techniques for different types of food.",
            icon: "🏪"
        },
        {
            title: "Use Leftovers",
            description: "Get creative with leftover ingredients to create new meals.",
            icon: "🍱"
        },
        {
            title: "Donate Excess",
            description: "Connect with local food banks and donation centers.",
            icon: "🤝"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-container"
        >
            <h1 className="section-title text-center">What You Can Do</h1>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="grid md:grid-cols-2 gap-8 mb-12"
            >
                {actions.map((action, index) => (
                    <motion.div
                        key={action.title}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-start space-x-4"
                    >
                        <div className="text-4xl">{action.icon}</div>
                        <div>
                            <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">
                                {action.title}
                            </h2>
                            <p className="section-text">{action.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow-lg mb-12"
            >
                <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-6">
                    Organizations Making a Difference
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {organizations.map((org, index) => (
                        <motion.div
                            key={org.name}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                        >
                            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                                {org.name}
                            </h3>
                            <p className="section-text mb-4">{org.description}</p>
                            <a
                                href={org.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                            >
                                Visit Website →
                            </a>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
                    Start Making a Difference Today
                </h2>
                <p className="section-text mb-4">
                    Every small action counts in the fight against food waste. By implementing these
                    practices and supporting these organizations, you can help create a more sustainable
                    future for everyone.
                </p>
                <div className="flex justify-center mt-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Get Started Now
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default WhatYouCanDo;