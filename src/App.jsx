import React, { useState } from 'react';
import StudentHub from './StudentHub';
import './App.css';

function App() {
  const [view, setView] = useState('home');

  if (view === 'student') {
    return (
      <div className="app-container" style={{ 
        width: '100%', 
        maxWidth: '100vw', 
        overflowX: 'hidden',
        margin: 0, 
        padding: 0 
      }}>
        <StudentHub goBack={() => setView('home')} />
      </div>
    );
  }

  return (
    // 1. THE MASTER WRAPPER: Centers everything horizontally and vertically
    <div className="app-container" style={{ 
      display: 'flex', 
      justifyContent: 'center', /* Locks to horizontal center */
      alignItems: 'center', 
      width: '100%', 
      maxWidth: '100vw', 
      minHeight: '100vh', /* Takes up the full height of the phone */
      overflowX: 'hidden', 
      margin: 0, /* Kills rogue CSS margins */
      padding: 0, /* Kills rogue CSS padding */
      boxSizing: 'border-box' 
    }}>
      
      {/* 2. THE CARD: Auto-margins force it to the middle, text-align centers the words */}
      <div className="home-card" style={{ 
        width: '100%', 
        maxWidth: '400px', /* Keeps it looking like a mobile app */
        margin: '0 auto', 
        padding: '20px', 
        boxSizing: 'border-box', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center' /* Forces the title to perfectly center */
      }}>
        
        <h1 className="main-title" style={{ margin: '0 0 10px 0' }}>Auburn</h1>
        <p className="main-subtitle" style={{ margin: '0 0 30px 0' }}>Super App</p>
        
        {/* 3. THE BUTTONS: Centered inside the card */}
        <div className="hub-list" style={{ 
          display: 'flex', 
          flexDirection: 'column', /* Stacks them vertically on phones */
          alignItems: 'center',
          width: '100%', 
          gap: '15px',
          margin: 0,
          padding: 0
        }}>
          <button className="hub-selection-button" style={{ width: '100%', maxWidth: '300px' }} onClick={() => setView('student')}>Student Hub</button>
          <button className="hub-selection-button" style={{ width: '100%', maxWidth: '300px' }} onClick={() => alert("Faculty Hub coming soon!")}>Faculty / Staff Hub</button>
          <button className="hub-selection-button" style={{ width: '100%', maxWidth: '300px' }} onClick={() => alert("Parent Hub coming soon!")}>Parent Hub</button>
          <button className="hub-selection-button" style={{ width: '100%', maxWidth: '300px' }} onClick={() => alert("Fan Hub coming soon!")}>Athletics Fan Hub</button>
        </div>

      </div>
    </div>
  );
}

export default App;