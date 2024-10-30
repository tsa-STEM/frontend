import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const WasteCalculator = () => {
    const [formData, setFormData] = useState({
        pizzasPurchased: '',
        pizzasConsumed: ''
    });
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/waste-calculation', {
                pizzasPurchased: Number(formData.pizzasPurchased),
                pizzasConsumed: Number(formData.pizzasConsumed)
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error calculating waste:', error);
        }
        setIsLoading(false);
    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Pizzas Purchased
                    </label>
                    <input
                        type="number"
                        value={formData.pizzasPurchased}
                        onChange={(e) => setFormData({ ...formData, pizzasPurchased: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Pizzas Consumed
                    </label>
                    <input
                        type="number"
                        value={formData.pizzasConsumed}
                        onChange={(e) => setFormData({ ...formData, pizzasConsumed: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 
                   rounded-lg shadow-md hover:shadow-lg transition-all"
                    disabled={isLoading}
                >
                    {isLoading ? 'Calculating...' : 'Calculate Waste'}
                </motion.button>
            </form>

            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg"
                >
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">Results</h3>
                    <p className="text-gray-700 dark:text-gray-300">Waste Amount: {result.wasteAmount} pizzas</p>
                    <p className="text-gray-700 dark:text-gray-300">Minimized Waste: {result.minimizedWaste} pizzas</p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">Suggestion: {result.suggestion}</p>
                </motion.div>
            )}
        </div>
    );
};

export default WasteCalculator;