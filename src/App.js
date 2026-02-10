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
      </div>
    </Router>
  );
}

export default App;