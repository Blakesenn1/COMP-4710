import React, { useState } from 'react';
import StudentHub from './StudentHub';
import './App.css'; // Keeps button colors and fonts active

function App() {
  const [view, setView] = useState('home');

  if (view === 'student') {
    return (
      <div style={{ width: '100vw', overflowX: 'hidden', margin: 0, padding: 0 }}>
        <StudentHub goBack={() => setView('home')} />
      </div>
    );
  }

  return (
    <div style={{ 
      position: 'fixed', /* Locks it to the exact dimensions of the iPhone screen */
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', /* Dead center vertically */
      alignItems: 'center', /* Dead center horizontally */
      backgroundColor: '#f9f9f9', /* Matches the white/off-white background */
      margin: 0, 
      padding: 0, 
      overflow: 'hidden' 
    }}>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '85%', /* Gives a nice margin on the edges of the phone */
        maxWidth: '350px' 
      }}>
        
        <h1 style={{ color: '#03244D', fontSize: '3rem', margin: '0 0 10px 0', textAlign: 'center', width: '100%' }}>AUBURN</h1>
        <p style={{ color: '#DD550C', letterSpacing: '3px', fontWeight: 'bold', margin: '0 0 40px 0', textAlign: 'center', width: '100%' }}>SUPER APP</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '15px' }}>
          <button className="hub-selection-button" style={{ width: '100%', textAlign: 'center', padding: '15px' }} onClick={() => setView('student')}>STUDENT HUB</button>
          <button className="hub-selection-button" style={{ width: '100%', textAlign: 'center', padding: '15px' }} onClick={() => alert("Faculty Hub coming soon!")}>FACULTY / STAFF HUB</button>
          <button className="hub-selection-button" style={{ width: '100%', textAlign: 'center', padding: '15px' }} onClick={() => alert("Parent Hub coming soon!")}>PARENT HUB</button>
          <button className="hub-selection-button" style={{ width: '100%', textAlign: 'center', padding: '15px' }} onClick={() => alert("Fan Hub coming soon!")}>ATHLETICS FAN HUB</button>
        </div>

      </div>
    </div>
  );
}

export default App;