import React from 'react';

function AcademicPortal({ goBack }) {
  const currentClasses = [
    { id: 'COMP4710', name: 'Senior Design Project', time: 'MWF 1:00 PM', room: 'Shelby 1103', grade: 'A' },
    { id: 'COMP4320', name: 'Secure Software Process', time: 'MWF 10:00 AM', room: 'Broun 238', grade: 'A' },
    { id: 'COMP3220', name: 'Formal Languages', time: 'TR 9:30 AM', room: 'Haley 3122', grade: 'B+' },
    { id: 'COMP5000', name: 'Cloud Computing', time: 'TR 12:30 PM', room: 'Shelby 2115', grade: 'A-' }
  ];

  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <button className="back-button" onClick={goBack}>&larr; Back</button>
      <h2 style={{color: '#03244D', marginTop: '20px'}}>Academic Portal</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
        <div style={{ backgroundColor: '#03244D', color: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>GPA</span>
          <h1 style={{ margin: 0 }}>3.84</h1>
        </div>
        <div style={{ backgroundColor: 'white', border: '2px solid #e2e8f0', padding: '20px', borderRadius: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Standing</span>
          <h3 style={{ margin: 0, color: '#16a34a' }}>Good</h3>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        {currentClasses.map((course) => (
          <div key={course.id} style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 'bold', color: '#DD550C' }}>{course.id}</div>
              <div style={{ fontSize: '0.9rem' }}>{course.name}</div>
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{course.grade}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AcademicPortal;