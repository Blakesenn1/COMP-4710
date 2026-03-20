import React, { useState, useEffect } from 'react';

function RateMyProfessor({ goBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);
  
  const [resultsList, setResultsList] = useState([]); // NEW: Holds multiple search results
  const [profData, setProfData] = useState(null); // Holds the single selected professor
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // --- 1. LIVE AUTOCOMPLETE (DEBOUNCED) ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length >= 2 && !profData) {
        setIsSearchingSuggestions(true);
        try {
          const response = await fetch(`https://comp-4710.onrender.com/api/rmp?name=${encodeURIComponent(searchTerm)}`);
          if (response.ok) {
            const data = await response.json();
            // Safety check to ensure the backend actually returned a list
            if (Array.isArray(data)) {
              setSuggestions(data.slice(0, 5));
            }
          }
        } catch (err) {
          console.error("Autocomplete fetch error (Server might be waking up):", err);
        } finally {
          setIsSearchingSuggestions(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, profData]);

  // --- 2. MAIN SEARCH FUNCTION ---
  const handleSearch = async (selectedProf = null) => {
    // Clear previous UI states
    setSuggestions([]);
    setError("");

    // SCENARIO A: They clicked a specific professor from the dropdown or the results list
    if (selectedProf) {
      setSearchTerm(`${selectedProf.firstName} ${selectedProf.lastName}`);
      setResultsList([]); // Hide the list
      setProfData({
        name: `${selectedProf.firstName} ${selectedProf.lastName}`,
        department: selectedProf.department,
        rating: selectedProf.avgRating,
        difficulty: selectedProf.avgDifficulty,
        numRatings: selectedProf.numRatings
      });
      return;
    }

    // SCENARIO B: They typed a partial name (like "gerr") and clicked the Search button
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setProfData(null);
    setResultsList([]);

    try {
      const response = await fetch(`https://comp-4710.onrender.com/api/rmp?name=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        if (data.length === 1) {
          // Exactly one match found, show the card immediately
          const prof = data[0]; 
          setProfData({
            name: `${prof.firstName} ${prof.lastName}`,
            department: prof.department,
            rating: prof.avgRating,
            difficulty: prof.avgDifficulty,
            numRatings: prof.numRatings
          });
        } else {
          // Multiple matches found! Show a list so they can pick.
          setResultsList(data);
        }
      } else {
        setError(`No Auburn professors found matching "${searchTerm}".`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Could not connect to the database. The Render server might be waking up, please try again in 30 seconds.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        <button className="back-button" onClick={goBack} style={{ margin: 0 }}>
          &larr; Back to Academics & Career
        </button>
      </div>
      
      <h2 style={{color: '#03244D', width: '100%', textAlign: 'left', marginTop: '0'}}>Rate My Professor</h2>
      <p style={{ color: '#555', width: '100%', textAlign: 'left', marginBottom: '25px' }}>
        Search any Auburn professor by first name, last name, or both.
      </p>

      {/* --- Search Interface --- */}
      <div style={{ width: '100%', display: 'flex', gap: '10px', marginBottom: '30px', position: 'relative' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            placeholder="e.g., Gerr..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setProfData(null); 
              setResultsList([]);
            }}
            onKeyDown={handleKeyDown}
            style={{ width: '100%', boxSizing: 'border-box', padding: '15px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
          />

          {isSearchingSuggestions && (
            <div style={{ position: 'absolute', right: '15px', top: '18px', fontSize: '0.8rem', color: '#888' }}>
              Searching...
            </div>
          )}

          {/* AUTOCOMPLETE DROPDOWN */}
          {suggestions.length > 0 && (
            <div style={{ 
              position: 'absolute', top: '100%', left: 0, right: 0, 
              backgroundColor: 'white', border: '1px solid #03244D', borderTop: 'none',
              borderRadius: '0 0 4px 4px', zIndex: 10, overflow: 'hidden',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)' 
            }}>
              {suggestions.map((prof, index) => (
                <div 
                  key={index} 
                  onClick={() => handleSearch(prof)} 
                  style={{ padding: '12px 15px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <strong style={{color: '#03244D'}}>{prof.firstName} {prof.lastName}</strong>
                  <span style={{fontSize: '0.8rem', color: '#666', background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px'}}>
                    {prof.department}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={() => handleSearch()} 
          disabled={isLoading}
          style={{ 
            padding: '0 25px', height: '52px',
            backgroundColor: isLoading ? '#ccc' : '#DD550C', 
            color: 'white', border: 'none', borderRadius: '4px', 
            cursor: isLoading ? 'not-allowed' : 'pointer', 
            fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.2s'
          }}
        >
          {isLoading ? '...' : 'Search'}
        </button>
      </div>

      {/* --- Loading & Error States --- */}
      {isLoading && (
        <div style={{ padding: '40px', textAlign: 'center', color: '#03244D' }}>
          <h3>🔄 Waking up database... (This may take 30s)</h3>
        </div>
      )}

      {error && !isLoading && (
        <div style={{ padding: '20px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '4px', width: '100%', textAlign: 'center', border: '1px solid #f87171' }}>
          <strong>{error}</strong>
        </div>
      )}

      {/* --- MULTIPLE RESULTS LIST (If they search a partial name) --- */}
      {resultsList.length > 0 && !isLoading && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{color: '#03244D', margin: '0 0 10px 0', textAlign: 'left'}}>Select a Professor:</h3>
          {resultsList.map((prof, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(prof)}
              style={{
                background: 'white', border: '1px solid #e2e8f0', padding: '15px',
                borderRadius: '4px', textAlign: 'left', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#03244D'; e.currentTarget.style.transform = 'translateX(5px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateX(0)'; }}
            >
              <span style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#03244D'}}>{prof.firstName} {prof.lastName}</span>
              <span style={{fontSize: '0.85rem', color: '#64748b'}}>{prof.department}</span>
            </button>
          ))}
        </div>
      )}

      {/* --- SINGLE PROFESSOR ID CARD --- */}
      {profData && !isLoading && (
        <div style={{ width: '100%', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <div style={{ backgroundColor: '#03244D', color: 'white', padding: '20px', textAlign: 'left' }}>
            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>{profData.name}</h2>
            <p style={{ margin: '5px 0 0 0', color: '#cbd5e1', fontWeight: 'normal' }}>{profData.department}</p>
          </div>
          
          <div style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '25px' }}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '3rem', color: '#03244D' }}>{profData.rating}<span style={{fontSize:'1.2rem', color:'#888'}}>/5</span></h3>
                <span style={{fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px'}}>Overall Quality</span>
              </div>
              <div style={{ width: '2px', backgroundColor: '#e2e8f0' }}></div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '3rem', color: '#DD550C' }}>{profData.difficulty}<span style={{fontSize:'1.2rem', color:'#888'}}>/5</span></h3>
                <span style={{fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px'}}>Difficulty</span>
              </div>
            </div>
            
            <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '4px', borderLeft: '4px solid #DD550C', textAlign: 'left' }}>
              <p style={{ margin: 0, color: '#334155', fontSize: '0.9rem' }}>
                Based on <strong>{profData.numRatings}</strong> authentic student ratings from RateMyProfessors.com.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RateMyProfessor;