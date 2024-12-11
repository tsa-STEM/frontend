import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Line,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import {
    Bell,
    Settings,
    ChevronDown,
    PieChart,
    TrendingUp,
    TrendingDown,
    Users,
    Box,
    Calendar,
    Clock,
    Eye,
    Brain,
    Zap,
    Target,
    AlertCircle
} from 'lucide-react';
import WasteReportModal from '../../components/Modals/WasteReportModal';
import PickupScheduleModal from '../../components/Modals/PickupScheduleModal';
import NotificationsPanel from '../../components/Panels/NotificationsPanel';
import SettingsPanel from '../../components/Panels/SettingsPanel';

const mockData = {
    weeklyWaste: [
        { day: 'Mon', amount: 45, target: 50 },
        { day: 'Tue', amount: 38, target: 50 },
        { day: 'Wed', amount: 42, target: 50 },
        { day: 'Thu', amount: 35, target: 50 },
        { day: 'Fri', amount: 48, target: 50 },
        { day: 'Sat', amount: 52, target: 50 },
        { day: 'Sun', amount: 41, target: 50 },
    ],
    stats: {
        totalReduction: '32%',
        monthlyAverage: '43 lbs',
        activePrograms: '8',
        impactScore: '89',
    },
    recentUpdates: [
        {
            id: 1,
            type: 'success',
            message: 'New waste reduction milestone achieved',
            timestamp: '2 hours ago',
            icon: TrendingUp
        },
        {
            id: 2,
            type: 'warning',
            message: 'Weekly report available for review',
            timestamp: '4 hours ago',
            icon: Eye
        },
        {
            id: 3,
            type: 'info',
            message: 'Next pickup scheduled for tomorrow',
            timestamp: '5 hours ago',
            icon: Calendar
        }
    ],
    
    insights: [
        {
            id: 1,
            type: 'anomaly',
            title: 'Unusual Pattern Detected',
            description: 'Waste increased by 47% during evening hours. Potential correlation with new menu items.',
            impact: 'high',
            confidence: 92,
            recommendation: 'Review portion sizes for new menu items',
            timeDetected: '2 hours ago'
        },
        {
            id: 2,
            type: 'prediction',
            title: 'Forecasted Peak',
            description: 'High waste volume expected this Friday based on historical patterns',
            impact: 'medium',
            confidence: 88,
            recommendation: 'Adjust prep schedule to reduce potential overflow',
            timeDetected: '4 hours ago'
        }
    ]
};

const Dashboard = ({ isDarkMode, toggleDarkMode }) => {
    const [activeTab, setActiveTab] = useState('day'); 
    const [isLoading, setIsLoading] = useState(true);
    const [isWasteReportOpen, setIsWasteReportOpen] = useState(false);
    const [isPickupScheduleOpen, setIsPickupScheduleOpen] = useState(false);
    const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
    const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
    const [hoveredDay, setHoveredDay] = useState(null);

   
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const amountData = payload.find(p => p.dataKey === 'amount');
            const targetData = payload.find(p => p.dataKey === 'target');

            return (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-800 dark:text-white">
                        {amountData ? `${amountData.value} lbs` : ''}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {targetData ? `Target: ${targetData.value} lbs` : ''}
                    </p>
                </div>
            );
        }
        return null;
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ${color} relative overflow-hidden`}
        >
            <div className="flex items-start justify-between relative z-10">
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
                    <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">{value}</h3>
                </div>
                <Icon className="text-green-500" size={24} />
            </div>
            <div className="mt-4 relative z-10">
                <div className="flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+12% from last month</span>
                </div>
            </div>
            
            <div className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500" />
        </motion.div>
    );

    const SkeletonLoader = () => (
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-32" />
                ))}
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64" />
                ))}
            </div>
        </div>
    );

    const UpdateCard = ({ update }) => {
        const Icon = update.icon;
        const colors = {
            success: 'bg-green-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };

        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-start space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
                <div className={`${colors[update.type]} p-2 rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-gray-800 dark:text-white">{update.message}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{update.timestamp}</p>
                </div>
            </motion.div>
        );
    };

    
    const InsightsEngine = () => {
        const [isAnalyzing, setIsAnalyzing] = useState(false);
        const [activeInsight, setActiveInsight] = useState(null);

        const pulseVariants = {
            pulse: {
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
                transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }
        };

        const insightVariants = {
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 }
        };

        const getImpactColor = (impact) => {
            const colors = {
                high: 'text-red-500',
                medium: 'text-yellow-500',
                low: 'text-green-500'
            };
            return colors[impact] || 'text-gray-500';
        };

        const triggerAnalysis = () => {
            setIsAnalyzing(true);
            setActiveInsight(null);
            setTimeout(() => {
                setIsAnalyzing(false);
                
                setActiveInsight(prev => {
                    const nextIndex = prev ? (mockData.insights.findIndex(ins => ins.id === prev.id) + 1) % mockData.insights.length : 0;
                    return mockData.insights[nextIndex];
                });
            }, 2000);
        };

        return (
            <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
            >
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                        <motion.div
                            animate={isAnalyzing ? "pulse" : ""}
                            variants={pulseVariants}
                            className="relative"
                        >
                            <Brain className="w-6 h-6 text-purple-500" />
                            {isAnalyzing && (
                                <motion.div
                                    initial={{ scale: 1, opacity: 0.8 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="absolute inset-0 rounded-full bg-purple-500"
                                />
                            )}
                        </motion.div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Smart Insights Engine</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Real-time pattern analysis & predictions</p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={triggerAnalysis}
                        className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                        disabled={isAnalyzing}
                    >
                        <Zap className="w-4 h-4" />
                        <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Now'}</span>
                    </motion.button>
                </div>

                <div className="space-y-4">
                    {isAnalyzing ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
                            />
                            <div className="mt-4 text-gray-600 dark:text-gray-300">
                                Analyzing patterns and generating insights...
                            </div>
                        </div>
                    ) : activeInsight ? (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={insightVariants}
                            className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-start space-x-3">
                                    <div className={`p-2 rounded-lg ${activeInsight.type === 'anomaly' ? 'bg-red-100 dark:bg-red-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'}`}>
                                        {activeInsight.type === 'anomaly' ?
                                            <AlertCircle className="w-5 h-5 text-red-500" /> :
                                            <Target className="w-5 h-5 text-yellow-500" />
                                        }
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-white">{activeInsight.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{activeInsight.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Confidence</span>
                                    <span className="text-sm font-semibold text-purple-500">{activeInsight.confidence}%</span>
                                </div>
                            </div>

                            <div className="mt-4 space-y-3">
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-gray-600 dark:text-gray-300">Impact:</span>
                                    <span className={`font-semibold ${getImpactColor(activeInsight.impact)}`}>
                                        {activeInsight.impact.toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Zap className="w-4 h-4 text-purple-500 mt-1" />
                                    <div>
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Recommended Action:</span>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{activeInsight.recommendation}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Detected {activeInsight.timeDetected}
                                    </span>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-purple-500 hover:text-purple-600 text-sm font-medium"
                                    >
                                        View Details →
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            Click "Analyze Now" to generate insights 
                        </div>
                    )}
                </div>
            </motion.div>
        );
    };

    if (isLoading) return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-6">
            <div className="max-w-7xl mx-auto">
                <SkeletonLoader />
            </div>
        </div>
    );

    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-6"
            >
                
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <motion.div variants={itemVariants} className="space-y-1">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                                Welcome Back TSA!
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                This is your dashboard overview
                            </p>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="flex space-x-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsNotificationsPanelOpen(true)}
                                className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm relative"
                            >
                                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsSettingsPanelOpen(true)}
                                className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                            >
                                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </motion.button>
                        </motion.div>
                    </div>

                    
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    >
                        <StatCard
                            icon={PieChart}
                            title="Waste Reduction"
                            value={mockData.stats.totalReduction}
                            color="hover:shadow-green-500/30"
                        />
                        <StatCard
                            icon={Box}
                            title="Monthly Average"
                            value={mockData.stats.monthlyAverage}
                            color="hover:shadow-blue-500/30"
                        />
                        <StatCard
                            icon={Users}
                            title="Active Programs"
                            value={mockData.stats.activePrograms}
                            color="hover:shadow-purple-500/30"
                        />
                        <StatCard
                            icon={TrendingUp}
                            title="Impact Score"
                            value={mockData.stats.impactScore}
                            color="hover:shadow-yellow-500/30"
                        />
                    </motion.div>

                    
                    <motion.div
                        variants={itemVariants}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Weekly Waste Trends</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Track your progress against targets</p>
                            </div>
                            <select className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last 90 days</option>
                            </select>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockData.weeklyWaste}>
                                    <defs>
                                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="day" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="amount"
                                        stroke="#22c55e"
                                        fillOpacity={1}
                                        fill="url(#colorAmount)"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="target"
                                        stroke="#9CA3AF"
                                        strokeDasharray="5 5"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    
                    <InsightsEngine />

                    
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
                            <div className="space-y-4">
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => setIsWasteReportOpen(true)}
                                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                                >
                                    <span className="text-gray-700 dark:text-gray-200">Generate Waste Report</span>
                                    <ChevronDown className="w-5 h-5 text-gray-500 group-hover:rotate-180 transition-transform" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => setIsPickupScheduleOpen(true)}
                                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                                >
                                    <span className="text-gray-700 dark:text-gray-200">Schedule Pickup</span>
                                    <ChevronDown className="w-5 h-5 text-gray-500 group-hover:rotate-180 transition-transform" />
                                </motion.button>
                            </div>

                            
                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                                            More actions coming soon
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Updates</h3>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-sm text-green-500 hover:text-green-600 dark:hover:text-green-400"
                                >
                                    View all
                                </motion.button>
                            </div>
                            <div className="space-y-2">
                                <AnimatePresence>
                                    {mockData.recentUpdates.map((update) => (
                                        <UpdateCard key={update.id} update={update} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>

                    
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 flex justify-center"
                    >
                        <div className="inline-flex rounded-md shadow-sm bg-white dark:bg-gray-800 p-1">
                            {['Day', 'Week', 'Month', 'Year'].map((period) => (
                                <button
                                    key={period}
                                    onClick={() => setActiveTab(period.toLowerCase())}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                                        ${activeTab === period.toLowerCase()
                                            ? 'bg-green-500 text-white'
                                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                        }`}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            
            <WasteReportModal
                isOpen={isWasteReportOpen}
                onClose={() => setIsWasteReportOpen(false)}
            />
            <PickupScheduleModal
                isOpen={isPickupScheduleOpen}
                onClose={() => setIsPickupScheduleOpen(false)}
            />
            <NotificationsPanel
                isOpen={isNotificationsPanelOpen}
                onClose={() => setIsNotificationsPanelOpen(false)}
            />
            <SettingsPanel
                isOpen={isSettingsPanelOpen}
                onClose={() => setIsSettingsPanelOpen(false)}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
            />
        </>
    );
};

export default Dashboard;
