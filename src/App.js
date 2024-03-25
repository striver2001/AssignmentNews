import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar component */}
        <Navbar />

        {/* News Component */}
        <News />
      </div>
    </Router>
  );
}

export default App;
