import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import nasaService from '../services/nasaService';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
// import '../styles/APODDetail.css';

const APODDetail = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetchAPOD();
  }, [date]);

  const fetchAPOD = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await nasaService.getAPOD(date);
      
      if (!nasaService.isValidAPOD(data)) {
        throw new Error('Incomplete data received from NASA API');
      }
      
      setApod(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) return <LoadingSpinner message="Loading cosmic wonders..." />;
  if (error) return <ErrorMessage error={error} onRetry={fetchAPOD} />;
  if (!apod) return <ErrorMessage error="No data available for this date." />;

  return (
    <div className="apod-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Gallery
      </button>

      <div className="detail-header">
        <h1 className="detail-title">{apod.title}</h1>
        <div className="detail-meta">
          <span className="meta-date">📅 {apod.date}</span>
          <span className="meta-type">🎬 {nasaService.getMediaType(apod)}</span>
          <span className="meta-copyright">
            © {nasaService.getCopyright(apod)}
          </span>
        </div>
      </div>

      <div className="media-container">
        {apod.media_type === 'image' ? (
          <div className="image-wrapper">
            {imageError ? (
              <div className="fallback-media">
                <p>Image failed to load</p>
                <p>HD URL: {apod.hdurl || 'Not available'}</p>
              </div>
            ) : (
              <img
                src={apod.hdurl || apod.url}
                alt={apod.title}
                onError={handleImageError}
                className="detail-image"
                loading="lazy"
              />
            )}
            {!apod.hdurl && (
              <p className="resolution-note">
                ⓘ HD version not available for this image
              </p>
            )}
          </div>
        ) : (
          <div className="video-wrapper">
            <div className="video-placeholder">
              <p>🎥 Video Content</p>
              <a 
                href={apod.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="video-link"
              >
                Watch on NASA's website
              </a>
              {apod.thumbnail_url && (
                <img 
                  src={apod.thumbnail_url} 
                  alt="Video thumbnail" 
                  className="video-thumbnail"
                />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="explanation-section">
        <h2>Explanation</h2>
        <p className="explanation-text">{apod.explanation}</p>
      </div>

      {/* Show data inconsistencies */}
      <div className="data-notes">
        {!apod.copyright && (
          <div className="missing-data-note">
            <p>📝 <strong>Note:</strong> Copyright information not provided by NASA for this entry.</p>
          </div>
        )}
        
        {apod.service_version && (
          <div className="api-version">
            <p>API Version: {apod.service_version}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default APODDetail;