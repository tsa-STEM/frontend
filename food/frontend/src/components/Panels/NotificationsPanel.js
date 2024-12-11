// src/components/Panels/NotificationsPanel.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Info, AlertTriangle, CheckCircle } from 'lucide-react';

const NotificationsPanel = ({ isOpen, onClose }) => {
    const notifications = [
        {
            id: 1,
            type: 'info',
            message: 'New waste reduction tips available',
            time: '5 minutes ago',
            icon: Info
        },
        {
            id: 2,
            type: 'warning',
            message: 'Approaching monthly waste threshold',
            time: '2 hours ago',
            icon: AlertTriangle
        },
        {
            id: 3,
            type: 'success',
            message: 'Waste reduction goal achieved',
            time: '1 day ago',
            icon: CheckCircle
        }
    ];

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
                                <Bell className="w-5 h-5 text-green-500" />
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Notifications</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-y-auto h-[calc(100vh-64px)]">
                        {notifications.map((notification) => (
                            <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <div className="flex space-x-3">
                                    <notification.icon className={`w-5 h-5 ${notification.type === 'info' ? 'text-blue-500' :
                                            notification.type === 'warning' ? 'text-yellow-500' : 'text-green-500'
                                        }`} />
                                    <div>
                                        <p className="text-gray-800 dark:text-white">{notification.message}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NotificationsPanel;