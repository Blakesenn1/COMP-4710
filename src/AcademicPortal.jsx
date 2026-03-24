import React, { useState, useEffect } from 'react';

function AcademicPortal({ goBack }) {
  // Setup & Data States
  const [tokenInput, setTokenInput] = useState('');
  const [isLinked, setIsLinked] = useState(false);
  const [liveClasses, setLiveClasses] = useState([]);
  const [userName, setUserName] = useState(''); // NEW: Stores the user's name
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // Class Detail States
  const [selectedClass, setSelectedClass] = useState(null);
  
  // Upcoming Assignments States
  const [assignments, setAssignments] = useState([]);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(false);

  // 1. CHECK LOCAL STORAGE ON LOAD
  useEffect(() => {
    const savedToken = localStorage.getItem('auburnCanvasToken');
    if (savedToken) {
      setIsLinked(true);
      fetchLiveGrades(savedToken);
    }
  }, []);

  // 2. FETCH LIVE DATA (Classes + User Profile)
  const fetchLiveGrades = async (tokenToUse) => {
    setIsLoading(true);
    setFetchError('');

    try {
      // Fetch Classes
      const courseResponse = await fetch('https://comp-4710.onrender.com/api/canvas/courses', {
        headers: { 'Authorization': `Bearer ${tokenToUse}` }
      });

      if (!courseResponse.ok) throw new Error("Invalid token or Canvas is down.");
      const rawCourses = await courseResponse.json();

      const formattedClasses = rawCourses.map(course => {
        const enrollment = course.enrollments[0];
        return {
          id: course.course_code.split(' ')[0] || "CLASS", 
          canvasId: course.id, 
          name: course.name || "Unnamed Course",
          letter: enrollment.computed_current_grade || '--', 
          currentPercent: enrollment.computed_current_score || 100 
        };
      });

      setLiveClasses(formattedClasses);

      // Fetch User Name
      try {
        const userResponse = await fetch('https://comp-4710.onrender.com/api/canvas/user', {
          headers: { 'Authorization': `Bearer ${tokenToUse}` }
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          // Split the name to just grab the first name (e.g. "Blake" from "Blake Senn")
          const firstName = userData.name.split(' ')[0];
          setUserName(firstName);
        }
      } catch (userErr) {
        console.error("Could not fetch user name, skipping.");
      }

      setIsLinked(true);
      localStorage.setItem('auburnCanvasToken', tokenToUse); 

    } catch (err) {
      setFetchError("Could not connect. Ensure your token is correct and Render is awake.");
      localStorage.removeItem('auburnCanvasToken');
      setIsLinked(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. FETCH ASSIGNMENTS WHEN A CLASS IS CLICKED
  useEffect(() => {
    if (selectedClass && selectedClass.canvasId) {
      const fetchAssignments = async () => {
        setIsLoadingAssignments(true);
        try {
          const token = localStorage.getItem('auburnCanvasToken');
          const response = await fetch(`https://comp-4710.onrender.com/api/canvas/courses/${selectedClass.canvasId}/assignments`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.ok) {
            const data = await response.json();
            const upcoming = data.filter(a => a.due_at).slice(0, 4);
            setAssignments(upcoming);
          }
        } catch (error) {
          console.error("Failed to fetch assignments");
        } finally {
          setIsLoadingAssignments(false);
        }
      };
      fetchAssignments();
    }
  }, [selectedClass]);

  const handleConnect = () => {
    if (tokenInput.trim().length < 10) {
      setFetchError("Please enter a valid Canvas Access Token.");
      return;
    }
    fetchLiveGrades(tokenInput.trim());
  };

  const disconnectCanvas = () => {
    localStorage.removeItem('auburnCanvasToken');
    setIsLinked(false);
    setLiveClasses([]);
    setUserName('');
    setSelectedClass(null);
  };

  // THE COLOR LOGIC ENGINE
  const getUrgencyColors = (dueDateString) => {
    const now = new Date();
    const due = new Date(dueDateString);
    const diffHours = (due - now) / (1000 * 60 * 60);

    if (diffHours <= 24) {
      return { bg: '#fef2f2', border: '#f87171', text: '#dc2626', label: 'URGENT' }; 
    } else if (diffHours <= 48) {
      return { bg: '#fff7ed', border: '#fb923c', text: '#ea580c', label: 'SOON' }; 
    } else if (diffHours <= 72) {
      return { bg: '#fefce8', border: '#facc15', text: '#ca8a04', label: 'UPCOMING' }; 
    } else {
      return { bg: '#f0fdf4', border: '#4ade80', text: '#16a34a', label: 'ON TRACK' }; 
    }
  };

  // ==========================================
  // VIEW 1: SETUP SCREEN
  // ==========================================
  if (!isLinked) {
    return (
      <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back</button>
        <h2 style={{color: '#03244D', marginTop: 0}}>Academic Portal</h2>
        
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, color: '#03244D' }}>Connect Your Canvas</h3>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.5' }}>
            To view live grades and upcoming assignments, generate a secure Access Token from Auburn Canvas.
          </p>
          
          <ol style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '25px', paddingLeft: '20px' }}>
            <li>Log into Canvas on a browser.</li>
            <li>Go to <strong>Account</strong> &rarr; <strong>Settings</strong>.</li>
            <li>Scroll down and click <strong>+ New Access Token</strong>.</li>
            <li>Paste the generated token below.</li>
          </ol>

          <input 
            type="password" placeholder="Paste Token Here" value={tokenInput} onChange={(e) => setTokenInput(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', padding: '15px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '15px' }}
          />

          <button 
            onClick={handleConnect} disabled={isLoading}
            style={{ width: '100%', padding: '15px', backgroundColor: isLoading ? '#ccc' : '#DD550C', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer' }}
          >
            {isLoading ? 'Connecting to Canvas...' : 'Secure Connect'}
          </button>
          
          {fetchError && <p style={{ color: '#dc2626', fontWeight: 'bold', marginTop: '15px', textAlign: 'center' }}>{fetchError}</p>}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: COURSE DETAILS & ASSIGNMENTS
  // ==========================================
  if (selectedClass) {
    return (
      <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <button className="back-button" onClick={() => { setSelectedClass(null); setAssignments([]); }} style={{ marginBottom: '20px' }}>
          &larr; Back to Dashboard
        </button>
        
        <h2 style={{color: '#03244D', textAlign: 'left', marginTop: '0', marginBottom: '5px'}}>{selectedClass.id}</h2>
        <p style={{ color: '#64748b', textAlign: 'left', marginTop: '0', marginBottom: '30px' }}>{selectedClass.name}</p>

        {/* Current Grade Card */}
        <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Grade</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#03244D' }}>{selectedClass.currentPercent}%</div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#DD550C' }}>{selectedClass.letter}</div>
        </div>

        {/* ================== UPCOMING ASSIGNMENTS ================== */}
        <h3 style={{color: '#03244D', textAlign: 'left', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px'}}>Upcoming Assignments</h3>
        
        {isLoadingAssignments ? (
          <p style={{ color: '#64748b', textAlign: 'left' }}>Scanning Canvas for upcoming assignments...</p>
        ) : assignments.length === 0 ? (
          <div style={{ padding: '20px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#16a34a', textAlign: 'center', marginBottom: '40px' }}>
            <strong>All clear!</strong> No upcoming assignments found.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
            {assignments.map((assignment) => {
              const colors = getUrgencyColors(assignment.due_at);
              const dueDateObj = new Date(assignment.due_at);
              const formattedDate = dueDateObj.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
              const formattedTime = dueDateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

              return (
                <div key={assignment.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', border: `1px solid #e2e8f0`, borderLeft: `6px solid ${colors.border}`, padding: '15px', borderRadius: '8px', textAlign: 'left' }}>
                  <div style={{ paddingRight: '15px' }}>
                    <div style={{ fontWeight: 'bold', color: '#03244D', marginBottom: '4px', fontSize: '1rem' }}>{assignment.name}</div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Due: {formattedDate} at {formattedTime}</div>
                  </div>
                  <div style={{ backgroundColor: colors.bg, color: colors.text, padding: '5px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                    {colors.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW 3: LIVE DASHBOARD
  // ==========================================
  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button className="back-button" onClick={goBack} style={{ margin: 0 }}>&larr; Back to Hub</button>
        <button onClick={disconnectCanvas} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.85rem' }}>Disconnect Canvas</button>
      </div>
      
      <h2 style={{color: '#03244D', width: '100%', textAlign: 'left', marginTop: '0', marginBottom: '25px'}}>Academic Portal</h2>

      {/* DYNAMIC HEADER BASED ON USER NAME */}
      <p style={{ color: '#64748b', width: '100%', textAlign: 'left', fontWeight: 'bold', marginBottom: '10px' }}>
        {userName ? `${userName}'s Classes` : 'Live Classes'} (Tap to view details)
      </p>

      {isLoading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#03244D' }}><h3>Fetching from Canvas...</h3></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {liveClasses.length === 0 ? (
             <div style={{ padding: '30px', textAlign: 'center', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#64748b' }}>
               No active classes with grades found on your Canvas account.
             </div>
          ) : (
            liveClasses.map((cls, index) => (
              <div 
                key={index} onClick={() => setSelectedClass(cls)}
                style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderBottom: index === liveClasses.length - 1 ? '1px solid #e2e8f0' : 'none', borderRadius: index === 0 ? '8px 8px 0 0' : index === liveClasses.length - 1 ? '0 0 8px 8px' : '0', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: '#DD550C', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '4px' }}>{cls.id}</div>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{cls.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#03244D', fontWeight: '900', fontSize: '1.5rem' }}>{cls.letter}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{cls.currentPercent}%</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AcademicPortal;