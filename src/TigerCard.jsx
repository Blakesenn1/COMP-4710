import React from 'react';

function TigerCard({ goBack }) {
  return (
    <div className="feature-container">
      <button className="back-button" onClick={goBack}>
        &larr; Back to Student Hub
      </button>
      
      <h2 style={{color: '#03244D'}}>Digital Tiger Card</h2>
      
      <div className="id-card">
        <div className="id-header">AUBURN UNIVERSITY</div>
        <div className="id-body">
          <div className="id-details">
            <h3>Blake Senn</h3>
            <p><strong>Student ID:</strong> 902 00 0000</p>
            <p><strong>Status:</strong> UNDERGRADUATE</p>
            <p><strong>Major:</strong> Computer Science</p>
          </div>
        </div>
        <div className="id-footer">
          VALID THROUGH MAY 2026
        </div>
      </div>
      
    </div>
  );
}

export default TigerCard;