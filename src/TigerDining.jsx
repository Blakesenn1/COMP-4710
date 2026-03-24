import React, { useState, useEffect } from 'react';

// Hardcoded Auburn Dining Locations
const diningSpots = [
  { id: 'edge', name: 'The Edge at Central Dining', type: 'Dining Hall', status: 'Open Now' },
  { id: 'foy', name: 'Foy on the Fly', type: 'Dining Hall', status: 'Open Now' },
  { id: 'cfa', name: 'Chick-fil-A (Student Center)', type: 'Fast Food', status: 'Open Now' },
  { id: 'starbucks', name: 'Starbucks (RBD Library)', type: 'Coffee', status: 'Closed' },
  { id: 'heyday', name: 'Hey Day Market', type: 'Food Hall', status: 'Open Now' }
];

function TigerDining({ goBack }) {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState('5');

  // Load saved reviews on startup
  useEffect(() => {
    const savedReviews = localStorage.getItem('auburnDiningReviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Save to local storage whenever reviews array changes
  useEffect(() => {
    localStorage.setItem('auburnDiningReviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    const reviewObj = {
      id: Date.now().toString(),
      spotId: selectedSpot.id,
      text: newReview.trim(),
      rating: parseInt(rating),
      date: new Date().toLocaleDateString()
    };

    setReviews([reviewObj, ...reviews]);
    setNewReview('');
    setRating('5');
  };

  // --- DETAIL VIEW (When a restaurant is clicked) ---
  if (selectedSpot) {
    const spotReviews = reviews.filter(r => r.spotId === selectedSpot.id);
    const avgRating = spotReviews.length > 0 
      ? (spotReviews.reduce((sum, r) => sum + r.rating, 0) / spotReviews.length).toFixed(1)
      : 'No ratings yet';

    return (
      <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        <button className="back-button" onClick={() => setSelectedSpot(null)} style={{ marginBottom: '20px' }}>&larr; Back to Radar</button>
        
        <div style={{ backgroundColor: '#03244D', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 5px 0' }}>{selectedSpot.name}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ backgroundColor: selectedSpot.status === 'Open Now' ? '#16a34a' : '#ef4444', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              {selectedSpot.status}
            </span>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>⭐ {avgRating}</span>
          </div>
        </div>

        {/* Review Form */}
        <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: '#03244D' }}>Leave a Review</h3>
          <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
              <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
              <option value="4">⭐⭐⭐⭐ (4/5)</option>
              <option value="3">⭐⭐⭐ (3/5)</option>
              <option value="2">⭐⭐ (2/5)</option>
              <option value="1">⭐ (1/5)</option>
            </select>
            <textarea 
              value={newReview} 
              onChange={(e) => setNewReview(e.target.value)} 
              placeholder="How was the food/line?" 
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', minHeight: '60px', fontFamily: 'inherit' }}
              required
            />
            <button type="submit" style={{ backgroundColor: '#DD550C', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Post Review</button>
          </form>
        </div>

        {/* Review List */}
        <h3 style={{ color: '#03244D', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>Student Reviews ({spotReviews.length})</h3>
        {spotReviews.length === 0 ? (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>Be the first to review {selectedSpot.name}!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {spotReviews.map(review => (
              <div key={review.id} style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '8px', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold' }}>{'⭐'.repeat(review.rating)}</span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{review.date}</span>
                </div>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem' }}>{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // --- MAIN LIST VIEW ---
  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back to Hub</button>
      
      <h2 style={{color: '#03244D', marginTop: 0, marginBottom: '5px'}}>Tiger Dining Radar</h2>
      <p style={{ color: '#64748b', marginTop: 0, marginBottom: '25px', fontSize: '0.95rem' }}>
        Check what's open on campus and see what other Auburn students are saying.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {diningSpots.map(spot => {
          // Calculate quick average for the main list
          const spotReviews = reviews.filter(r => r.spotId === spot.id);
          const avgRating = spotReviews.length > 0 
            ? (spotReviews.reduce((sum, r) => sum + r.rating, 0) / spotReviews.length).toFixed(1)
            : 'New';

          return (
            <div 
              key={spot.id} 
              onClick={() => setSelectedSpot(spot)}
              style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
            >
              <div>
                <h3 style={{ margin: '0 0 5px 0', color: '#03244D', fontSize: '1.1rem' }}>{spot.name}</h3>
                <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem' }}>
                  <span style={{ color: '#64748b' }}>{spot.type}</span>
                  <span style={{ color: '#DD550C', fontWeight: 'bold' }}>⭐ {avgRating}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: spot.status === 'Open Now' ? '#16a34a' : '#ef4444' }}></div>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: spot.status === 'Open Now' ? '#16a34a' : '#ef4444' }}>
                  {spot.status}
                </span>
                <span style={{ color: '#cbd5e1', marginLeft: '5px' }}>▶</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TigerDining;