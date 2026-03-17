import React, { useState } from 'react';
import TigerCard from './TigerCard';

function StudentHub({ goBack }) {
  const [activeFeature, setActiveFeature] = useState(null);

  if (activeFeature === 'TigerCard') {
    return <TigerCard goBack={() => setActiveFeature(null)} />;
  }

  return (
    <div className="main-menu">
      <button className="back-button" onClick={goBack}>
        &larr; Back to Main Menu
      </button>
      <h2>Student Hub</h2>
      
      <div className="button-grid">
        <button className="hub-button" onClick={() => setActiveFeature('TigerCard')}>
          Tiger Card
        </button>
        <button className="hub-button" onClick={() => alert("Academics coming soon!")}>
          Academics
        </button>
        <button className="hub-button" onClick={() => alert("Campus Dining coming soon!")}>
          Campus Dining
        </button>
        <button className="hub-button" onClick={() => alert("Transportation coming soon!")}>
          Transportation
        </button>
      </div>
    </div>
  );
}

export default StudentHub;