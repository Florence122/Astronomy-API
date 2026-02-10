import React from 'react';
// import './ErrorMessage.css';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="error-message">
      <div className="error-icon">🚨</div>
      <h3>Something went wrong</h3>
      <p className="error-detail">{error}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      )}
      <p className="error-note">
        If the problem persists, NASA's API might be temporarily unavailable.
      </p>
    </div>
  );
};

export default ErrorMessage;