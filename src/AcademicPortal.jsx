import React, { useState, useEffect } from 'react';

function AcademicPortal({ goBack }) {
  // Setup & Data States
  const [tokenInput, setTokenInput] = useState('');
  const [isLinked, setIsLinked] = useState(false);
  const [liveClasses, setLiveClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // Grade Rescue States
  const [selectedClass, setSelectedClass] = useState(null);
  const [targetGrade, setTargetGrade] = useState('');
  const [finalWeight, setFinalWeight] = useState('');
  const [calcResult, setCalcResult] = useState(null);
  const [calcError, setCalcError] = useState('');

  // 1. CHECK LOCAL STORAGE ON LOAD
  useEffect(() => {
    const savedToken = localStorage.getItem('auburnCanvasToken');
    if (savedToken) {
      setIsLinked(true);
      fetchLiveGrades(savedToken);
    }
  }, []);

  // 2. FETCH LIVE DATA FROM RENDER BACKEND
  const fetchLiveGrades = async (tokenToUse) => {
    setIsLoading(true);
    setFetchError('');

    try {
      const response = await fetch('https://comp-4710.onrender.com/api/canvas/courses', {
        headers: { 'Authorization': `Bearer ${tokenToUse}` }
      });

      if (!response.ok) {
        throw new Error("Invalid token or Canvas is down.");
      }

      const rawCourses = await response.json();

      // Format the raw Canvas data into our clean UI format
      const formattedClasses = rawCourses.map(course => {
        const enrollment = course.enrollments[0];
        return {
          id: course.course_code.split(' ')[0] || "CLASS", // Gets "COMP4710" from full string
          name: course.name || "Unnamed Course",
          // Sometimes professors hide letters, fallback to percentage or "N/A"
          letter: enrollment.computed_current_grade || '--', 
          currentPercent: enrollment.computed_current_score || 100 
        };
      });

      setLiveClasses(formattedClasses);
      setIsLinked(true);
      // Save valid token to the phone so they don't have to log in again!
      localStorage.setItem('auburnCanvasToken', tokenToUse); 

    } catch (err) {
      setFetchError("Could not connect. Ensure your token is correct and Render is awake.");
      localStorage.removeItem('auburnCanvasToken'); // Wipe bad token
      setIsLinked(false);
    } finally {
      setIsLoading(false);
    }
  };

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
    setSelectedClass(null);
  };

  // Grade Rescue Math
  const calculateRequiredScore = () => {
    setCalcError('');
    setCalcResult(null);

    const target = parseFloat(targetGrade);
    const weightPercent = parseFloat(finalWeight);

    if (isNaN(target) || isNaN(weightPercent) || weightPercent <= 0 || weightPercent >= 100) {
      setCalcError('Please enter valid numbers.');
      return;
    }

    const current = selectedClass.currentPercent;
    const weight = weightPercent / 100;
    const requiredScore = (target - (current * (1 - weight))) / weight;
    
    setCalcResult(requiredScore.toFixed(1));
  };

  // ==========================================
  // VIEW 1: SETUP SCREEN (No Token Found)
  // ==========================================
  if (!isLinked) {
    return (
      <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back</button>
        <h2 style={{color: '#03244D', marginTop: 0}}>Academic Portal</h2>
        
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, color: '#03244D' }}>Connect Your Canvas</h3>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.5' }}>
            To view live grades and use the Grade Rescue Engine, generate a secure Access Token from Auburn Canvas.
          </p>
          
          <ol style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '25px', paddingLeft: '20px' }}>
            <li>Log into Canvas on a browser.</li>
            <li>Go to <strong>Account</strong> &rarr; <strong>Settings</strong>.</li>
            <li>Scroll down and click <strong>+ New Access Token</strong>.</li>
            <li>Paste the generated token below.</li>
          </ol>

          <input 
            type="password" 
            placeholder="Paste Token Here (e.g. 1162~abcd...)" 
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
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
  // VIEW 2: GRADE RESCUE CALCULATOR
  // ==========================================
  if (selectedClass) {
    return (
      <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <button className="back-button" onClick={() => { setSelectedClass(null); setCalcResult(null); setTargetGrade(''); setFinalWeight(''); }} style={{ marginBottom: '20px' }}>
          &larr; Back to Dashboard
        </button>
        
        <h2 style={{color: '#03244D', textAlign: 'left', marginTop: '0', marginBottom: '5px'}}>{selectedClass.id}</h2>
        <p style={{ color: '#64748b', textAlign: 'left', marginTop: '0', marginBottom: '30px' }}>{selectedClass.name}</p>

        <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Grade</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#03244D' }}>{selectedClass.currentPercent}%</div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#DD550C' }}>{selectedClass.letter}</div>
        </div>

        <h3 style={{color: '#03244D', textAlign: 'left', marginBottom: '15px'}}>Grade Rescue Engine</h3>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '8px' }}>Target Grade (%)</label>
            <input 
              type="number" placeholder="e.g. 90" value={targetGrade} onChange={(e) => setTargetGrade(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '8px' }}>Final Exam Weight (%)</label>
            <input 
              type="number" placeholder="e.g. 20" value={finalWeight} onChange={(e) => setFinalWeight(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <button 
          onClick={calculateRequiredScore}
          style={{ width: '100%', padding: '15px', backgroundColor: '#DD550C', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' }}
        >
          Calculate Required Score
        </button>

        {calcError && <p style={{ color: '#dc2626', fontWeight: 'bold' }}>{calcError}</p>}

        {calcResult !== null && (
          <div style={{ padding: '20px', borderRadius: '8px', border: '2px solid', borderColor: calcResult > 100 ? '#f87171' : calcResult < 0 ? '#4ade80' : '#03244D', backgroundColor: calcResult > 100 ? '#fef2f2' : calcResult < 0 ? '#f0fdf4' : 'white', textAlign: 'center' }}>
            <p style={{ margin: '0 0 10px 0', color: '#475569', fontWeight: 'bold' }}>You need to score at least:</p>
            <h2 style={{ margin: 0, fontSize: '3rem', color: calcResult > 100 ? '#dc2626' : '#03244D' }}>{calcResult}%</h2>
            <p style={{ margin: '10px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
              {calcResult > 100 ? "Uh oh. You might need extra credit." : calcResult < 0 ? "You could get a 0 and still hit your target!" : "Totally doable. Time to study!"}
            </p>
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
      
      <h2 style={{color: '#03244D', width: '100%', textAlign: 'left', marginTop: '0', marginBottom: '25px'}}>Live Academic Portal</h2>

      <p style={{ color: '#64748b', width: '100%', textAlign: 'left', fontWeight: 'bold', marginBottom: '10px' }}>
        Live Classes (Tap to open Grade Rescue)
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