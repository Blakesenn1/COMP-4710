import React, { useState, useEffect } from 'react';

function AcademicCalendar({ goBack }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        const response = await fetch('https://comp-4710.onrender.com/api/academic-calendar');
        const data = await response.json();
        
        const eventList = data.events || [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const formattedEvents = eventList.map(item => ({
          id: item.event.id,
          title: item.event.title,
          date: item.event.first_date,
          description: item.event.description_text || "Official University Deadline"
        })).filter(e => new Date(e.date) >= today);

        formattedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Academic Fetch Error:", error);
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
      <p style={{ color: '#64748b', marginBottom: '25px', fontSize: '0.9rem' }}>Official University deadlines and term dates.</p>
      
      {loading ? <p>Loading official AU dates...</p> : (
        <div style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '20px', marginLeft: '10px' }}>
          {events.length === 0 ? (
            <p style={{ color: '#64748b' }}>No upcoming deadlines found for the next 120 days.</p>
          ) : (
            <>
              {displayedEvents.map(event => (
                <div key={event.id} style={{ marginBottom: '25px' }}>
                  <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <span style={{ fontSize: '0.85rem', color: '#DD550C', fontWeight: 'bold' }}>
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h3 style={{ margin: '5px 0 5px 0', color: '#03244D', fontSize: '1.1rem' }}>{event.title}</h3>
                  </div>
                </div>
              ))}
              {visibleCount < events.length && (
                <button 
                  onClick={() => setVisibleCount(prev => prev + 15)} 
                  style={{ width: '100%', padding: '12px', backgroundColor: '#DD550C', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Load More Deadlines ↓
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AcademicCalendar;