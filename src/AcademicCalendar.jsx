import React, { useState, useEffect } from 'react';

function AcademicCalendar({ goBack }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        const response = await fetch('https://comp-4710.onrender.com/api/academic-calendar'); 
        const data = await response.json();
        const now = new Date();
        const upcoming = data.filter(e => (new Date(e.date).getTime() + 86400000) > now.getTime());
        setEvents(upcoming);
      } catch (error) {
        console.error("Failed to load academic data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAcademicData();
  }, []);

  const displayedEvents = events.slice(0, visibleCount);

  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back</button>
      <h2 style={{color: '#03244D', marginTop: 0}}>Academic Calendar</h2>
      
      {loading ? <p>Loading official AU dates...</p> : (
        <div style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '20px', marginLeft: '10px' }}>
          {displayedEvents.map(event => (
            <div key={event.id} style={{ marginBottom: '20px' }}>
              <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.85rem', color: '#DD550C', fontWeight: 'bold' }}>
                   {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <h3 style={{ margin: '5px 0 5px 0', color: '#03244D', fontSize: '1.1rem' }}>{event.title}</h3>
              </div>
            </div>
          ))}
          {visibleCount < events.length && (
            <button onClick={() => setVisibleCount(prev => prev + 10)} style={{ width: '100%', padding: '12px', backgroundColor: '#DD550C', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Load More Deadlines ↓
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AcademicCalendar;