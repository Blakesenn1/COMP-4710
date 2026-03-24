import React, { useState } from 'react';
import TigerCard from './TigerCard';
import RateMyProfessor from './RateMyProfessor';
import AcademicPortal from './AcademicPortal';
import CareerStatus from './CareerStatus';
import TigerDining from './TigerDining';

const menuData = [
  {
    id: 'academics',
    title: 'Academics & Career',
    icon: '🎓',
    features: [
      { id: 'RateMyProfessor', name: 'Rate My Professor' },
      { id: 'AcademicPortal', name: 'Academic Portal' },
      { id: 'CareerStatus', name: 'Career Status' }
    ]
  },
  {
    id: 'campusLife',
    title: 'Campus Life & Dining',
    icon: '🍕',
    features: [
      { id: 'DiningCritic', name: 'Tiger Dining Critic' },
      { id: 'Involvement', name: 'The Involvement Explorer' },
      { id: 'EventRadar', name: 'Campus Event Radar' }
    ]
  },
  {
    id: 'finance',
    title: 'Finances & Billing',
    icon: '💰', 
    features: [
      { id: 'TigerCard', name: 'Digital Tiger Card' },
      { id: 'eBill', name: 'Mock eBill & Tuition' },
      { id: 'DiningBudgeter', name: 'Dining Dollars Budgeter' }
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
    const implementedFeatures = ['RateMyProfessor', 'TigerCard', 'AcademicPortal', 'CareerStatus', 'TigerDining'];
    if (implementedFeatures.includes(featureId)) {
      setActiveFeature(featureId);
    } else {
      alert("This feature is currently under construction!");
    }
  };

  if (activeFeature === 'TigerCard') return <TigerCard goBack={() => setActiveFeature(null)} />;
  if (activeFeature === 'RateMyProfessor') return <RateMyProfessor goBack={() => setActiveFeature(null)} />;
  if (activeFeature === 'AcademicPortal') return <AcademicPortal goBack={() => setActiveFeature(null)} />;
  if (activeFeature === 'CareerStatus') return <CareerStatus goBack={() => setActiveFeature(null)} />;
  if (activeFeature === 'TigerDining') return <TigerDining goBack={() => setActiveFeature(null)} />;

  return (
    <div className="main-menu" style={{ width: '100%', maxWidth: '600px' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back</button>
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