import React, { useState } from 'react';

function DiningDollars({ goBack, onDeposit }) {
  const [tigerClub, setTigerClub] = useState(45.50);
  const [diningDollars, setDiningDollars] = useState(375.00);
  const [blockMeals, setBlockMeals] = useState(42);
  
  // New state to track the user's custom input
  const [depositAmount, setDepositAmount] = useState('');
  
  const [transactions, setTransactions] = useState([
    { id: 1, date: 'Mar 24', vendor: 'Chick-fil-A Student Center', amount: -9.85, account: 'Dining Dollars' },
    { id: 2, date: 'Mar 23', vendor: 'Hey Day Market', amount: -14.50, account: 'Tiger Club' },
    { id: 3, date: 'Mar 22', vendor: 'Village Dining Hall', amount: -1, account: 'Meal Swipes' },
  ]);

  const handleAddFunds = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    const amount = parseFloat(depositAmount);
    
    // Safety check: ensure it's a valid number greater than 0
    if (isNaN(amount) || amount <= 0) return;

    // 1. Update the local Dining Dollars balance
    setDiningDollars(prev => prev + amount);
    
    // 2. Add the transaction to the local history
    const newTx = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      vendor: 'Deposit - Web Portal',
      amount: amount,
      account: 'Dining Dollars'
    };
    setTransactions([newTx, ...transactions]);

    // 3. Send the exact custom amount to the eBill in the parent component
    if (onDeposit) {
      onDeposit(amount);
    }
    
    // 4. Clear the input field for the next use
    setDepositAmount('');
  };

  return (
    <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back to Finances</button>
      
      <h2 style={{color: '#03244D', marginTop: 0, marginBottom: '20px'}}>Dining Dollars Hub</h2>

      {/* --- THE CSS TIGER CARD --- */}
      <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', overflow: 'hidden', marginBottom: '30px', border: '1px solid #e2e8f0', position: 'relative' }}>
        <div style={{ backgroundColor: '#03244D', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>AUBURN UNIVERSITY</div>
          <div style={{ color: '#DD550C', fontWeight: '900', fontSize: '1.2rem' }}>AU</div>
        </div>
        <div style={{ height: '4px', backgroundColor: '#DD550C', width: '100%' }}></div>
        
        <div style={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ width: '100px', height: '125px', backgroundColor: '#cbd5e1', borderRadius: '8px', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
             <svg width="60" height="60" viewBox="0 0 24 24" fill="#94a3b8"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div>
            <h3 style={{ margin: '0 0 5px 0', color: '#03244D', fontSize: '1.5rem' }}>Blake Senn</h3>
            <div style={{ color: '#DD550C', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Student</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'monospace' }}>ID: 9020 1234 5678</div>
          </div>
        </div>
      </div>

      {/* --- ACCOUNT BALANCES & DEPOSIT FORM --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        
        {/* Dining Dollars Card with Input */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '2px solid #03244D', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center', gridColumn: '1 / -1' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>Dining Dollars</div>
          <div style={{ fontSize: '2.2rem', color: '#03244D', fontWeight: 'bold', marginBottom: '15px' }}>${diningDollars.toFixed(2)}</div>
          
          <form onSubmit={handleAddFunds} style={{ display: 'flex', justifyContent: 'center', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#64748b', fontWeight: 'bold' }}>$</span>
              <input 
                type="number" 
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                style={{ width: '100%', padding: '10px 10px 10px 25px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#03244D', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}>
              Add
            </button>
          </form>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>Tiger Club</div>
          <div style={{ fontSize: '1.8rem', color: '#16a34a', fontWeight: 'bold' }}>${tigerClub.toFixed(2)}</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>Block Meals</div>
          <div style={{ fontSize: '1.8rem', color: '#DD550C', fontWeight: 'bold' }}>{blockMeals}</div>
        </div>
      </div>

      {/* --- RECENT TRANSACTIONS --- */}
      <h3 style={{ color: '#03244D', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>Recent Transactions</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {transactions.map(tx => (
          <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontWeight: 'bold', color: '#03244D', marginBottom: '2px' }}>{tx.vendor}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{tx.date} • {tx.account}</div>
            </div>
            <div style={{ fontWeight: 'bold', color: tx.amount > 0 ? '#16a34a' : '#0f172a' }}>
              {tx.amount > 0 ? '+' : ''}{tx.account === 'Block Meal' ? tx.amount : `$${Math.abs(tx.amount).toFixed(2)}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiningDollars;