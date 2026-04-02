import React, { useState } from 'react';
import StudentHub from './StudentHub';
import './App.css';

function App() {
  const [view, setView] = useState('home');

  if (view === 'student') {
    return (
      // Added safety width locks here too just in case
      <div className="app-container" style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
        <StudentHub goBack={() => setView('home')} />
      </div>
    );
  }

  return (
    // 1. THE BRICK WALL: This locks the screen width and kills the horizontal sliding
    <div className="app-container" style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box' }}>
      
      {/* 2. THE CARD LOCK: Ensures the card never stretches wider than the phone screen */}
      <div className="home-card" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <h1 className="main-title">Auburn</h1>
        <p className="main-subtitle">Super App</p>
        
        {/* 3. THE FLEX WRAPPER: Forces the buttons to stay centered and wrap if needed */}
        <div className="hub-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', gap: '15px' }}>
          <button className="hub-selection-button" onClick={() => setView('student')}>Student Hub</button>
          <button className="hub-selection-button" onClick={() => alert("Faculty Hub coming soon!")}>Faculty / Staff Hub</button>
          <button className="hub-selection-button" onClick={() => alert("Parent Hub coming soon!")}>Parent Hub</button>
          <button className="hub-selection-button" onClick={() => alert("Fan Hub coming soon!")}>Athletics Fan Hub</button>
        </div>

      </div>
    </div>
  );
}

export default App;