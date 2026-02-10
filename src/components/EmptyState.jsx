import React from 'react';
// import './EmptyState.css';

const EmptyState = ({ message = 'No astronomy pictures found.' }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">🌌</div>
      <h3>No Images Found</h3>
      <p>{message}</p>
      <p className="empty-suggestion">
        Try adjusting the date range or check back tomorrow for new content!
      </p>
    </div>
  );
};

export default EmptyState;