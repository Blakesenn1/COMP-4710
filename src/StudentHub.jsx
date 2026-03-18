import React, { useState } from 'react';
import TigerCard from './TigerCard';
import RateMyProfessor from './RateMyProfessor';

function StudentHub({ goBack }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);

  if (activeFeature === 'TigerCard') {
    return <TigerCard goBack={() => setActiveFeature(null)} />;
  }
  if (activeFeature === 'RateMyProfessor') {
    return <RateMyProfessor goBack={() => setActiveFeature(null)} />;
  }

  if (activeCategory === 'Academics') {
    return (
      <div className="main-menu">
        <button className="back-button" onClick={() => setActiveCategory(null)}>
          &larr; Back to Categories
        </button>
        <h2>Academics & Career</h2>
        <div className="button-grid">
          <button className="hub-button" onClick={() => setActiveFeature('RateMyProfessor')}>
            Rate My Professor
          </button>
          <button className="hub-button" onClick={() => alert("Academic Portal coming soon!")}>
            Academic Portal
          </button>
          <button className="hub-button" onClick={() => alert("Career Hub coming soon!")}>
            Career & Co-Op Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-menu">
      <button className="back-button" onClick={goBack}>
        &larr; Back to Main Menu
      </button>
      <h2>Student Hub</h2>
      
      <div className="button-grid">
        <button className="hub-button" onClick={() => setActiveCategory('Academics')}>
          Academics & Career
        </button>
        <button className="hub-button" onClick={() => alert("Campus Life & Dining coming soon!")}>
          Campus Life & Dining
        </button>
        <button className="hub-button" onClick={() => setActiveFeature('TigerCard')}>
          Finances & Billing
        </button>
        <button className="hub-button" onClick={() => alert("Housing & Living coming soon!")}>
          Housing & Living
        </button>
        <button className="hub-button" onClick={() => alert("Safety & Wellness coming soon!")}>
          Safety & Wellness
        </button>
        <button className="hub-button" onClick={() => alert("Transportation & Parking coming soon!")}>
          Transportation & Parking
        </button>
      </div>
    </div>
  );
}

export default StudentHub;