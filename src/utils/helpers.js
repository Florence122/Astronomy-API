// Format date to YYYY-MM-DD
export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// Get date 30 days ago for default range
export const getDefaultStartDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return formatDate(date);
};

// Get today's date
export const getTodayDate = () => {
  return formatDate(new Date());
};

// Categorize APODs by media type
export const categorizeAPODs = (apods) => {
  const categories = {
    image: [],
    video: []
  };
  
  apods.forEach(apod => {
    if (apod.media_type === 'image') {
      categories.image.push(apod);
    } else if (apod.media_type === 'video') {
      categories.video.push(apod);
    }
  });
  
  return categories;
};

// Truncate long text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};