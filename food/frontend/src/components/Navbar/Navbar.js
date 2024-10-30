import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
    const location = useLocation();

    const NavLink = ({ to, children }) => {
        const isActive = location.pathname === to;
        return (
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
            >
                <Link
                    to={to}
                    className={`text-white hover:text-yellow-300 transition-colors ${isActive ? 'text-yellow-400' : ''
                        }`}
                >
                    {children}
                    {isActive && (
                        <motion.div
                            layoutId="underline"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                        />
                    )}
                </Link>
            </motion.div>
        );
    };

    return (
        <nav className="fixed w-full top-0 z-50 bg-green-800 dark:bg-green-900 shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="text-2xl font-bold text-yellow-400"
                    >
                        FoodWaste Reducer
                    </motion.div>
                    <div className="flex space-x-6 items-center">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/impact">Impact</NavLink>
                        <NavLink to="/causes">Causes</NavLink>
                        <NavLink to="/what-you-can-do">What You Can Do</NavLink>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleDarkMode}
                            className="text-yellow-400 hover:text-yellow-300 transition-colors"
                        >
                            {isDarkMode ? '☀️' : '🌙'}
                        </motion.button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;