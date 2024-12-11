import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Impact from './pages/Impact/Impact';
import Dashboard from './pages/Dashboard/Dashboard';
import Causes from './pages/Causes/Causes';
import WhatYouCanDo from './pages/WhatYouCanDo/WhatYouCanDo';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/global.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Router>
        <div className="min-h-screen bg-green-50 dark:bg-gray-900 transition-colors duration-300">
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/causes" element={<Causes />} />
              <Route path="/what-you-can-do" element={<WhatYouCanDo />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </div>
  );
}

export default App;