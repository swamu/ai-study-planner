import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress = 0, height = 6, showLabel = false, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-text-secondary">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div className="progress-bar-container" style={{ height: `${height}px` }}>
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
