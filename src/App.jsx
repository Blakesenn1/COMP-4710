import { useState } from 'react'
import StudentHub from './StudentHub'

function App() {

  const [currentScreen, setCurrentScreen] = useState('Home');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f9', fontFamily: 'sans-serif' }}>
      {/* Top Navigation Bar */}
      <nav style={{ backgroundColor: '#03244d', color: 'white', padding: '15px', textAlign: 'center' }}>
        <h1 style={{ margin: 0 }}>Auburn Super App</h1>
      </nav>

      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* MAIN MENU */}
        {currentScreen === 'Home' && (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2 style={{ color: '#03244d' }}>Main Menu</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
              <button onClick={() => setCurrentScreen('StudentHub')} style={hubButtonStyle}>Student Hub</button>
              <button onClick={() => console.log('Faculty Hub coming soon')} style={hubButtonStyle}>Faculty/Staff Hub</button>
              <button onClick={() => console.log('Parent Hub coming soon')} style={hubButtonStyle}>Parent Hub</button>
              <button onClick={() => console.log('Fan Hub coming soon')} style={hubButtonStyle}>Fan Hub</button>
            </div>
          </div>
        )}

        {/* STUDENT HUB */}
        {currentScreen === 'StudentHub' && (
          <div>
            <button 
              onClick={() => setCurrentScreen('Home')} 
              style={{ marginBottom: '20px', cursor: 'pointer', padding: '10px' }}
            >
              ← Back to Main Menu
            </button>
            <StudentHub />
          </div>
        )}
      </div>
    </div>
  )
}

const hubButtonStyle = {
  padding: '30px',
  fontSize: '18px',
  backgroundColor: '#fff',
  border: '2px solid #03244d',
  borderRadius: '12px',
  color: '#03244d',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default App