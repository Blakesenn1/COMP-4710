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