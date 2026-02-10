import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import nasaService from '../services/nasaService';
import { 
  getDefaultStartDate, 
  getTodayDate, 
  categorizeAPODs,
  truncateText 
} from '../utils/helpers';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';
// import './APODList.css';

const APODList = () => {
  const [apods, setApods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState({});
  const itemsPerPage = 9;

  useEffect(() => {
    fetchAPODs();
  }, []);

  const fetchAPODs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await nasaService.getAPODs(
        getDefaultStartDate(),
        getTodayDate()
      );
      
      setApods(data);
      setCategories(categorizeAPODs(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle image loading errors
  const handleImageError = (e, apod) => {
    e.target.src = '/fallback-image.jpg';
    e.target.alt = `Image unavailable: ${apod.title}`;
  };

  // Pagination logic
  const getPaginatedAPODs = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return apods.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(apods.length / itemsPerPage);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={fetchAPODs} />;
  if (apods.length === 0) return <EmptyState />;

  return (
    <div className="apod-list-container">
      <header className="list-header">
        <h1>🌌 NASA Astronomy Picture of the Day</h1>
        <p className="subtitle">
          Exploring the universe, one picture at a time
        </p>
      </header>

      {/* Summary/Categorization View */}
      <div className="summary-section">
        <h2>Gallery Summary</h2>
        <div className="category-summary">
          <div className="category-card">
            <span className="category-icon">🖼️</span>
            <h3>Images</h3>
            <p className="category-count">{categories.image?.length || 0}</p>
          </div>
          <div className="category-card">
            <span className="category-icon">🎬</span>
            <h3>Videos</h3>
            <p className="category-count">{categories.video?.length || 0}</p>
          </div>
          <div className="category-card">
            <span className="category-icon">📅</span>
            <h3>Date Range</h3>
            <p className="category-count">Last 30 days</p>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>

      {/* APOD Grid */}
      <div className="apod-grid">
        {getPaginatedAPODs().map((apod) => (
          <Link 
            to={`/apod/${apod.date}`} 
            key={apod.date} 
            className="apod-card"
          >
            <div className="card-media">
              <div className={`media-badge ${apod.media_type}`}>
                {nasaService.getMediaType(apod)}
              </div>
              
              <img
                src={nasaService.getDisplayUrl(apod)}
                alt={apod.title}
                onError={(e) => handleImageError(e, apod)}
                className="apod-image"
              />
              
              {apod.media_type === 'video' && (
                <div className="video-overlay">▶️</div>
              )}
            </div>

            <div className="card-content">
              <h3 className="card-title">{apod.title}</h3>
              <p className="card-date">{apod.date}</p>
              <p className="card-explanation">
                {truncateText(apod.explanation, 80)}
              </p>
              <div className="card-footer">
                <span className="copyright">
                  © {nasaService.getCopyright(apod)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default APODList;