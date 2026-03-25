import React, { useState } from 'react';

const academicData = [
  { id: 1, title: 'Summer/Fall Registration Begins', date: '2026-04-06', time: '8:00 AM', location: 'AU Access', category: 'Registration', description: 'Priority registration time tickets begin opening.' },
  { id: 2, title: 'Last Day to Withdraw (W Grade)', date: '2026-04-17', time: '11:59 PM', location: 'Online', category: 'Deadline', description: 'Final University deadline to withdraw from a course with no grade penalty.' },
  { id: 3, title: 'Final Day of Spring Classes', date: '2026-04-24', time: 'All Day', location: 'Campus-wide', category: 'Term Dates', description: 'Last day of classes before Finals begin.' },
  { id: 4, title: 'Spring Final Exam Period', date: '2026-04-27', time: 'Starts', location: 'Campus-wide', category: 'Term Dates', description: 'Check your specific exam times in AU Access.' },
  { id: 5, title: 'Spring 2026 Commencement', date: '2026-05-01', time: 'TBA', location: 'Neville Arena', category: 'Graduation', description: 'Graduation ceremonies begin for the Class of 2026!' },
  { id: 6, title: 'Summer Semester Begins', date: '2026-05-18', time: '8:00 AM', location: 'Campus-wide', category: 'Term Dates', description: 'First day of classes for Summer Full Term.' },
  { id: 7, title: 'Summer Drop Fee Penalty Begins', date: '2026-05-20', time: '12:01 AM', location: 'Online', category: 'Fees', description: 'Dropping a course now results in a $100 Drop Fee per course.' },
  { id: 8, title: 'Fall 2026 Classes Begin', date: '2026-08-17', time: '8:00 AM', location: 'Campus-wide', category: 'Term Dates', description: 'Official start of the Fall 2026 academic year.' },
  { id: 9, title: 'Fall 15th Class Day', date: '2026-09-04', time: '5:00 PM', location: 'Online', category: 'Deadline', description: 'Last day to drop with no grade assignment or fee penalty.' }
];

const categories = ['All', 'Deadline', 'Registration', 'Term Dates', 'Graduation', 'Fees'];

function AcademicCalendar({ goBack }) {
  const [filter, setFilter] = useState('All');
  const filteredEvents = academicData.filter(e => filter === 'All' || e.category === filter);

  const getColor = (cat) => {
    switch(cat) {
      case 'Deadline': return '#ef4444'; // Red for urgency
      case 'Registration': return '#03244D'; // Auburn Blue
      case 'Term Dates': return '#16a34a'; // Green
      case 'Graduation': return '#DD550C'; // Auburn Orange
      case 'Fees': return '#9333ea'; // Purple
      default: return '#64748b';
    }
  };

  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back to Academics</button>
      <h2 style={{color: '#03244D', margin: '0 0 5px 0'}}>Academic Calendar</h2>
      <p style={{ color: '#64748b', marginBottom: '25px' }}>Official University deadlines and term dates.</p>
      
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
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AcademicCalendar;