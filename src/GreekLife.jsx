import React, { useState } from 'react';

const orgsData = [
  // --- PANHELLENIC COUNCIL (18 Chapters) ---
  { id: 1, name: 'Alpha Chi Omega', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'Domestic Violence Awareness', auburnFounded: '1967', colors: 'Scarlet & Olive Green', description: 'Alpha Chi Omega is dedicated to empowering women and raising awareness for domestic violence victims.' },
  { id: 2, name: 'Alpha Delta Pi', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'Ronald McDonald House Charities', auburnFounded: '1942', colors: 'Azure Blue & White', description: 'ADPi is the oldest secret society for college women and is a major supporter of RMHC globally.' },
  { id: 3, name: 'Alpha Gamma Delta', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'Fighting Hunger', auburnFounded: '1939', colors: 'Red, Buff & Green', description: 'AGD focuses on community service and local food insecurity initiatives.' },
  { id: 4, name: 'Alpha Omicron Pi', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'Arthritis Foundation', auburnFounded: '1946', colors: 'Cardinal Red', description: 'AOII supports research and camps for children with arthritis.' },
  { id: 5, name: 'Alpha Xi Delta', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'The Kindly Hearts Initiative', auburnFounded: '1980', colors: 'Light Blue & Gold', description: 'Alpha Xi Delta works with local organizations to support foster children and students in need.' },
  { id: 6, name: 'Chi Omega', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'Make-A-Wish Foundation', auburnFounded: '1923', colors: 'Cardinal & Straw', description: 'Chi Omega is the largest women’s fraternal organization in the world.' },
  { id: 7, name: 'Delta Delta Delta', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: "St. Jude Children's Research Hospital", auburnFounded: '1954', colors: 'Silver, Gold & Blue', description: 'Tri Delta is a top-tier partner for St. Jude, raising millions annually.' },
  { id: 8, name: 'Delta Gamma', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'Service for Sight', auburnFounded: '1972', colors: 'Bronze, Pink & Blue', description: 'Delta Gamma members volunteer with organizations helping the blind and visually impaired.' },
  { id: 9, name: 'Delta Zeta', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'Starkey Hearing Foundation', auburnFounded: '1940', colors: 'Rose & Green', description: 'Delta Zeta focuses on speech and hearing health and wellness.' },
  { id: 10, name: 'Gamma Phi Beta', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'Girls on the Run', auburnFounded: '1968', colors: 'Brown & Mode', description: 'Gamma Phi focuses on building strong girls through athletic and mentorship programs.' },
  { id: 11, name: 'Kappa Alpha Theta', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'CASA (Court Appointed Special Advocates)', auburnFounded: '1957', colors: 'Black & Gold', description: 'Thetas support children in the foster care system through CASA advocacy.' },
  { id: 12, name: 'Kappa Delta', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'Prevent Child Abuse America', auburnFounded: '1922', colors: 'Olive Green & Pearl White', description: 'Kappa Delta founded the "Confidence Coalition" and works with Girl Scouts of the USA.' },
  { id: 13, name: 'Kappa Kappa Gamma', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'The JED Foundation (Mental Health)', auburnFounded: '1963', colors: 'Light & Dark Blue', description: 'KKG focuses on mental health awareness and supporting the KKG Foundation.' },
  { id: 14, name: 'Phi Mu', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'Children’s Miracle Network Hospitals', auburnFounded: '1943', colors: 'Rose & White', description: 'Phi Mu supports local CMNH facilities like Piedmont Columbus Regional.' },
  { id: 15, name: 'Pi Beta Phi', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'Read > Lead > Achieve', auburnFounded: '1957', colors: 'Wine & Silver Blue', description: 'Pi Phi is dedicated to literacy and providing books to children in need.' },
  { id: 16, name: 'Sigma Kappa', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'Alzheimer’s Association', auburnFounded: '1989', colors: 'Maroon & Lavender', description: 'Sigma Kappa is a major supporter of gerontology research and Alzheimer’s care.' },
  { id: 17, name: 'Sigma Sigma Sigma', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'March of Dimes', auburnFounded: '2016', colors: 'Royal Purple & White', description: 'Tri Sigma focuses on improving the health of mothers and babies.' },
  { id: 18, name: 'Zeta Tau Alpha', council: 'Panhellenic', focus: 'Social', location: 'Village', philanthropy: 'Breast Cancer Education & Awareness', auburnFounded: '1951', colors: 'Turquoise Blue & Steel Grey', description: 'ZTA is famous for their "Think Pink" initiatives and NFL partnerships.' },

  // --- INTERFRATERNITY COUNCIL (IFC - 28 Chapters) ---
  { id: 19, name: 'Alpha Epsilon Pi', council: 'IFC', focus: 'Social', location: 'Magnolia Ave', philanthropy: 'Heroes in Blue', auburnFounded: '1964', colors: 'Blue & Gold', description: 'AEPi is the worlds leading Jewish college fraternity.' },
  { id: 20, name: 'Alpha Gamma Rho', council: 'IFC', focus: 'Social/Ag', location: 'Wire Rd', philanthropy: 'A-Day Charity Event', auburnFounded: '1919', colors: 'Dark Green & Gold', description: 'AGR is a social-professional fraternity for those with agricultural interests.' },
  { id: 21, name: 'Alpha Sigma Phi', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'Shatterproof', auburnFounded: '2015', colors: 'Cardinal & Stone', description: 'Alpha Sig is focused on the better man through five values.' },
  { id: 22, name: 'Alpha Tau Omega', council: 'IFC', focus: 'Social', location: 'Magnolia Ave', philanthropy: 'The Hudson Family Foundation', auburnFounded: '1879', colors: 'Azure & Gold', description: 'ATO was the first fraternity founded after the Civil War.' },
  { id: 23, name: 'Beta Theta Pi', council: 'IFC', focus: 'Social', location: 'Magnolia Ave', philanthropy: 'Interfaith Food Bank', auburnFounded: '1964', colors: 'Delicate Pink & Blue', description: 'Beta is dedicated to building men of principle for a principled life.' },
  { id: 24, name: 'Beta Upsilon Chi', council: 'IFC', focus: 'Christian/Social', location: 'Off-Campus', philanthropy: 'Living Water International', auburnFounded: '2004', colors: 'Purple & White', description: 'Brothers Under Christ is the largest Christian social fraternity in the US.' },
  { id: 25, name: 'Chi Phi', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'The Boys & Girls Club', auburnFounded: '1967', colors: 'Scarlet & Blue', description: 'Chi Phi was founded on the basis of Truth, Honor, and Personal Integrity.' },
  { id: 26, name: 'Delta Chi', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'The V Foundation', auburnFounded: '1951', colors: 'Red & Buff', description: 'Delta Chi supports cancer research in honor of Jimmy V.' },
  { id: 27, name: 'Delta Kappa Epsilon', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'The DKE Foundation', auburnFounded: '1960', colors: 'Azure, Gold & Crimson', description: 'DKE is known for its strong heritage and network of leaders.' },
  { id: 28, name: 'Delta Sigma Phi', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'American Red Cross', auburnFounded: '1908', colors: 'Nile Green & White', description: 'Delta Sig is focused on the development of unconventional leaders.' },
  { id: 29, name: 'Delta Tau Delta', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'JDRF (Diabetes Research)', auburnFounded: '1952', colors: 'Royal Purple, White & Gold', description: 'Delt is committed to lives of excellence through lifelong learning.' },
  { id: 30, name: 'FarmHouse', council: 'IFC', focus: 'Social/Ag', location: 'Wire Rd', philanthropy: 'Be The Match', auburnFounded: '1971', colors: 'Green, Gold & White', description: 'FarmHouse focuses on spiritual, intellectual, and social growth.' },
  { id: 31, name: 'Kappa Alpha Order', council: 'IFC', focus: 'Social', location: 'Lem Morrison', philanthropy: 'Muscular Dystrophy Association', auburnFounded: '1883', colors: 'Crimson & Old Gold', description: 'KA is defined by its commitment to the ideal of the Southern Gentleman.' },
  { id: 32, name: 'Lambda Chi Alpha', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'Feeding America', auburnFounded: '1915', colors: 'Purple, Green & Gold', description: 'Lambda Chi was one of the first to abolish pledging for associate membership.' },
  { id: 33, name: 'Phi Delta Theta', council: 'IFC', focus: 'Social', location: 'Magnolia Ave', philanthropy: 'Live Like Lou (ALS Research)', auburnFounded: '1879', colors: 'Azure & Argent', description: 'Phi Delt is dedicated to friendship, sound learning, and rectitude.' },
  { id: 34, name: 'Phi Gamma Delta (FIJI)', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'The USO', auburnFounded: '1962', colors: 'Royal Purple', description: 'Fiji is known for its strong focus on academic and personal achievement.' },
  { id: 35, name: 'Phi Kappa Tau', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'SeriousFun Children’s Network', auburnFounded: '1927', colors: 'Harvard Red & Old Gold', description: 'Phi Tau builds men of character through service and leadership.' },
  { id: 36, name: 'Phi Sigma Kappa', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'Special Olympics', auburnFounded: '1960', colors: 'Silver & Magenta', description: 'Phi Sig promotes the Golden Rule and lifelong brotherhood.' },
  { id: 37, name: 'Pi Kappa Alpha', council: 'IFC', focus: 'Social', location: 'Magnolia Ave', philanthropy: 'Taylor Trudeau Cycle for Life', auburnFounded: '1895', colors: 'Garnet & Gold', description: 'Pike is one of the largest and most influential fraternities at Auburn.' },
  { id: 38, name: 'Pi Kappa Phi', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'The Ability Experience', auburnFounded: '1926', colors: 'White, Gold & Royal Blue', description: 'The only fraternity to own and operate its own national philanthropy.' },
  { id: 39, name: 'Sigma Alpha Epsilon', council: 'IFC', focus: 'Social', location: 'Magnolia Ave', philanthropy: 'Children’s Miracle Network', auburnFounded: '1878', colors: 'Royal Purple & Old Gold', description: 'SAE is the oldest social fraternity founded at Auburn University.' },
  { id: 40, name: 'Sigma Chi', council: 'IFC', focus: 'Social', location: 'Magnolia Ave', philanthropy: 'Huntsman Cancer Institute', auburnFounded: '1878', colors: 'Blue & Old Gold', description: 'Sigma Chi is one of the "Miami Triad" and has a massive alumni network.' },
  { id: 41, name: 'Sigma Nu', council: 'IFC', focus: 'Social', location: 'Magnolia Ave', philanthropy: 'Helping Hand Initiative', auburnFounded: '1890', colors: 'Black, White & Gold', description: 'Sigma Nu was founded on the principle of non-hazing and honor.' },
  { id: 42, name: 'Sigma Pi', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'Donate Life America', auburnFounded: '1908', colors: 'Lavender & White', description: 'Sigma Pi is committed to scholarship and service to humanity.' },
  { id: 43, name: 'Sigma Tau Gamma', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'Special Olympics', auburnFounded: '2016', colors: 'Azure & White', description: 'Sig Tau focuses on brotherhood and community engagement.' },
  { id: 44, name: 'Tau Kappa Epsilon', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: "St. Jude Children's Hospital", auburnFounded: '1960', colors: 'Cherry Red & Grey', description: 'TKE is the world’s largest social fraternity by active chapters.' },
  { id: 45, name: 'Theta Chi', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'United Service Organizations (USO)', auburnFounded: '1918', colors: 'Military Red & White', description: 'Theta Chi has a long history of supporting US service members.' },
  { id: 46, name: 'Theta Xi', council: 'IFC', focus: 'Social', location: 'Off-Campus', philanthropy: 'Habitat for Humanity', auburnFounded: '1960', colors: 'Azure & Silver', description: 'Theta Xi was founded as a professional engineering fraternity.' },

  // --- NATIONAL PAN-HELLENIC COUNCIL (NPHC - 8 Chapters) ---
  { id: 47, name: 'Alpha Kappa Alpha', council: 'NPHC', focus: 'Service/Social', location: 'Campus', philanthropy: 'CHIPP (Hunger Initiative)', auburnFounded: '1976', colors: 'Salmon Pink & Apple Green', description: 'AKA is the first intercollegiate historically African American sorority.' },
  { id: 48, name: 'Alpha Phi Alpha', council: 'NPHC', focus: 'Service/Social', location: 'Campus', philanthropy: 'March of Dimes', auburnFounded: '1982', colors: 'Black & Old Gold', description: 'The first historically African American fraternity, focused on leadership.' },
  { id: 49, name: 'Delta Sigma Theta', council: 'NPHC', focus: 'Service/Social', location: 'Campus', philanthropy: 'Mental Health Awareness', auburnFounded: '1974', colors: 'Crimson & Cream', description: 'Deltas are committed to public service and the Five-Point Programmatic Thrust.' },
  { id: 50, name: 'Kappa Alpha Psi', council: 'NPHC', focus: 'Service/Social', location: 'Campus', philanthropy: "St. Jude Children's Hospital", auburnFounded: '1982', colors: 'Crimson & Cream', description: 'Kappa Alpha Psi is dedicated to Achievement in every field of human endeavor.' },
  { id: 51, name: 'Omega Psi Phi', council: 'NPHC', focus: 'Service/Social', location: 'Campus', philanthropy: 'Charles Drew Blood Drive', auburnFounded: '1982', colors: 'Royal Purple & Old Gold', description: 'Que Psi Phi is focused on Manhood, Scholarship, Perseverance, and Uplift.' },
  { id: 52, name: 'Phi Beta Sigma', council: 'NPHC', focus: 'Service/Social', location: 'Campus', philanthropy: 'March of Dimes', auburnFounded: '1982', colors: 'Royal Blue & Pure White', description: 'The Sigmas were founded on the principles of Brotherhood, Scholarship, and Service.' },
  { id: 53, name: 'Sigma Gamma Rho', council: 'NPHC', focus: 'Service/Social', location: 'Campus', philanthropy: 'Swim 1922', auburnFounded: '1987', colors: 'Royal Blue & Gold', description: 'SGRho is dedicated to improving the quality of life in the community.' },
  { id: 54, name: 'Zeta Phi Beta', council: 'NPHC', focus: 'Service/Social', location: 'Campus', philanthropy: 'March of Dimes', auburnFounded: '1983', colors: 'Royal Blue & White', description: 'Zetas focus on Scholarship, Service, Sisterhood, and Finer Womanhood.' }
];

function GreekLife({ goBack }) {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const councils = ['All', 'IFC', 'Panhellenic', 'NPHC'];

  const filteredOrgs = orgsData.filter(org => {
    const matchesFilter = filter === 'All' || org.council === filter;
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // --- DETAIL VIEW ---
  if (selectedOrg) {
    return (
      <div className="feature-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        <button className="back-button" onClick={() => setSelectedOrg(null)} style={{ marginBottom: '20px' }}>&larr; Back to Explorer</button>
        
        <div style={{ backgroundColor: '#03244D', color: 'white', padding: '30px', borderRadius: '12px', marginBottom: '25px', boxShadow: '0 4px 12px rgba(3, 36, 77, 0.2)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#DD550C', textTransform: 'uppercase', marginBottom: '10px' }}>{selectedOrg.council} Council</div>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{selectedOrg.name}</h2>
          <div style={{ fontSize: '1rem', opacity: 0.9 }}>Auburn Chapter Established: {selectedOrg.auburnFounded}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section>
            <h3 style={{ color: '#03244D', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>About the Chapter</h3>
            <p style={{ color: '#475569', lineHeight: '1.6' }}>{selectedOrg.description}</p>
          </section>

          <section>
            <h3 style={{ color: '#03244D', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>Philanthropy & Service</h3>
            <div style={{ backgroundColor: '#f0f9ff', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #0284c7' }}>
              <strong style={{ color: '#03244D' }}>Primary Philanthropy:</strong>
              <div style={{ color: '#0284c7', fontSize: '1.1rem', fontWeight: 'bold', marginTop: '5px' }}>{selectedOrg.philanthropy}</div>
            </div>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Colors</div>
              <div style={{ color: '#03244D', fontWeight: 'bold' }}>{selectedOrg.colors}</div>
            </div>
            <div style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Location</div>
              <div style={{ color: '#03244D', fontWeight: 'bold' }}>{selectedOrg.location}</div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // --- GRID VIEW ---
  return (
    <div className="feature-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
      <button className="back-button" onClick={goBack} style={{ marginBottom: '20px' }}>&larr; Back to Hub</button>
      
      <h2 style={{color: '#03244D', marginTop: 0, marginBottom: '5px'}}>Greek Life & Org Explorer</h2>
      <p style={{ color: '#64748b', marginTop: 0, marginBottom: '25px' }}>
        Click a chapter to learn about their mission, philanthropy, and history at Auburn.
      </p>

      <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
        />
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {councils.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #03244D',
                backgroundColor: filter === c ? '#03244D' : 'transparent',
                color: filter === c ? 'white' : '#03244D',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {filteredOrgs.map(org => (
          <div 
            key={org.id} 
            onClick={() => setSelectedOrg(org)}
            style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '10px', 
              border: '1px solid #e2e8f0', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
              cursor: 'pointer', 
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = '#03244D';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#DD550C', textTransform: 'uppercase', marginBottom: '5px' }}>
                {org.council}
              </div>
              <h3 style={{ margin: '0 0 15px 0', color: '#03244D', lineHeight: '1.2' }}>{org.name}</h3>
            </div>
            
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>View Chapter Profile</span>
              <span>&rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GreekLife;