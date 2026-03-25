import React, { useState } from 'react';

const campusData = [
  { id: 1, title: 'From Southern Roots to Global Change', date: '2026-03-24', time: '11:00 AM', location: 'Melton Student Center', category: 'Social', description: 'Conference on ending cancer for women.' },
  { id: 2, title: 'UPC: Movie on the Lawn', date: '2026-03-24', time: '7:00 PM', location: 'Cater Lawn', category: 'Social', description: 'Free movie night under the stars!' },
  { id: 3, title: 'Girls Who Lift Tabling', date: '2026-03-25', time: '10:00 AM', location: 'Haley Concourse', category: 'Involvement', description: 'Meet the team and learn about campus fitness.' },
  { id: 4, title: 'Tiger Giving Day Promotion', date: '2026-03-25', time: '11:00 AM', location: 'Roosevelt Concourse', category: 'Service', description: 'Support student-led fundraising projects.' },
  { id: 5, title: 'Big Man on Campus', date: '2026-03-25', time: '7:00 PM', location: 'Student Activities Center', category: 'Social', description: 'Annual philanthropy competition and showcase.' },
  { id: 6, title: 'Ragamala Dance Performance', date: '2026-03-25', time: '7:00 PM', location: 'Gogue Center', category: 'Arts', description: 'Stunning cultural performance: "Children of Dharma".' },
  { id: 7, title: 'ISO: World Fair', date: '2026-03-26', time: '5:00 PM', location: 'Student Activities Center', category: 'Career', description: 'Explore global cultures through food and exhibits.' },
  { id: 8, title: 'UPC: Open Mic Night', date: '2026-03-26', time: '6:00 PM', location: 'Melton Student Center', category: 'Arts', description: 'Live student performances and music.' },
  { id: 9, title: 'UPC: Lego Party', date: '2026-04-01', time: '7:00 PM', location: 'Melton Student Center', category: 'Social', description: 'Massive de-stress building night.' },
  { id: 10, title: 'The 2026 Involvement Awards', date: '2026-04-07', time: '6:00 PM', location: 'Student Activities Center', category: 'Involvement', description: 'Celebrating student leaders and organizations.' },
  { id: 11, title: 'Broadway: Mrs. Doubtfire', date: '2026-04-09', time: '7:00 PM', location: 'Gogue Center', category: 'Arts', description: 'The hit musical live on the Gogue stage.' },
  { id: 12, title: 'Rodney Atkins Live', date: '2026-04-17', time: '7:00 PM', location: 'Gogue Center', category: 'Arts', description: 'Country music performance at Woltosz Theatre.' },
  { id: 13, title: 'Peppa Pig: My First Concert', date: '2026-04-19', time: '3:00 PM', location: 'Gogue Center', category: 'Social', description: 'Family-friendly fun at the performing arts center.' },
  { id: 14, title: 'Handshake Tips & Tricks', date: '2026-04-23', time: '9:00 AM', location: '136 Foy Hall', category: 'Career', description: 'Professional workshop for landing internships.' },
  { id: 15, title: 'Little River Band', date: '2026-04-24', time: '7:00 PM', location: 'Ham Amphitheatre', category: 'Arts', description: 'Outdoor concert series kickoff.' },
  { id: 16, title: 'Travis Tritt Outdoor Concert', date: '2026-05-16', time: '7:00 PM', location: 'Ham Amphitheatre', category: 'Arts', description: 'Country music under the stars.' },
  { id: 17, title: 'Steep Canyon Rangers', date: '2026-05-21', time: '7:00 PM', location: 'Ham Amphitheatre', category: 'Arts', description: 'Bluegrass performance at the Gogue.' },
  { id: 18, title: 'International Orientation (Summer)', date: '2026-05-27', time: 'All Day', location: 'Student Center', category: 'Involvement', description: 'Welcoming new international students.' },
  { id: 19, title: 'SIX: The Musical', date: '2026-05-30', time: '2:00 PM', location: 'Gogue Center', category: 'Arts', description: 'Broadway series performance.' },
  { id: 20, title: 'Summer Movie Night Series', date: '2026-06-12', time: '8:00 PM', location: 'Campus Green', category: 'Social', description: 'Kickoff of the Summer movie series.' },
  { id: 21, title: 'Juneteenth Celebration', date: '2026-06-19', time: 'All Day', location: 'Campus-wide', category: 'Service', description: 'University observance and local community events.' },
  { id: 22, title: 'Broadway: Kinky Boots', date: '2026-06-26', time: '7:00 PM', location: 'Gogue Center', category: 'Arts', description: 'Award-winning musical performance.' },
  { id: 23, title: 'Summer Rec Sports Jam', date: '2026-07-15', time: '5:00 PM', location: 'The Rec', category: 'Social', description: 'Summer intramural showcase and games.' },
  { id: 24, title: 'Fall Move-In Block Party', date: '2026-08-11', time: '6:00 PM', location: 'The Village', category: 'Social', description: 'Welcoming everyone back to the Plains!' },
  { id: 25, title: 'Fall Involvement Fair', date: '2026-08-20', time: '11:00 AM', location: 'Haley Concourse', category: 'Involvement', description: 'The biggest organization recruitment event of the year.' },
  { id: 26, title: 'Bluey\'s Big Play', date: '2026-08-25', time: '6:00 PM', location: 'Gogue Center', category: 'Social', description: 'Family-friendly theatrical performance.' }
];

const categories = ['All', 'Social', 'Involvement', 'Service', 'Career', 'Arts'];

function CampusCalendar({ goBack }) {
  const [filter, setFilter] = useState('All');
  const filteredEvents = campusData.filter(e => filter === 'All' || e.category === filter);

const getColor = (cat) => {
  switch(cat) {
    case 'Social': return '#DD550C';       // Auburn Orange
    case 'Involvement': return '#03244D';  // Auburn Blue
    case 'Career': return '#0284c7';       // Sky Blue
    case 'Service': return '#16a34a';      // Green
    case 'Arts': return '#9333ea';         // Purple
    default: return '#64748b';
  }
};

  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back to Campus Life</button>
      <h2 style={{color: '#03244D', margin: '0 0 5px 0'}}>Campus Calendar</h2>
      <p style={{ color: '#64748b', marginBottom: '25px' }}>Explore student events, involvement opportunities, career workshops, and arts happenings.</p>
      
      <div style={{ display: 'flex', gap: '8px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '10px' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid', borderColor: filter === cat ? getColor(cat) : '#e2e8f0', backgroundColor: filter === cat ? getColor(cat) : 'white', color: filter === cat ? 'white' : '#64748b', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>{cat}</button>
        ))}
      </div>

      <div style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '20px', marginLeft: '10px' }}>
        {filteredEvents.map(event => (
          <div key={event.id} style={{ position: 'relative', marginBottom: '20px' }}>
            <div style={{ position: 'absolute', left: '-31px', top: '5px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', border: `4px solid ${getColor(event.category)}` }}></div>
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ color: getColor(event.category), fontSize: '0.75rem', fontWeight: 'bold' }}>{event.category}</span>
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold' }}>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <h3 style={{ margin: '0 0 5px 0', color: '#03244D', fontSize: '1.1rem' }}>{event.title}</h3>
              <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '5px' }}>📍 {event.location} • {event.time}</div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CampusCalendar;