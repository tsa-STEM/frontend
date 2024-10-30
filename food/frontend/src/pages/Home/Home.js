import React from 'react';
import { motion } from 'framer-motion';
import WasteCalculator from '../../components/WasteCalculator/WasteCalculator';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 pt-24 pb-12"
        >
            <div className="text-center mb-12">
                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-4xl font-bold text-green-800 dark:text-green-400 mb-4"
                >
                    Reduce Food Waste, Save Our Planet
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-600 dark:text-gray-300"
                >
                    One third of global food supplies are lost. Let's change that together.
                </motion.p>
            </div>

            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-12"
            >
                <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">
                    Calculate Your Food Waste Impact
                </h2>
                <WasteCalculator />
            </motion.div>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid md:grid-cols-3 gap-6"
            >
                <FeatureCard
                    title="Track & Analyze"
                    description="Monitor your food waste patterns and get AI-powered insights."
                    delay={0.8}
                />
                <FeatureCard
                    title="Get Solutions"
                    description="Receive personalized recommendations to reduce waste."
                    delay={1}
                />
                <FeatureCard
                    title="Make Impact"
                    description="Join the movement to save food and help the environment."
                    delay={1.2}
                />
            </motion.div>
        </motion.div>
    );
};

const FeatureCard = ({ title, description, delay }) => (
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay }}
        className="bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
);

export default Home;

