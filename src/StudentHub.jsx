import React from 'react';

const StudentHub = () => {
  const features = [
    "Transportation", "Campus Life", "Academics", 
    "Financial Services", "Tiger Card", "Housing"
  ];

  const handleFeatureClick = (featureName) => {
    alert(`Launching ${featureName}...`);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#03244d', borderBottom: '2px solid #f2f2f2', paddingBottom: '10px' }}>Student Hub</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px', marginTop: '20px' }}>
        {features.map((feature) => (
          <button 
            key={feature}
            onClick={() => handleFeatureClick(feature)}
            style={featureButtonStyle}
          >
            {feature}
          </button>
        ))}
      </div>
    </div>
  );
};

const featureButtonStyle = {
  padding: '15px',
  backgroundColor: '#f8f9fa',
  border: '1px solid #ddd',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600'
};

export default StudentHub;