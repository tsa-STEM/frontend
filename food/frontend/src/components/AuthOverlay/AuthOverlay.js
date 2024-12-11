// src/components/AuthOverlay/AuthOverlay.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Loader, User, Lock, Sparkles, Star } from 'lucide-react';

const AuthOverlay = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [authStep, setAuthStep] = useState(0);
    const [displayedUsername, setDisplayedUsername] = useState('');
    const [displayedPassword, setDisplayedPassword] = useState('');
    const username = 'TSA';

    useEffect(() => {
        if (isOpen) {
            
            setAuthStep(0);
            setDisplayedUsername('');
            setDisplayedPassword('');

            
            let currentChar = 0;
            const typeUsername = setInterval(() => {
                if (currentChar < username.length) {
                    setDisplayedUsername(prev => prev + username[currentChar]);
                    currentChar++;
                } else {
                    clearInterval(typeUsername);
                    
                    let dots = 0;
                    const typePassword = setInterval(() => {
                        if (dots < 8) {
                            setDisplayedPassword(prev => prev + '•');
                            dots++;
                        } else {
                            clearInterval(typePassword);
                            
                            setAuthStep(1);

                            
                            const steps = [
                                { step: 2, delay: 800 },
                                { step: 3, delay: 1600 },
                                { step: 4, delay: 2200 }
                            ];

                            steps.forEach(({ step, delay }) => {
                                setTimeout(() => setAuthStep(step), delay);
                            });

                            setTimeout(() => {
                                onClose();
                                navigate('/dashboard');
                            }, 2600);
                        }
                    }, 100);
                }
            }, 150);

            return () => {
                setDisplayedUsername('');
                setDisplayedPassword('');
            };
        }
    }, [isOpen, navigate, onClose]);

    const messages = [
        "Please wait...",
        "Verifying credentials...",
        "Authenticating session...",
        "Success! Welcome back TSA"
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    const cardVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        exit: {
            scale: 0.8,
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                    <motion.div
                        variants={cardVariants}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4"
                    >
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: authStep === 3 ? [1, 1.2, 1] : 1,
                                    rotate: authStep !== 3 ? 360 : 0
                                }}
                                transition={{
                                    rotate: {
                                        duration: 2,
                                        repeat: authStep !== 3 ? Infinity : 0,
                                        ease: "linear"
                                    },
                                    scale: { duration: 0.4 }
                                }}
                                className="relative w-16 h-16 mb-6"
                            >
                                {authStep < 3 ? (
                                    <>
                                        <Shield className="w-16 h-16 text-green-500 absolute" />
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            className="absolute inset-0"
                                        >
                                            <Loader className="w-16 h-16 text-green-500/30" />
                                        </motion.div>
                                    </>
                                ) : (
                                    <motion.div className="relative">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 15
                                            }}
                                        >
                                            <Sparkles className="w-16 h-16 text-yellow-400" />
                                        </motion.div>
                                        {[...Array(6)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{
                                                    scale: [0, 1, 0],
                                                    opacity: [0, 1, 0],
                                                    x: [0, Math.cos(i * 60 * Math.PI / 180) * 40],
                                                    y: [0, Math.sin(i * 60 * Math.PI / 180) * 40]
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    delay: 0.2,
                                                    repeat: Infinity,
                                                    repeatDelay: 1
                                                }}
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            >
                                                <Star className="w-4 h-4 text-yellow-400" />
                                            </motion.div>
                                        ))}
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{
                                                scale: [0.8, 1.2, 0.8],
                                                opacity: [0, 0.5, 0]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="absolute inset-0 rounded-full bg-yellow-400/20 blur-md"
                                        />
                                    </motion.div>
                                )}
                            </motion.div>

                            <div className="w-full max-w-xs space-y-4 mb-6">
                                
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <User className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg pl-10 pr-4 py-2 w-full">
                                        {displayedUsername || " "}
                                    </div>
                                </div>

                               
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg pl-10 pr-4 py-2 w-full">
                                        {displayedPassword || " "}
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-center"
                            >
                                <motion.h2
                                    layout
                                    className="text-xl font-semibold text-gray-800 dark:text-white mb-2"
                                >
                                    {messages[authStep]}
                                </motion.h2>

                                {authStep < 3 && (
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2 }}
                                        className="h-1 bg-green-500 rounded-full mt-4"
                                    />
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthOverlay;