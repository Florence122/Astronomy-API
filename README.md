# Astronomy-API# NASA APOD React App

## Overview
React application consuming NASA's Astronomy Picture of the Day (APOD) API. Built as part of a technical assessment to demonstrate API integration, error handling, and responsive UI design.



## Features
- **List View**: Browse recent astronomy pictures with pagination
- **Detail View**: Click any image for detailed explanation
- **Media Handling**: Supports both images and videos from NASA
- **Loading States**: Smooth loading indicators
- **Error Handling**: Comprehensive error states with retry options
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Summary View**: Categorization by media type
- **Data Validation**: Handles missing/inconsistent API data

## Why NASA APOD API?
| Aspect | Reason |
|--------|--------|
| **No Auth Required** | Uses NASA's DEMO_KEY for easy access |
| **Real-world Data** | Shows actual inconsistencies (missing fields, different media types) |
| **Educational** | Engaging content for demonstration |
| **Rate Limited** | Good for demonstrating error handling |
| **Mixed Media** | Images and videos require different UI treatment |

## Tech Stack
- **React** (Create React App)
- **React Router** for navigation
- **Axios** for API calls
- **CSS Modules** for styling
- **NASA APOD API** for data

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
```bash
# Clone repository
git clone [your-repo-url]
cd nasa-apod-react

# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000 in your browser
