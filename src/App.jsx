import React, { useState } from 'react';
import './App.css'; // This links your Auburn styles!
import StudentHub from './StudentHub';

function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  return (
    <div className="app-container">
      {/* The Global Header */}
      <header className="header">
        <h1>Auburn Super App</h1>
      </header>

      {/* Main Menu View */}
      {currentScreen === 'Home' && (
        <div className="main-menu">
          <h2>Main Menu</h2>
          <div className="button-grid">
            <button className="hub-button" onClick={() => setCurrentScreen('StudentHub')}>Student Hub</button>
            <button className="hub-button" onClick={() => alert('Faculty/Staff Hub coming soon!')}>Faculty/Staff Hub</button>
            <button className="hub-button" onClick={() => alert('Parent Hub coming soon!')}>Parent Hub</button>
            <button className="hub-button" onClick={() => alert('Fan Hub coming soon!')}>Fan Hub</button>
          </div>
        </div>
      )}

      {/* Student Hub View */}
      {currentScreen === 'StudentHub' && (
        <StudentHub goBack={() => setCurrentScreen('Home')} />
      )}
    </div>
  );
}

export default App;