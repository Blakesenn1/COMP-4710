import React, { useState, useEffect } from 'react';

const campusLocations = [
  {
    id: 'brown-kopel',
    name: 'Brown-Kopel Hall',
    restaurants: [
      { id: 'cafe-25', name: 'Cafe 25', type: 'Cafe', open: '07:30', close: '15:00' }
    ]
  },
  {
    id: 'food-trucks',
    name: 'Food Trucks',
    restaurants: [
      { id: 'amsterdam-cafe', name: 'Amsterdam Cafe', type: 'Food Truck', open: '10:30', close: '15:00' },
      { id: 'amsterdam-taco', name: 'Amsterdam Taco', type: 'Food Truck', open: '10:30', close: '15:00' },
      { id: 'bens-pretzels', name: "Ben's Soft Pretzels", type: 'Snacks', open: '10:30', close: '16:00' },
      { id: 'holoway-bbq', name: 'Holoway BBQ', type: 'BBQ', open: '10:30', close: '15:00' },
      { id: 'shake-on-it', name: "Let's Shake On It", type: 'Drinks/Snacks', open: '10:30', close: '16:00' },
      { id: 'maria-cuban', name: 'Maria Cuban Sandwiches', type: 'Sandwiches', open: '10:30', close: '15:00' },
      { id: 'nycgyro', name: 'NYCGYRO', type: 'Halal/Gyro', open: '10:00', close: '16:00' },
      { id: 'philly-connection', name: 'Philly Connection', type: 'Sandwiches', open: '10:30', close: '15:00' },
      { id: 'the-tea', name: 'The Tea', type: 'Drinks', open: '10:00', close: '16:00' },
      { id: 'travelin-tom', name: "Travelin' Tom", type: 'Coffee/Drinks', open: '08:00', close: '14:00' },
      { id: 'turn-burn', name: 'Turn & Burn Food Truck', type: 'Food Truck', open: '10:30', close: '15:00' }
    ]
  },
  {
    id: 'foy',
    name: 'Foy Union',
    restaurants: [
      { id: 'csc-foy', name: 'Chicken Salad Chick', type: 'Sandwiches', open: '10:00', close: '17:00' },
      { id: 'panda-foy', name: 'Panda Express', type: 'Asian', open: '10:30', close: '20:00' }
    ]
  },
  {
    id: 'haley',
    name: 'Haley Center',
    restaurants: [
      { id: 'einstein-haley', name: 'Einstein Bros. Bagels', type: 'Bagels/Coffee', open: '07:00', close: '14:00' }
    ]
  },
  {
    id: 'harbert',
    name: 'Harbert School of Business',
    restaurants: [
      { id: 'exchange-cafe', name: 'The Exchange', type: 'Cafe', open: '07:30', close: '15:00' }
    ]
  },
  {
    id: 'heyday',
    name: 'Hey Day Market',
    restaurants: [
      { id: 'hey-batta', name: 'Hey Batta Batta', type: 'Dessert', open: '10:30', close: '21:00' },
      { id: 'khoodles', name: 'Khoodles', type: 'Noodles', open: '10:30', close: '21:00' },
      { id: 'little-darling', name: 'Little Darling', type: 'Burgers', open: '10:30', close: '21:00' },
      { id: 'loud-roots', name: 'Loud Roots', type: 'Healthy', open: '10:30', close: '21:00' },
      { id: 'pasta-bari', name: 'Pasta Bari', type: 'Italian', open: '10:30', close: '21:00' },
      { id: 'pizzeria-ariccia', name: 'Pizzeria Ariccia', type: 'Pizza', open: '10:30', close: '21:00' },
      { id: 'pokemen', name: 'Pokemen', type: 'Sushi/Poke', open: '10:30', close: '21:00' },
      { id: 'saint-bernardo', name: 'Saint Bernardo', type: 'Sandwiches', open: '10:30', close: '21:00' },
      { id: 'incubator', name: 'The Incubator', type: 'Various', open: '10:30', close: '21:00' },
      { id: 'wildchild', name: 'Wildchild', type: 'Tacos', open: '10:30', close: '21:00' }
    ]
  },
  {
    id: 'lowder',
    name: 'Lowder Hall',
    restaurants: [
      { id: 'sbux-lowder', name: 'Starbucks', type: 'Coffee', open: '07:00', close: '15:00' }
    ]
  },
  {
    id: 'melton',
    name: 'Melton Student Center',
    restaurants: [
      { id: 'blenz-melton', name: 'Blenz', type: 'Smoothies/Bowls', open: '08:00', close: '20:00' },
      { id: 'cfa-melton', name: 'Chick-fil-A', type: 'Fast Food', open: '07:30', close: '21:00' },
      { id: 'inked-tacos', name: 'Inked Tacos', type: 'Tex-Mex', open: '10:30', close: '20:00' },
      { id: 'hot-chicken', name: 'Original Hot Chicken/Flametown', type: 'Chicken', open: '10:30', close: '20:00' },
      { id: 'sbux-melton', name: 'Starbucks', type: 'Coffee', open: '07:00', close: '18:00' },
      { id: 'toro-melton', name: 'Toro Sushi', type: 'Sushi', open: '10:00', close: '19:00' }
    ]
  },
  {
    id: 'rbd-library',
    name: 'RBD Library',
    restaurants: [
      { id: 'panera-rbd', name: 'Panera Bread', type: 'Cafe/Coffee', open: '07:00', close: '23:00' }
    ]
  },
  {
    id: 'the-edge',
    name: 'The Edge',
    restaurants: [
      { id: 'edge-dining', name: 'The Edge Dining Hall', type: 'Dining Hall', open: '07:00', close: '21:00' }
    ]
  },
  {
    id: 'village',
    name: 'Village Dining',
    restaurants: [
      { id: 'cfa-village', name: 'Chick-fil-A', type: 'Fast Food', open: '07:30', close: '20:00' },
      { id: 'toro-village', name: 'Toro Sushi', type: 'Sushi', open: '10:00', close: '21:00' },
      { id: 'blenz-village', name: 'Village Blenz', type: 'Smoothies', open: '08:00', close: '21:00' },
      { id: 'village-hall', name: 'Village Dining Hall', type: 'Dining Hall', open: '07:00', close: '20:00' }
    ]
  },
  {
    id: 'wellness-kitchen',
    name: 'Wellness Kitchen',
    restaurants: [
      { id: 'wellness-dining', name: 'Wellness Kitchen', type: 'Athlete Dining', open: '07:00', close: '20:00' }
    ]
  }
];

function TigerDining({ goBack }) {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState('5');

  useEffect(() => {
    const savedReviews = localStorage.getItem('auburnDiningReviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

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

  const getDynamicStatus = (openTimeStr, closeTimeStr) => {
    if (!openTimeStr || !closeTimeStr) return { label: 'Closed', color: '#ef4444' };
    
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    const [openH, openM] = openTimeStr.split(':').map(Number);
    const openMins = openH * 60 + openM;

    const [closeH, closeM] = closeTimeStr.split(':').map(Number);
    const closeMins = closeH * 60 + closeM;

    if (currentMins < openMins || currentMins >= closeMins) {
      return { label: 'Closed', color: '#ef4444' };
    } else if (closeMins - currentMins <= 60) {
      return { label: 'Closes Soon', color: '#eab308' }; // Yellow
    } else {
      return { label: 'Open Now', color: '#16a34a' }; // Green
    }
  };

  // ==========================================
  // VIEW 3: RESTAURANT & REVIEWS
  // ==========================================
  if (selectedSpot && selectedBuilding) {
    const spotReviews = reviews.filter(r => r.spotId === selectedSpot.id);
    const currentStatus = getDynamicStatus(selectedSpot.open, selectedSpot.close);

    return (
      <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        <button className="back-button" onClick={() => setSelectedSpot(null)} style={{ marginBottom: '20px' }}>
          &larr; Back to {selectedBuilding.name}
        </button>
        
        <div style={{ backgroundColor: '#03244D', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 5px 0' }}>{selectedSpot.name}</h2>
          <div style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '15px' }}>📍 Inside {selectedBuilding.name}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ backgroundColor: currentStatus.color, padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', color: currentStatus.label === 'Closes Soon' ? 'black' : 'white' }}>
              {currentStatus.label}
            </span>
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

  // ==========================================
  // VIEW 2: RESTAURANTS INSIDE A BUILDING
  // ==========================================
  if (selectedBuilding && !selectedSpot) {
    return (
      <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        <button className="back-button" onClick={() => setSelectedBuilding(null)} style={{ marginBottom: '20px' }}>
          &larr; Back to Campus Map
        </button>
        
        <h2 style={{color: '#03244D', marginTop: 0, marginBottom: '5px'}}>{selectedBuilding.name}</h2>
        <p style={{ color: '#64748b', marginTop: 0, marginBottom: '25px', fontSize: '0.95rem' }}>
          Select a dining option below to view details and reviews.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {selectedBuilding.restaurants.map(spot => {
            const currentStatus = getDynamicStatus(spot.open, spot.close);

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
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: currentStatus.color }}></div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: currentStatus.color }}>
                    {currentStatus.label}
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

  // ==========================================
  // VIEW 1: MAIN BUILDING LIST
  // ==========================================
  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back to Hub</button>
      
      <h2 style={{color: '#03244D', marginTop: 0, marginBottom: '5px'}}>Tiger Dining Radar</h2>
      <p style={{ color: '#64748b', marginTop: 0, marginBottom: '25px', fontSize: '0.95rem' }}>
        Select a campus location to see what is open inside.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
        {campusLocations.map(building => (
          <div 
            key={building.id} 
            onClick={() => setSelectedBuilding(building)}
            style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#03244D', fontSize: '1.1rem' }}>{building.name}</h3>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{building.restaurants.length} Options</span>
            </div>
            <span style={{ color: '#DD550C', fontSize: '1.2rem' }}>▶</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TigerDining;