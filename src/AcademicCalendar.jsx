import React, { useState, useEffect } from 'react';

function AcademicCalendar({ goBack }) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        const response = await fetch('https://comp-4710.onrender.com/api/academic-calendar');
        const data = await response.json();
        
        // Match the backend! Look for 'sections', not 'events'
        const rawSections = data.sections || [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Process sections: filter out past events and empty sections
        const processedSections = rawSections.map(section => {
          const futureEvents = section.events.filter(event => {
            const eventDate = new Date(event.date_parse);
            // Check if valid date and if it's today or in the future
            return !isNaN(eventDate) && eventDate >= today;
          });

          return {
            ...section,
            events: futureEvents
          };
        }).filter(section => section.events.length > 0);

        setSections(processedSections);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAcademicData();
  }, []);

  return (
    <div className="feature-container" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'left' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back</button>
      <h2 style={{color: '#03244D', marginTop: 0}}>Academic Calendar</h2>
      
      {loading ? <p>Loading official term dates...</p> : (
        <div>
          {sections.length === 0 ? (
             <p style={{ color: '#64748b', fontStyle: 'italic' }}>No upcoming deadlines found.</p>
          ) : (
            sections.map((section, sIndex) => (
              <div key={sIndex} style={{ marginBottom: '40px' }}>
                
                {/* The Semester Header (Mimicking Auburn's Blue Text) */}
                <h3 style={{ 
                  color: '#03244D', 
                  borderBottom: '2px solid #DD550C', 
                  paddingBottom: '8px',
                  fontSize: '1.4rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '20px'
                }}>
                  {section.header}
                </h3>
                
                <div style={{ borderLeft: '3px solid #f2f4f7', paddingLeft: '15px' }}>
                  {section.events.map(event => (
                    <div key={event.id} style={{ marginBottom: '15px', padding: '15px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#DD550C', fontWeight: 'bold' }}>
                        {/* We display the raw text here so "Apr 25-26" looks right */}
                        {event.date_display}
                      </span>
                      <h4 style={{ margin: '5px 0 0 0', color: '#03244D', fontSize: '1.05rem' }}>{event.title}</h4>
                    </div>
                  ))}
                </div>
                
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AcademicCalendar;