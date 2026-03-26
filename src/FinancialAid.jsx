import React from 'react';

function FinancialAid({ goBack }) {
  const awards = [
    { id: 1, name: 'Spirit of Auburn Presidential Scholarship', amount: 4250.00, type: 'Scholarship', status: 'Disbursed' },
    { id: 2, name: 'Computer Science Departmental Award', amount: 1000.00, type: 'Scholarship', status: 'Disbursed' },
    { id: 3, name: 'Federal Pell Grant', amount: 250.00, type: 'Grant', status: 'Accepted' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Disbursed': return { bg: '#dcfce7', text: '#16a34a' }; // Green
      case 'Accepted': return { bg: '#f1f5f9', text: '#475569' };  // Slate
      case 'Pending': return { bg: '#fef3c7', text: '#d97706' };   // Yellow
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back to Finances</button>
      
      <h2 style={{color: '#03244D', margin: '0 0 5px 0'}}>Financial Aid & Scholarships</h2>
      <p style={{ color: '#64748b', marginBottom: '25px' }}>2025-2026 Academic Year</p>

      {/* FAFSA Status Card */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', borderLeft: '5px solid #03244D', marginBottom: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ margin: 0, color: '#03244D' }}>FAFSA Status</h3>
          <span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>Processed</span>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Your Free Application for Federal Student Aid has been successfully processed for the current academic year. No further action is required.</p>
      </div>

      <h3 style={{ color: '#03244D', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>Award Summary</h3>
      
      {/* Awards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {awards.map(award => {
          const colors = getStatusColor(award.status);
          return (
            <div key={award.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#DD550C', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{award.type}</div>
                  <h4 style={{ margin: 0, color: '#03244D', fontSize: '1.05rem', lineHeight: '1.3' }}>{award.name}</h4>
                </div>
                <div style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 'bold' }}>${award.amount.toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ backgroundColor: colors.bg, color: colors.text, padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {award.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FinancialAid;