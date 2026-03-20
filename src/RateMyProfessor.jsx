import React, { useState, useEffect } from 'react';

function RateMyProfessor({ goBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);
  const [profData, setProfData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // --- 1. LIVE AUTOCOMPLETE (DEBOUNCED) ---
  useEffect(() => {
    // We set a timer to wait 400ms after the user stops typing
    const delayDebounceFn = setTimeout(async () => {
      // Only search if they typed at least 2 characters and haven't already selected someone
      if (searchTerm.trim().length >= 2 && !profData) {
        setIsSearchingSuggestions(true);
        try {
          const response = await fetch(`https://comp-4710.onrender.com/api/rmp?name=${encodeURIComponent(searchTerm)}`);
          if (response.ok) {
            const data = await response.json();
            // Grab up to 5 suggestions so the dropdown doesn't get too long
            setSuggestions(data.slice(0, 5));
          }
        } catch (err) {
          console.error("Autocomplete fetch error:", err);
        } finally {
          setIsSearchingSuggestions(false);
        }
      } else {
        setSuggestions([]); // Clear suggestions if input is empty
      }
    }, 400);

    // Cleanup function that resets the timer if the user keeps typing
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, profData]);

  // --- 2. MAIN SEARCH FUNCTION ---
  // We added `selectedProf` so clicking the dropdown instantly loads the data!
  const handleSearch = async (selectedProf = null) => {
    // If they clicked a suggestion, bypass the API completely and load instantly!
    if (selectedProf) {
      setSearchTerm(`${selectedProf.firstName} ${selectedProf.lastName}`);
      setSuggestions([]); // Hide dropdown
      setError("");
      
      setProfData({
        name: `${selectedProf.firstName} ${selectedProf.lastName}`,
        department: selectedProf.department,
        rating: selectedProf.avgRating,
        difficulty: selectedProf.avgDifficulty,
        numRatings: selectedProf.numRatings
      });
      return;
    }

    // Fallback if they just type and hit the "Search" button manually
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setProfData(null);
    setError("");
    setSuggestions([]);

    try {
      const response = await fetch(`https://comp-4710.onrender.com/api/rmp?name=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();

      if (data && data.length > 0) {
        const prof = data[0]; 
        setProfData({
          name: `${prof.firstName} ${prof.lastName}`,
          department: prof.department,
          rating: prof.avgRating,
          difficulty: prof.avgDifficulty,
          numRatings: prof.numRatings
        });
      } else {
        setError(`No Auburn professors found matching "${searchTerm}".`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Could not connect to the backend scraper.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        <button className="back-button" onClick={goBack}>
          &larr; Back to Academics & Career
        </button>
      </div>
      
      <h2 style={{color: '#03244D', width: '100%', textAlign: 'left', marginTop: '10px'}}>Rate My Professor</h2>
      <p style={{ color: '#555', width: '100%', textAlign: 'left', marginBottom: '25px' }}>
        Live data pulled directly from the Rate My Professor database.
      </p>

      {/* --- Search Interface with Dropdown --- */}
      <div style={{ width: '100%', display: 'flex', gap: '10px', marginBottom: '30px', position: 'relative' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            placeholder="Start typing a professor's name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setProfData(null); // Clear previous results when typing new name
            }}
            onKeyDown={handleKeyDown}
            style={{ width: '100%', boxSizing: 'border-box', padding: '15px', borderRadius: '8px', border: '2px solid #ccc', fontSize: '1rem' }}
          />

          {/* LOADING INDICATOR FOR TYPING */}
          {isSearchingSuggestions && (
            <div style={{ position: 'absolute', right: '15px', top: '18px', fontSize: '0.8rem', color: '#888' }}>
              Searching...
            </div>
          )}

          {/* THE AUTOCOMPLETE DROPDOWN */}
          {suggestions.length > 0 && (
            <div style={{ 
              position: 'absolute', top: '100%', left: 0, right: 0, 
              backgroundColor: 'white', border: '1px solid #ccc', borderTop: 'none',
              borderRadius: '0 0 8px 8px', zIndex: 10, overflow: 'hidden',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)' 
            }}>
              {suggestions.map((prof, index) => (
                <div 
                  key={index} 
                  onClick={() => handleSearch(prof)} // Instantly loads data on click!
                  style={{ padding: '12px 15px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <strong style={{color: '#03244D'}}>{prof.firstName} {prof.lastName}</strong>
                  <span style={{fontSize: '0.8rem', color: '#666', background: '#eee', padding: '2px 8px', borderRadius: '12px'}}>
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
            padding: '15px 25px', 
            backgroundColor: isLoading ? '#ccc' : '#DD550C', 
            color: 'white', border: 'none', borderRadius: '8px', 
            cursor: isLoading ? 'not-allowed' : 'pointer', 
            fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.3s'
          }}
        >
          {isLoading ? '...' : 'Search'}
        </button>
      </div>

      {/* --- Loading & Error States --- */}
      {isLoading && (
        <div style={{ padding: '40px', textAlign: 'center', color: '#03244D' }}>
          <h3>🔄 Scraping database...</h3>
        </div>
      )}

      {error && !isLoading && (
        <div style={{ padding: '20px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '8px', width: '100%', textAlign: 'center', border: '1px solid #f87171' }}>
          <strong>{error}</strong>
        </div>
      )}

      {/* --- Live Results Display Card --- */}
      {profData && !isLoading && (
        <div className="id-card" style={{ width: '100%', background: 'white', color: '#03244D', border: '2px solid #03244D', borderRadius: '12px', overflow: 'hidden' }}>
          <div className="id-header" style={{ backgroundColor: '#03244D', color: 'white', padding: '20px', textAlign: 'left' }}>
            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>{profData.name}</h2>
            <p style={{ margin: '5px 0 0 0', color: '#cbd5e1', fontWeight: 'normal' }}>{profData.department}</p>
          </div>
          
          <div className="id-body" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '25px' }}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '3rem', color: '#03244D' }}>{profData.rating}<span style={{fontSize:'1.2rem', color:'#888'}}>/5</span></h3>
                <span style={{fontWeight: 'bold', color: '#555', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px'}}>Overall Quality</span>
              </div>
              <div style={{ width: '2px', backgroundColor: '#eee' }}></div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '3rem', color: '#DD550C' }}>{profData.difficulty}<span style={{fontSize:'1.2rem', color:'#888'}}>/5</span></h3>
                <span style={{fontWeight: 'bold', color: '#555', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px'}}>Difficulty</span>
              </div>
            </div>
            
            <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #DD550C' }}>
              <p style={{ margin: 0, color: '#03244D' }}>
                Based on <strong>{profData.numRatings}</strong> authentic student ratings.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RateMyProfessor;