import React, { useState } from 'react';

function RateMyProfessor({ goBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [profData, setProfData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setProfData(null);
    setError("");

    try {
      const response = await fetch(`https://comp-4710.onrender.com/api/rmp?name=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        // Grab the first matching professor from the array
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
      setError("Could not connect to the backend scraper. Make sure 'node server.js' is running!");
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

      {/* --- Search Interface --- */}
      <div style={{ width: '100%', display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="e.g., Gerry Dozier"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: '15px', borderRadius: '8px', border: '2px solid #ccc', fontSize: '1rem' }}
        />
        <button 
          onClick={handleSearch} 
          disabled={isLoading}
          style={{ 
            padding: '15px 25px', 
            backgroundColor: isLoading ? '#ccc' : '#DD550C', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: isLoading ? 'not-allowed' : 'pointer', 
            fontSize: '1rem', 
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* --- Loading State --- */}
      {isLoading && (
        <div style={{ padding: '40px', textAlign: 'center', color: '#03244D' }}>
          <h3>🔄 Scraping database...</h3>
        </div>
      )}

      {/* --- Error State --- */}
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