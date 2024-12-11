// src/components/Panels/SettingsPanel.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Sun, Moon, Bell, Shield, Database } from 'lucide-react';

const SettingsPanel = ({ isOpen, onClose, isDarkMode, toggleDarkMode }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-2xl z-50"
                >
                    <div className="p-4 border-b dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Settings className="w-5 h-5 text-green-500" />
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Settings</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="p-4 space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Appearance</h3>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                    <span className="text-gray-800 dark:text-white">Dark Mode</span>
                                </div>
                                <button
                                    onClick={toggleDarkMode}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-green-500' : 'bg-gray-200'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notifications</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <Bell className="w-5 h-5" />
                                        <span className="text-gray-800 dark:text-white">Push Notifications</span>
                                    </div>
                                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Security</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <Shield className="w-5 h-5" />
                                        <span className="text-gray-800 dark:text-white">Two-Factor Auth</span>
                                    </div>
                                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                                    </button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <Database className="w-5 h-5" />
                                        <span className="text-gray-800 dark:text-white">Data Backup</span>
                                    </div>
                                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SettingsPanel;