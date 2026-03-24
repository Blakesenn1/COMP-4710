import React, { useState, useEffect } from 'react';

function CareerStatus({ goBack }) {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form States
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Wishlist');

  // Kanban Columns
  const columns = ['Wishlist', 'Applied', 'Interviewing', 'Offer'];

  // Load saved jobs on startup
  useEffect(() => {
    const savedJobs = localStorage.getItem('auburnCareerStatus');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  // Save to local storage whenever jobs array changes
  useEffect(() => {
    localStorage.setItem('auburnCareerStatus', JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = (e) => {
    e.preventDefault();
    if (!company.trim() || !position.trim()) return;

    const newJob = {
      id: Date.now().toString(),
      company: company.trim(),
      position: position.trim(),
      status: status,
      dateAdded: new Date().toLocaleDateString()
    };

    setJobs([...jobs, newJob]);
    setCompany('');
    setPosition('');
    setStatus('Wishlist');
    setIsModalOpen(false);
  };

  const moveJob = (id, direction) => {
    setJobs(jobs.map(job => {
      if (job.id === id) {
        const currentIndex = columns.indexOf(job.status);
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < columns.length) {
          return { ...job, status: columns[newIndex] };
        }
      }
      return job;
    }));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div className="feature-container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <button className="back-button" onClick={goBack} style={{ marginBottom: '15px', margin: 0 }}>&larr; Back to Hub</button>
          <h2 style={{color: '#03244D', marginTop: '15px', marginBottom: '5px'}}>Career Status</h2>
          <p style={{ color: '#64748b', marginTop: 0 }}>Organize and track your active job applications.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: '#DD550C', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginTop: '15px' }}
        >
          + Add Job
        </button>
      </div>

      {/* KANBAN BOARD SECTION */}
      <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '20px' }}>
        {columns.map(col => {
          const columnJobs = jobs.filter(j => j.status === col);
          
          return (
            <div key={col} style={{ flex: '1', minWidth: '260px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
              
              {/* Column Header */}
              <div style={{ padding: '15px', borderBottom: '2px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: '8px 8px 0 0' }}>
                <span style={{ fontWeight: 'bold', color: '#03244D' }}>{col}</span>
                <span style={{ backgroundColor: '#e2e8f0', color: '#475569', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>{columnJobs.length}</span>
              </div>

              {/* Cards Container */}
              <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '300px' }}>
                {columnJobs.map(job => (
                  <div key={job.id} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ margin: '0 0 5px 0', color: '#03244D', fontSize: '1.1rem' }}>{job.company}</h4>
                      <button onClick={() => deleteJob(job.id)} style={{ background: 'none', border: 'none', color: '#03244D', cursor: 'pointer', fontSize: '1.2rem', lineHeight: '1' }} title="Delete">&times;</button>
                    </div>
                    
                    <div style={{ color: '#DD550C', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '10px' }}>{job.position}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Added: {job.dateAdded}</div>

                    {/* Left/Right Move Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                      <button 
                        onClick={() => moveJob(job.id, -1)} 
                        disabled={col === columns[0]}
                        style={{ background: 'none', border: 'none', cursor: col === columns[0] ? 'not-allowed' : 'pointer', color: col === columns[0] ? '#e2e8f0' : '#03244D', fontWeight: 'bold', fontSize: '0.85rem' }}
                      >&larr; Move</button>
                      <button 
                        onClick={() => moveJob(job.id, 1)} 
                        disabled={col === columns[columns.length - 1]}
                        style={{ background: 'none', border: 'none', cursor: col === columns[columns.length - 1] ? 'not-allowed' : 'pointer', color: col === columns[columns.length - 1] ? '#e2e8f0' : '#03244D', fontWeight: 'bold', fontSize: '0.85rem' }}
                      >Move &rarr;</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL FOR ADDING JOBS */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, color: '#03244D', marginBottom: '20px' }}>Add New Application</h3>
            
            <form onSubmit={handleAddJob} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Company Name *</label>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="e.g. Google" />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Job Position *</label>
                <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="e.g. Software Engineer" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Current Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box', backgroundColor: 'white' }}>
                  {columns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '12px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: '#03244D', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Save Job</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default CareerStatus;