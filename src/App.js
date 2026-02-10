import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import APODList from './components/APODList';
import APODDetail from './components/APODDetail';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<APODList />} />
          <Route path="/apod/:date" element={<APODDetail />} />
        </Routes>
        
        <footer className="app-footer">
          <p>
            Powered by NASA's Astronomy Picture of the Day API | 
            Built for Technical Assessment | 
            DEMO_KEY rate limited
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;