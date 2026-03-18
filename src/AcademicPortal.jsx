import React from 'react';

function AcademicPortal({ goBack }) {
  // Mock database for the dashboard demo
  const studentData = {
    gpa: "3.84",
    creditsEarned: 102,
    major: "Computer Science",
    academicStanding: "Good"
  };

  const currentClasses = [
    { id: 'COMP4710', name: 'Senior Design Project', time: 'MWF 1:00 PM - 1:50 PM', room: 'Shelby 1103', grade: 'A' },
    { id: 'COMP4320', name: 'Secure Software Process', time: 'MWF 10:00 AM - 10:50 AM', room: 'Broun 238', grade: 'A' },
    { id: 'COMP3220', name: 'Formal Languages', time: 'TR 9:30 AM - 10:45 AM', room: 'Haley 3122', grade: 'B+' },
    { id: 'COMP5000', name: 'Cloud Computing', time: 'TR 12:30 PM - 1:45 PM', room: 'Shelby 2115', grade: 'A-' }
  ];

  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '30px' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '15px' }}>
        <button className="back-button" onClick={goBack}>
          &larr; Back to Academics
        </button>
      </div>
      
      <h2 style={{color: '#03244D', width: '100%', textAlign: 'left', marginTop: '0', marginBottom: '5px'}}>Academic Portal</h2>
      <p style={{ color: '#555', width: '100%', textAlign: 'left', marginBottom: '25px', marginTop: '0' }}>
        Spring 2026 Semester Overview
      </p>

      {/* --- Top Dashboard Widgets --- */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
        
        {/* GPA Widget */}
        <div style={{ backgroundColor: '#03244D', color: 'white', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#cbd5e1', marginBottom: '5px' }}>Cumulative GPA</span>
          <span style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0' }}>{studentData.gpa}</span>
        </div>

        {/* Status Widget */}
        <div style={{ backgroundColor: 'white', border: '2px solid #e2e8f0', padding: '15px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Major</p>
          <p style={{ margin: '0 0 15px 0', color: '#03244D', fontWeight: 'bold' }}>{studentData.major}</p>
          
          <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Standing</p>
          <p style={{ margin: '0', color: '#16a34a', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#16a34a', borderRadius: '50%', display: 'inline-block' }}></span>
            {studentData.academicStanding}
          </p>
        </div>
      </div>

      {/* --- Current Schedule & Grades --- */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
        <div style={{ backgroundColor: '#f8fafc', padding: '15px 20px', borderBottom: '2px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, color: '#03244D', fontSize: '1.1rem' }}>Current Courses</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {currentClasses.map((course, index) => (
            <div key={course.id} style={{ padding: '20px', borderBottom: index !== currentClasses.length - 1 ? '1px solid #e2e8f0' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              {/* Course Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold', color: '#DD550C', fontSize: '1.1rem' }}>{course.id}</span>
                  <span style={{ fontWeight: '600', color: '#03244D', fontSize: '1rem' }}>{course.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: '#64748b' }}>
                  <span>⏱️ {course.time}</span>
                  <span>📍 {course.room}</span>
                </div>
              </div>

              {/* Current Grade Badge */}
              <div style={{ backgroundColor: '#f1f5f9', padding: '10px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center', minWidth: '50px' }}>
                <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '2px' }}>Grade</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#03244D' }}>{course.grade}</span>
              </div>
              
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default AcademicPortal;