import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading NASA data...' }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default LoadingSpinner;