import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-container"
        >
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="max-w-3xl mx-auto"
            >
                <h1 className="section-title text-center">About Our Mission</h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8"
                >
                    <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
                        Our Purpose
                    </h2>
                    <p className="section-text mb-4">
                        We are dedicated to combating food waste through education, awareness, and
                        technological solutions. Our team strives to create meaningful change in how
                        organizations and individuals approach food consumption and waste management.
                    </p>
                    <p className="section-text">
                        Through innovative tools and data-driven insights, we help businesses and
                        institutions minimize their food waste footprint while maximizing their
                        positive impact on the environment.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="grid md:grid-cols-2 gap-6"
                >
                    <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-3">
                            Our Goals
                        </h3>
                        <ul className="space-y-2 section-text">
                            <li>• Reduce global food waste</li>
                            <li>• Educate about waste impact</li>
                            <li>• Provide practical solutions</li>
                            <li>• Support sustainable practices</li>
                        </ul>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-3">
                            Our Approach
                        </h3>
                        <ul className="space-y-2 section-text">
                            <li>• Data-driven analysis</li>
                            <li>• AI-powered recommendations</li>
                            <li>• User-friendly tools</li>
                            <li>• Continuous improvement</li>
                        </ul>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default About;