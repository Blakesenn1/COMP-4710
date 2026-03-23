import React, { useState, useEffect } from 'react';

function RateMyProfessor({ goBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);
  
  const [resultsList, setResultsList] = useState([]); 
  const [profData, setProfData] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // --- LIVE AUTOCOMPLETE ---
  useEffect(() => {
    const abortController = new AbortController();

    const delayDebounceFn = setTimeout(async () => {
      // THE UI FIX: Only show suggestions if we are NOT currently viewing a result card or list
      if (searchTerm.trim().length >= 2 && !profData && resultsList.length === 0) {
        setIsSearchingSuggestions(true);
        try {
          // SMART FRONTEND: Extract just the last word to avoid RMP's two-word bug
          const nameParts = searchTerm.trim().split(/\s+/);
          const queryWord = nameParts[nameParts.length - 1]; 

          const response = await fetch(
            `https://comp-4710.onrender.com/api/rmp?name=${encodeURIComponent(queryWord)}`, 
            { signal: abortController.signal } 
          );
          
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              // STRICT FRONTEND FILTER: Ensure the results match EVERYTHING the user typed
              const searchTermsLower = nameParts.map(t => t.toLowerCase());
              const exactMatches = data.filter(prof => {
                  const fName = prof.firstName || "";
                  const lName = prof.lastName || "";
                  const fullName = `${fName} ${lName}`.toLowerCase();
                  return searchTermsLower.every(t => fullName.includes(t));
              });
              setSuggestions(exactMatches.slice(0, 5));
            }
          }
        } catch (err) {
          if (err.name !== 'AbortError') console.error("Autocomplete error:", err);
        } finally {
          setIsSearchingSuggestions(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 400); 

    return () => {
      clearTimeout(delayDebounceFn);
      abortController.abort(); 
    };
  }, [searchTerm, profData, resultsList.length]);

  // --- MAIN SEARCH ---
  const handleSearch = async (selectedProf = null) => {
    setSuggestions([]); // THE UI FIX: Instantly self-destruct the dropdown
    setError("");

    // SCENARIO A: They clicked a dropdown suggestion
    if (selectedProf) {
      setSearchTerm(`${selectedProf.firstName} ${selectedProf.lastName}`);
      setResultsList([]); 
      setProfData(selectedProf);
      return;
    }

    // SCENARIO B: They hit the Search button manually
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setProfData(null);
    setResultsList([]);

    try {
      // SMART FRONTEND FIX: Use the last word to cast the net
      const nameParts = searchTerm.trim().split(/\s+/);
      const queryWord = nameParts[nameParts.length - 1]; 

      const response = await fetch(`https://comp-4710.onrender.com/api/rmp?name=${encodeURIComponent(queryWord)}`);
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        // STRICT FILTER
        const searchTermsLower = nameParts.map(t => t.toLowerCase());
        const exactMatches = data.filter(prof => {
            const fName = prof.firstName || "";
            const lName = prof.lastName || "";
            const fullName = `${fName} ${lName}`.toLowerCase();
            return searchTermsLower.every(t => fullName.includes(t));
        });

        if (exactMatches.length === 1) {
          setProfData(exactMatches[0]);
        } else if (exactMatches.length > 1) {
          setResultsList(exactMatches);
        } else {
          // EXPLANATION FIX: Tell the user why new professors are missing
          setError(`No Auburn professors found matching "${searchTerm}". (Note: New professors without student reviews on RMP will not appear).`);
        }
      } else {
        setError(`No Auburn professors found matching "${searchTerm}".`);
      }
    } catch (err) {
      setError("Could not connect to the backend server. The Render instance might be waking up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>
        &larr; Back to Academics
      </button>
      
      <h2 style={{color: '#03244D', textAlign: 'left', marginTop: '0'}}>Rate My Professor</h2>
      <p style={{ color: '#555', textAlign: 'left', marginBottom: '25px' }}>
        Search any Auburn professor by first name, last name, or full name.
      </p>

      {/* --- Search Box --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', position: 'relative' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            placeholder="e.g., Gerry Dozier"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setProfData(null); 
              setResultsList([]);
              setSuggestions([]); // Ensures dropdown clears if they start backspacing
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={{ width: '100%', boxSizing: 'border-box', padding: '15px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
          />

          {isSearchingSuggestions && (
            <div style={{ position: 'absolute', right: '15px', top: '18px', fontSize: '0.8rem', color: '#888' }}>
              Searching...
            </div>
          )}

          {/* THE UI FIX: Ensure dropdown only renders if we have suggestions AND no results are showing */}
          {suggestions.length > 0 && !profData && resultsList.length === 0 && (
            <div style={{ 
              position: 'absolute', top: '100%', left: 0, right: 0, 
              backgroundColor: 'white', border: '1px solid #03244D', borderTop: 'none',
              borderRadius: '0 0 4px 4px', zIndex: 10, overflow: 'hidden', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' 
            }}>
              {suggestions.map((prof, index) => (
                <div 
                  key={index} 
                  onClick={() => handleSearch(prof)} 
                  style={{ padding: '12px 15px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <strong style={{color: '#03244D'}}>{prof.firstName} {prof.lastName}</strong>
                  <span style={{fontSize: '0.8rem', color: '#666'}}>{prof.department || 'Auburn'}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={() => handleSearch()} 
          disabled={isLoading}
          style={{ 
            padding: '0 25px', height: '52px', backgroundColor: isLoading ? '#ccc' : '#DD550C', 
            color: 'white', border: 'none', borderRadius: '4px', cursor: isLoading ? 'not-allowed' : 'pointer', 
            fontSize: '1rem', fontWeight: 'bold'
          }}
        >
          {isLoading ? '...' : 'Search'}
        </button>
      </div>

      {error && !isLoading && (
        <div style={{ padding: '20px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '4px', border: '1px solid #f87171', marginBottom: '20px' }}>
          <strong>{error}</strong>
        </div>
      )}

      {/* MULTIPLE RESULTS LIST */}
      {resultsList.length > 0 && !isLoading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{color: '#03244D', margin: '0 0 10px 0'}}>Select a Professor:</h3>
          {resultsList.map((prof, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(prof)}
              style={{
                background: 'white', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '4px', 
                textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between'
              }}
            >
              <span style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#03244D'}}>{prof.firstName} {prof.lastName}</span>
              <span style={{fontSize: '0.85rem', color: '#64748b'}}>{prof.department || 'Auburn'}</span>
            </button>
          ))}
        </div>
      )}

      {/* ID CARD */}
      {profData && !isLoading && (
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#03244D', color: 'white', padding: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>{profData.firstName} {profData.lastName}</h2>
            <p style={{ margin: '5px 0 0 0', color: '#cbd5e1' }}>{profData.department}</p>
          </div>
          <div style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '25px' }}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '3rem', color: '#03244D' }}>{profData.avgRating}</h3>
                <span style={{fontWeight: 'bold', color: '#64748b', fontSize: '0.8rem'}}>QUALITY</span>
              </div>
              <div style={{ width: '2px', backgroundColor: '#e2e8f0' }}></div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '3rem', color: '#DD550C' }}>{profData.avgDifficulty}</h3>
                <span style={{fontWeight: 'bold', color: '#64748b', fontSize: '0.8rem'}}>DIFFICULTY</span>
              </div>
            </div>
            <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderLeft: '4px solid #DD550C' }}>
              <p style={{ margin: 0, color: '#334155', fontSize: '0.9rem' }}>
                Based on <strong>{profData.numRatings}</strong> student ratings.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RateMyProfessor;