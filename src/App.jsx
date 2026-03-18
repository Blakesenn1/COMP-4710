import React, { useState } from 'react';
import StudentHub from './StudentHub';
import './App.css';

function App() {
  const [view, setView] = useState('home');

  if (view === 'student') {
    return (
      <div className="app-container">
        <StudentHub goBack={() => setView('home')} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="home-card">
        <h1 className="main-title">Auburn</h1>
        <p className="main-subtitle">Super App</p>
        
        <div className="hub-list">
          <button className="hub-selection-button" onClick={() => setView('student')}>
            Student Hub
          </button>
          
          <button className="hub-selection-button" onClick={() => alert("Faculty Hub coming soon!")}>
            Faculty / Staff Hub
          </button>
          
          <button className="hub-selection-button" onClick={() => alert("Parent Hub coming soon!")}>
            Parent Hub
          </button>
          
          <button className="hub-selection-button" onClick={() => alert("Fan Hub coming soon!")}>
            Athletics Fan Hub
          </button>
        </div>
        
        <div style={{ marginTop: '80px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
           <p style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Auburn University | Senior Design 2026
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;