import React from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  return (
    <div className="App flex justify-center items-center h-screen bg-white">
      <header className="text-center">
        <motion.p
          className="text-4xl font-bold"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        >
          We are working on it
        </motion.p>
      </header>
    </div>
  );
}

export default App;
