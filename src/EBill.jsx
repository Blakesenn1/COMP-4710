import React, { useState } from 'react';

function EBill({ goBack, deposits }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Mocked base tuition and fees for a full-time student
  const charges = [
    { id: 1, description: 'Undergraduate Tuition (In-State)', amount: 6324.00 },
    { id: 2, description: 'Student Services Fee', amount: 858.00 },
    { id: 3, description: 'College of Engineering Professional Fee', amount: 400.00 },
    { id: 4, description: 'Computer Science Lab Fee', amount: 150.00 },
  ];

  // Base payments/financial aid already applied
  const baseCredits = 5500.00; 

  const totalCharges = charges.reduce((sum, item) => sum + item.amount, 0);
  const totalCredits = baseCredits + deposits; 
  const amountDue = totalCharges - totalCredits;

  const handlePayNow = () => {
    setShowPaymentModal(true);
    setTimeout(() => {
      setShowPaymentModal(false);
    }, 3000);
  };

  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back to Finances</button>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '25px' }}>
        <div>
          <h2 style={{color: '#03244D', margin: '0 0 5px 0'}}>Auburn eBill</h2>
          <p style={{ color: '#64748b', margin: 0 }}>Spring 2026 Statement</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Amount Due</div>
          <div style={{ fontSize: '2rem', color: amountDue > 0 ? '#ef4444' : '#16a34a', fontWeight: 'bold' }}>
            ${Math.max(0, amountDue).toFixed(2)}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <div style={{ backgroundColor: '#f8fafc', padding: '15px 20px', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold', color: '#03244D' }}>
          Current Charges
        </div>
        <div style={{ padding: '10px 20px' }}>
          {charges.map(charge => (
            <div key={charge.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed #e2e8f0' }}>
              <span style={{ color: '#475569' }}>{charge.description}</span>
              <span style={{ color: '#0f172a', fontWeight: '500' }}>${charge.amount.toFixed(2)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0 5px 0', fontWeight: 'bold', color: '#03244D' }}>
            <span>Total Charges</span>
            <span>${totalCharges.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#f0fdf4', padding: '15px 20px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold', color: '#16a34a' }}>
          Payments & Credits
        </div>
        <div style={{ padding: '10px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed #e2e8f0' }}>
            <span style={{ color: '#475569' }}>Financial Aid & Scholarships Applied</span>
            <span style={{ color: '#16a34a', fontWeight: '500' }}>-${baseCredits.toFixed(2)}</span>
          </div>
          
          {/* This line dynamically renders the data passed from the Dining Dollars component */}
          {deposits > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed #e2e8f0', backgroundColor: '#fffbeb' }}>
              <span style={{ color: '#d97706', fontWeight: 'bold' }}>Tiger Club Transfer (From Hub)</span>
              <span style={{ color: '#16a34a', fontWeight: 'bold' }}>-${deposits.toFixed(2)}</span>
            </div>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0 5px 0', fontWeight: 'bold', color: '#16a34a' }}>
            <span>Total Credits</span>
            <span>-${totalCredits.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handlePayNow}
        disabled={amountDue <= 0}
        style={{ width: '100%', padding: '15px', backgroundColor: amountDue > 0 ? '#03244D' : '#cbd5e1', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: amountDue > 0 ? 'pointer' : 'not-allowed', transition: 'background-color 0.2s' }}
      >
        {amountDue > 0 ? 'Make a Payment' : 'Balance Paid in Full'}
      </button>

      {/* Fake Payment Success Modal */}
      {showPaymentModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center', maxWidth: '300px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✅</div>
            <h3 style={{ color: '#03244D', margin: '0 0 10px 0' }}>Payment Simulated</h3>
            <p style={{ color: '#64748b', margin: 0 }}>This is a senior design prototype. No real transaction occurred.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EBill;