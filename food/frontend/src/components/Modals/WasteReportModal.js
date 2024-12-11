// src/components/Modals/WasteReportModal.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download } from 'lucide-react';

const WasteReportModal = ({ isOpen, onClose }) => {
    const sampleData = {
        totalWaste: "245 lbs",
        wasteReduction: "32%",
        costSavings: "$1,280",
        recommendedActions: [
            "Optimize portion sizes",
            "Improve inventory tracking",
            "Staff training on waste reduction"
        ]
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-2xl relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <X size={24} />
                        </button>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <FileText className="w-8 h-8 text-green-500" />
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Waste Report</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Object.entries(sampleData).slice(0, 3).map(([key, value]) => (
                                    <div key={key} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                        <h3 className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </h3>
                                        <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Recommended Actions</h3>
                                <ul className="space-y-2">
                                    {sampleData.recommendedActions.map((action, index) => (
                                        <li key={index} className="flex items-center text-gray-800 dark:text-white">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                            {action}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => {/* Add download functionality */ }}
                                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    <Download size={20} />
                                    <span>Download Report</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WasteReportModal;