import React, { useState } from 'react';
import TigerCard from './TigerCard';
import RateMyProfessor from './RateMyProfessor';
import AcademicPortal from './AcademicPortal';

function StudentHub({ goBack }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);

  // --- FEATURE ROUTING ---
  if (activeFeature === 'TigerCard') return <TigerCard goBack={() => setActiveFeature(null)} />;
  if (activeFeature === 'RateMyProfessor') return <RateMyProfessor goBack={() => setActiveFeature(null)} />;
  if (activeFeature === 'AcademicPortal') return <AcademicPortal goBack={() => setActiveFeature(null)} />;

  // --- SUBMENU VIEWS (The Grid inside each Category) ---
  if (activeCategory === 'Academics') {
    return (
      <div className="main-menu">
        <button className="back-button" onClick={() => setActiveCategory(null)}>&larr; Back</button>
        <h2 style={{ color: '#03244D', margin: '20px 0' }}>Academics & Career</h2>
        <div className="button-grid">
          <button className="hub-button" onClick={() => setActiveFeature('RateMyProfessor')}>👨‍🏫 Rate My Professor</button>
          <button className="hub-button" onClick={() => setActiveFeature('AcademicPortal')}>📊 Academic Portal</button>
          <button className="hub-button" onClick={() => alert("Career Hub coming soon!")}>💼 Career Hub</button>
        </div>
      </div>
    );
  }

  // --- MAIN STUDENT HUB GRID ---
  return (
    <div className="main-menu">
      <button className="back-button" onClick={goBack}>&larr; Back to Home</button>
      <h2 style={{ color: '#03244D', margin: '20px 0' }}>Student Hub</h2>
      
      <div className="button-grid">
        <button className="hub-button" onClick={() => setActiveCategory('Academics')}>
          <span style={{fontSize: '1.5rem', display: 'block'}}>🎓</span>
          Academics & Career
        </button>
        <button className="hub-button" onClick={() => alert("Campus Life coming soon!")}>
          <span style={{fontSize: '1.5rem', display: 'block'}}>🍕</span>
          Campus Life & Dining
        </button>
        <button className="hub-button" onClick={() => setActiveFeature('TigerCard')}>
          <span style={{fontSize: '1.5rem', display: 'block'}}>💰</span>
          Finances & Billing
        </button>
        <button className="hub-button" onClick={() => alert("Housing coming soon!")}>
          <span style={{fontSize: '1.5rem', display: 'block'}}>🏠</span>
          Housing & Living
        </button>
        <button className="hub-button" onClick={() => alert("Safety coming soon!")}>
          <span style={{fontSize: '1.5rem', display: 'block'}}>🚨</span>
          Safety & Wellness
        </button>
        <button className="hub-button" onClick={() => alert("Transport coming soon!")}>
          <span style={{fontSize: '1.5rem', display: 'block'}}>🚌</span>
          Transportation & Parking
        </button>
      </div>
    </div>
  );
}

export default StudentHub;