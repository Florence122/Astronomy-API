import axios from 'axios';

const API_KEY = 'dePOHhOU8yjKPjgZCCNEcZE7pAjfnymd0nugbEwV';
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

class NasaService {
  // Get multiple APODs (for list view)
  async getAPODs(startDate, endDate) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          api_key: API_KEY,
          start_date: startDate,
          end_date: endDate,
          thumbs: true // Include thumbnail for videos
        }
      });
      
      // Reverse to show latest first
      return response.data.reverse();
    } catch (error) {
      console.error('Error fetching APODs:', error);
      throw new Error(this.handleApiError(error));
    }
  }

  // Get single APOD (for detail view)
  async getAPOD(date) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          api_key: API_KEY,
          date: date
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching APOD:', error);
      throw new Error(this.handleApiError(error));
    }
  }

  // Handle API errors
  handleApiError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 429:
          return 'API rate limit exceeded. Please try again later.';
        case 404:
          return 'Data not found for the selected date.';
        case 500:
          return 'NASA server error. Please try again.';
        default:
          return `API Error: ${error.response.status}`;
      }
    } else if (error.request) {
      return 'Network error. Please check your connection.';
    } else {
      return 'An unexpected error occurred.';
    }
  }

  // Handle inconsistent data
  getMediaType(apod) {
    return apod.media_type === 'video' ? 'Video' : 'Image';
  }

  // Handle missing copyright
  getCopyright(apod) {
    return apod.copyright || 'Public Domain';
  }

  // Get display URL (handle different media types)
  getDisplayUrl(apod) {
    if (apod.media_type === 'video' && apod.thumbnail_url) {
      return apod.thumbnail_url;
    }
    return apod.url || apod.hdurl || '';
  }

  // Check if data is complete
  isValidAPOD(apod) {
    return apod && apod.title && apod.explanation;
  }
}

export default new NasaService();