import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RightMenu = ({ currentTime, onIconClick }) => {
  const [isSwitched, setIsSwitched] = useState(false);

  const handleIconClick = () => {
    setIsSwitched(!isSwitched);
    onIconClick();
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="group w-6 h-6 flex items-center justify-center hover:bg-accent hover:text-white" onClick={handleIconClick}>
        {/* SVG icon here */}
      </div>
      <span>{currentTime}</span>
    </div>
  );
};

export default RightMenu;