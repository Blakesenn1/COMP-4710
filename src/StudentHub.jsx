import React, { useState } from 'react';

// --- ALL IMPLEMENTED FEATURE IMPORTS ---
import RateMyProfessor from './RateMyProfessor';
import AcademicPortal from './AcademicPortal';
import AcademicCalendar from './AcademicCalendar';
import TigerDining from './TigerDining';
import GreekLife from './GreekLife';
import CampusCalendar from './CampusCalendar';

const menuData = [
  {
    id: 'academics',
    title: 'Academics & Career',
    icon: '🎓',
    features: [
      { id: 'RateMyProfessor', name: 'Rate My Professor' },
      { id: 'AcademicPortal', name: 'Academic Portal' },
      { id: 'AcademicCalendar', name: 'Academic Calendar' }
    ]
  },
  {
    id: 'campusLife',
    title: 'Campus Life & Dining',
    icon: '🍕',
    features: [
      { id: 'TigerDining', name: 'AU Dining' },
      { id: 'GreekLife', name: 'Greek Life' },
      { id: 'CampusCalendar', name: 'Campus Calendar' }
    ]
  },
  {
    id: 'housing',
    title: 'Housing & Living',
    icon: '🏠',
    features: [
      { id: 'DormExplorer', name: 'Interactive Dorm Explorer' },
      { id: 'Maintenance', name: 'Maintenance Request Portal' },
      { id: 'Roommate', name: 'Roommate Agreement Builder' }
    ]
  },
  {
    id: 'safety',
    title: 'Safety & Wellness',
    icon: '🚨', 
    features: [
      { id: 'BlueLight', name: 'Digital Blue Light' },
      { id: 'TipLine', name: 'Anonymous Tip Line' },
      { id: 'Alerts', name: 'Auburn Alerts History' }
    ]
  },
  {
    id: 'transportation',
    title: 'Transportation & Parking',
    icon: '🚌',
    features: [
      { id: 'TransitMap', name: 'Live Tiger Transit Map' },
      { id: 'Shuttle', name: 'Late-Night Free Shuttle' },
      { id: 'Parking', name: 'Campus Parking Status' }
    ]
  }
];

function StudentHub({ goBack }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleFeatureClick = (featureId) => {
    // Array of all 10 completed features
    const implementedFeatures = [
      'RateMyProfessor', 'AcademicPortal', 'AcademicCalendar', 
      'TigerDining', 'GreekLife', 'CampusCalendar'
    ];
    
    if (implementedFeatures.includes(featureId)) {
      setActiveFeature(featureId);
    } else {
      alert("This feature is currently under construction for the prototype!");
    }
  };

  // --- COMPONENT ROUTING ---
  
  // Academics & Career
  if (activeFeature === 'RateMyProfessor') return <RateMyProfessor goBack={() => setActiveFeature(null)} />;
  if (activeFeature === 'AcademicPortal') return <AcademicPortal goBack={() => setActiveFeature(null)} />;
  if (activeFeature === 'AcademicCalendar') return <AcademicCalendar goBack={() => setActiveFeature(null)} />;
  
  // Campus Life & Dining
  if (activeFeature === 'TigerDining') return <TigerDining goBack={() => setActiveFeature(null)} />;
  if (activeFeature === 'GreekLife') return <GreekLife goBack={() => setActiveFeature(null)} />;
  if (activeFeature === 'CampusCalendar') return <CampusCalendar goBack={() => setActiveFeature(null)} />;

  // --- MAIN MENU RENDER ---
  return (
    <div className="main-menu" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back to Home Screen</button>
      <h2 style={{ color: '#03244D', marginBottom: '30px', textAlign: 'left' }}>Student Hub</h2>

      <div className="accordion-container">
        {menuData.map((category) => (
          <div key={category.id} className="accordion-card" style={{ marginBottom: '10px' }}>
            <div className="accordion-header" onClick={() => toggleCategory(category.id)}>
              <div className="header-left">
                <span className="accordion-icon">{category.icon}</span>
                <span>{category.title}</span>
              </div>
              <span>{expandedCategory === category.id ? '▼' : '▶'}</span>
            </div>

            {expandedCategory === category.id && (
              <div className="accordion-body">
                {category.features.map((feature) => (
                  <button 
                    key={feature.id} 
                    className="accordion-item"
                    onClick={() => handleFeatureClick(feature.id)}
                  >
                    {feature.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentHub;