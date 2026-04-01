import React, { useState, useEffect } from 'react';

function CampusCalendar({ goBack }) {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchCampusEvents = async () => {
      try {
        const response = await fetch('https://comp-4710.onrender.com/api/campus-calendar');
        const data = await response.json();
        
        console.log("Debug - Received Data:", data);

        // UNIVERSAL FINDER: Look for 'events' property, 
        // but fallback to the raw data if the API returned a naked array
        let eventList = [];
        if (data && data.events && Array.isArray(data.events)) {
          eventList = data.events;
        } else if (Array.isArray(data)) {
          eventList = data;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const seenTitles = new Set();
        const uniqueUpcoming = eventList
          .map(item => {
            // Support both nested 'event' object and flat object
            const e = item.event ? item.event : item;
            return {
              id: e.id,
              title: e.title,
              date: e.first_date || e.start, 
              location: e.location_name || e.location || 'Auburn University',
            };
          })
          .filter(e => {
            if (!e.title || !e.date) return false;
            const eventDate = new Date(e.date);
            const isFuture = eventDate >= today;
            const isNew = !seenTitles.has(e.title.trim());
            if (isFuture && isNew) {
              seenTitles.add(e.title.trim());
              return true;
            }
            return false;
          });

        uniqueUpcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(uniqueUpcoming);
      } catch (error) {
        console.error("Frontend Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampusEvents();
  }, []);

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedEvents = filteredEvents.slice(0, visibleCount);

  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back</button>
      <h2 style={{color: '#03244D', marginTop: 0}}>Campus Calendar</h2>
      
      <input 
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setVisibleCount(10);
        }}
        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '20px', boxSizing: 'border-box' }}
      />
      
      {loading ? <p>Loading live events...</p> : (
        <div style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '20px', marginLeft: '10px' }}>
          {filteredEvents.length === 0 ? (
            <p>No upcoming events found.</p>
          ) : (
            <>
              {displayedEvents.map(event => (
                <div key={event.id} style={{ marginBottom: '20px' }}>
                  <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 'bold' }}>
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h3 style={{ margin: '5px 0 5px 0', color: '#03244D', fontSize: '1.1rem' }}>{event.title}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#475569' }}>📍 {event.location}</div>
                  </div>
                </div>
              ))}
              {visibleCount < filteredEvents.length && (
                <button onClick={() => setVisibleCount(prev => prev + 10)} style={{ width: '100%', padding: '12px', backgroundColor: '#03244D', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  Load More Events ↓
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CampusCalendar;