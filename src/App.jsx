import React, { useState, useEffect } from 'react';
import StudentHub from './StudentHub';
import './App.css'; 

function App() {
  const [view, setView] = useState('home');
  const [nextDeadline, setNextDeadline] = useState(null);
  const [loadingCal, setLoadingCal] = useState(true);
  const [expandedSport, setExpandedSport] = useState(null);

  const [weather, setWeather] = useState({ temp: '--', high: '--', low: '--', icon: '☁️', loading: true });
  const [campusAlert, setCampusAlert] = useState({ active: false, title: '', desc: '', loading: true });

  const todayStr = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', month: 'long', day: 'numeric' 
  });

  // Create a reusable "today at midnight" object for our filtering logic
  const todayObj = new Date();
  todayObj.setHours(0,0,0,0);

  const sportsData = [
    {
      id: 1, sport: "Football", arena: "Jordan-Hare Stadium", season: "Fall 2026",
      schedule: [
        { date: "Sep 5", fullDate: "2026-09-05", opponent: "Baylor", location: "Neutral", time: "TBA" },
        { date: "Sep 12", fullDate: "2026-09-12", opponent: "Southern Miss", location: "Home", time: "TBA" },
        { date: "Sep 19", fullDate: "2026-09-19", opponent: "Florida", location: "Home", time: "TBA" },
        { date: "Sep 26", fullDate: "2026-09-26", opponent: "Vanderbilt", location: "Home", time: "TBA" },
        { date: "Oct 3", fullDate: "2026-10-03", opponent: "Tennessee", location: "Away", time: "TBA" },
        { date: "Oct 17", fullDate: "2026-10-17", opponent: "Georgia", location: "Away", time: "TBA" },
        { date: "Oct 24", fullDate: "2026-10-24", opponent: "LSU", location: "Home", time: "TBA" },
        { date: "Oct 31", fullDate: "2026-10-31", opponent: "Ole Miss", location: "Away", time: "TBA" },
        { date: "Nov 7", fullDate: "2026-11-07", opponent: "Arkansas", location: "Home", time: "TBA" },
        { date: "Nov 14", fullDate: "2026-11-14", opponent: "Mississippi State", location: "Away", time: "TBA" },
        { date: "Nov 21", fullDate: "2026-11-21", opponent: "Samford", location: "Home", time: "TBA" },
        { date: "Nov 28", fullDate: "2026-11-28", opponent: "Alabama", location: "Away", time: "TBA" }
      ]
    },
    {
      id: 2, sport: "Men's Basketball", arena: "Neville Arena", season: "Winter 2026-27",
      schedule: [
        { date: "Dec 19", fullDate: "2026-12-19", opponent: "Wisconsin", location: "Neutral", time: "TBA" },
        { date: "Jan 6", fullDate: "2027-01-06", opponent: "South Carolina", location: "Home", time: "TBA" },
        { date: "Jan 9", fullDate: "2027-01-09", opponent: "Vanderbilt", location: "Away", time: "TBA" },
        { date: "Jan 13", fullDate: "2027-01-13", opponent: "Georgia", location: "Home", time: "TBA" },
        { date: "Jan 16", fullDate: "2027-01-16", opponent: "Texas A&M", location: "Home", time: "TBA" },
        { date: "Jan 23", fullDate: "2027-01-23", opponent: "Kentucky", location: "Away", time: "TBA" },
        { date: "Jan 27", fullDate: "2027-01-27", opponent: "Alabama", location: "Away", time: "TBA" },
        { date: "Jan 30", fullDate: "2027-01-30", opponent: "Oklahoma", location: "Home", time: "TBA" },
        { date: "Feb 6", fullDate: "2027-02-06", opponent: "Missouri", location: "Away", time: "TBA" },
        { date: "Feb 13", fullDate: "2027-02-13", opponent: "Vanderbilt", location: "Home", time: "TBA" },
        { date: "Feb 17", fullDate: "2027-02-17", opponent: "Georgia", location: "Away", time: "TBA" },
        { date: "Feb 24", fullDate: "2027-02-24", opponent: "Texas", location: "Away", time: "TBA" },
        { date: "Mar 6", fullDate: "2027-03-06", opponent: "Alabama", location: "Home", time: "TBA" }
      ]
    },
    {
      id: 3, sport: "Baseball", arena: "Plainsman Park", season: "Spring 2026",
      schedule: [
        { date: "Apr 2", fullDate: "2026-04-02", opponent: "Arkansas", location: "Home", time: "6:00 PM" },
        { date: "Apr 10", fullDate: "2026-04-10", opponent: "Kentucky", location: "Home", time: "6:00 PM" },
        { date: "Apr 17", fullDate: "2026-04-17", opponent: "Florida", location: "Away", time: "6:00 PM" },
        { date: "Apr 21", fullDate: "2026-04-21", opponent: "Samford", location: "Neutral", time: "TBA" },
        { date: "Apr 24", fullDate: "2026-04-24", opponent: "Oklahoma", location: "Home", time: "6:00 PM" },
        { date: "Apr 25", fullDate: "2026-04-25", opponent: "Oklahoma", location: "Home", time: "6:00 PM" },
        { date: "Apr 26", fullDate: "2026-04-26", opponent: "Oklahoma", location: "Home", time: "2:00 PM" },
        { date: "May 1", fullDate: "2026-05-01", opponent: "Texas A&M", location: "Away", time: "7:00 PM" },
        { date: "May 2", fullDate: "2026-05-02", opponent: "Texas A&M", location: "Away", time: "2:00 PM" },
        { date: "May 3", fullDate: "2026-05-03", opponent: "Texas A&M", location: "Away", time: "1:00 PM" },
        { date: "May 5", fullDate: "2026-05-05", opponent: "UAB", location: "Away", time: "6:00 PM" },
        { date: "May 7", fullDate: "2026-05-07", opponent: "Mississippi State", location: "Away", time: "7:00 PM" },
        { date: "May 8", fullDate: "2026-05-08", opponent: "Mississippi State", location: "Away", time: "7:30 PM" },
        { date: "May 9", fullDate: "2026-05-09", opponent: "Mississippi State", location: "Away", time: "3:00 PM" },
        { date: "May 12", fullDate: "2026-05-12", opponent: "Jacksonville State", location: "Away", time: "6:00 PM" },
        { date: "May 14", fullDate: "2026-05-14", opponent: "Georgia", location: "Home", time: "7:00 PM" },
        { date: "May 15", fullDate: "2026-05-15", opponent: "Georgia", location: "Home", time: "7:00 PM" },
        { date: "May 16", fullDate: "2026-05-16", opponent: "Georgia", location: "Home", time: "2:00 PM" }
      ]
    }
  ];

  const getNextGame = () => {
    let allGames = [];
    sportsData.forEach(team => {
      team.schedule.forEach(game => {
        allGames.push({ ...game, sportName: team.sport });
      });
    });
    // Use the dynamic todayObj we created above
    const futureGames = allGames.filter(g => new Date(g.fullDate) >= todayObj);
    futureGames.sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));
    return futureGames.length > 0 ? futureGames[0] : null;
  };

  const nextSportingEvent = getNextGame();

  const toggleSport = (id) => {
    setExpandedSport(expandedSport === id ? null : id);
  };

  const getWeatherEmoji = (code) => {
    if (code === 0) return '☀️'; 
    if (code > 0 && code < 4) return '⛅️'; 
    if (code >= 51 && code <= 67) return '🌧️'; 
    if (code >= 71 && code <= 86) return '❄️'; 
    if (code >= 95) return '⛈️'; 
    return '☁️'; 
  };

  useEffect(() => {
    const fetchLiveFeed = async () => {
      try {
        const response = await fetch('https://comp-4710.onrender.com/api/academic-calendar');
        const data = await response.json();
        const rawSections = data.sections || [];
        
        let allFutureEvents = [];
        rawSections.forEach(section => {
          const future = section.events.filter(e => {
            const eDate = new Date(e.date_parse);
            return !isNaN(eDate) && eDate >= todayObj;
          });
          allFutureEvents = [...allFutureEvents, ...future];
        });

        allFutureEvents.sort((a, b) => new Date(a.date_parse) - new Date(b.date_parse));
        if (allFutureEvents.length > 0) setNextDeadline(allFutureEvents[0]);
      } catch (error) {
        console.error("Live Feed Error:", error);
      } finally {
        setLoadingCal(false);
      }
    };

    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=32.6099&longitude=-85.4808&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FChicago&temperature_unit=fahrenheit');
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
          icon: getWeatherEmoji(data.current_weather.weathercode),
          loading: false
        });
      } catch (error) {
        console.error("Weather Error:", error);
        setWeather({ ...weather, loading: false });
      }
    };

    const fetchAlerts = async () => {
      try {
        const res = await fetch('https://api.weather.gov/alerts/active?zone=ALZ043');
        const data = await res.json();
        if (data.features && data.features.length > 0) {
          setCampusAlert({ active: true, title: data.features[0].properties.event, desc: data.features[0].properties.headline || "Check local channels for safety information.", loading: false });
        } else {
          setCampusAlert({ active: false, loading: false });
        }
      } catch (error) {
        console.error("Alert Error:", error);
        setCampusAlert({ active: false, loading: false });
      }
    };

    fetchLiveFeed();
    fetchWeather();
    fetchAlerts();
  }, []);

  if (view === 'student') {
    return (
      <div style={{ width: '100vw', overflowX: 'hidden', margin: 0, padding: 0 }}>
        <StudentHub goBack={() => setView('home')} />
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', backgroundColor: '#f4f4f5', margin: 0, 
      padding: '40px 0', 
      overflowX: 'hidden', overflowY: 'auto' 
    }}>
      
      <div style={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        width: '85%', maxWidth: '380px', gap: '22px' 
      }}>
        
        {/* --- 1. HEADER WITH FULL WEATHER & DATE --- */}
        <div style={{ textAlign: 'center', width: '100%', marginBottom: '5px' }}>
          <h1 style={{ color: '#03244D', fontSize: '2.5rem', margin: '0 0 5px 0', fontWeight: '900', letterSpacing: '-0.5px' }}>Auburn University</h1>
          <p style={{ color: '#DD550C', fontSize: '1.2rem', margin: '0 0 10px 0', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>War Eagle!</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
            <p style={{ color: '#64748b', fontSize: '0.90rem', margin: 0, fontWeight: '500' }}>{todayStr}</p>
            
            <div style={{ 
              backgroundColor: '#e0f2fe', color: '#0369a1', padding: '6px 12px', 
              borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold',
              display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              {weather.loading ? <span>Loading...</span> : (
                <>
                  <span style={{ fontSize: '1.1rem' }}>{weather.icon}</span> 
                  <span>{weather.temp}°F</span>
                  <span style={{ color: '#7dd3fc', margin: '0 2px' }}>|</span>
                  <span style={{ fontSize: '0.75rem', color: '#0284c7' }}>H: {weather.high}° L: {weather.low}°</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* --- 2. DYNAMIC CAMPUS STATUS / ALERT BANNER --- */}
        <div style={{ width: '100%' }}>
          {campusAlert.loading ? (
             <div style={{ padding: '12px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
               Connecting to secure emergency servers...
             </div>
          ) : campusAlert.active ? (
            <div style={{ 
              backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '12px 15px', 
              borderRadius: '0 8px 8px 0', textAlign: 'left', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <h4 style={{ margin: '0 0 4px 0', color: '#b91c1c', fontSize: '0.90rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🚨</span> AU ALERT: {campusAlert.title}
              </h4>
              <p style={{ margin: 0, color: '#991b1b', fontSize: '0.80rem', lineHeight: '1.4' }}>{campusAlert.desc}</p>
            </div>
          ) : (
            <div style={{ 
              backgroundColor: '#f0fdf4', borderLeft: '4px solid #22c55e', padding: '12px 15px', 
              borderRadius: '0 8px 8px 0', textAlign: 'left', boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>✅</span>
              <div>
                <h4 style={{ margin: '0 0 2px 0', color: '#166534', fontSize: '0.85rem' }}>Campus Status: Normal</h4>
                <p style={{ margin: 0, color: '#15803d', fontSize: '0.75rem' }}>No active alerts for Auburn University.</p>
              </div>
            </div>
          )}
        </div>

        {/* --- 3. CAMPUS IMAGE --- */}
        <div style={{ width: '100%' }}>
          <img 
            src="/au_slider.jfif" 
            alt="Auburn University Campus" 
            style={{ 
              width: '100%', 
              height: '180px', 
              objectFit: 'cover', 
              borderRadius: '16px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: 'block'
            }} 
            onError={(e) => {
              e.target.style.display = 'none';
              console.log("Image failed to load. Ensure au_slider.jfif is in the /public folder.");
            }}
          />
        </div>

        {/* --- 4. MAIN BUTTON: STUDENT HUB --- */}
        <button 
          style={{ 
            width: '100%', padding: '20px', fontSize: '1.1rem', backgroundColor: '#03244D',
            color: 'white', borderRadius: '16px', border: 'none', boxShadow: '0 8px 20px rgba(3,36,77,0.2)',
            fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'
          }} 
          onClick={() => setView('student')}
        >
          ENTER STUDENT HUB &rarr;
        </button>

        {/* --- 5. LIVE ACADEMIC FEED --- */}
        <div style={{ width: '100%' }}>
          <p style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'left', marginBottom: '8px', fontWeight: 'bold' }}>
            Live Academic Feed
          </p>
          <div style={{ 
            backgroundColor: 'white', borderLeft: '4px solid #DD550C', padding: '15px', 
            borderRadius: '0 8px 8px 0', textAlign: 'left', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#03244D', fontSize: '0.90rem' }}>
              {loadingCal ? "Syncing with Auburn..." : (nextDeadline ? nextDeadline.title : "No Upcoming Deadlines")}
            </h4>
            <p style={{ margin: 0, color: '#DD550C', fontSize: '0.80rem', fontWeight: 'bold' }}>
              {loadingCal ? "..." : (nextDeadline ? nextDeadline.date_display : "All clear!")}
            </p>
          </div>
        </div>

        {/* --- 6. QUICK CAMPUS TOOLS GRID --- */}
        <div style={{ width: '100%' }}>
          <p style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'left', marginBottom: '8px', fontWeight: 'bold' }}>
            Quick Campus Tools
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <a 
              href="https://auburn.skedda.com/booking" target="_blank" rel="noopener noreferrer"
              style={{ 
                backgroundColor: 'white', padding: '15px 5px', borderRadius: '12px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0',
                textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
              }}
            >
              <span style={{ fontSize: '1.6rem' }}>📚</span>
              <span style={{ color: '#0f172a', fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.2' }}>Book A<br/>Study Room</span>
            </a>
            <a 
              href="https://map.auburn.edu/?id=2121#!ct/75499,84750,84863,86680?s/" target="_blank" rel="noopener noreferrer"
              style={{ 
                backgroundColor: 'white', padding: '15px 5px', borderRadius: '12px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0',
                textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
              }}
            >
              <span style={{ fontSize: '1.6rem' }}>🗺️</span>
              <span style={{ color: '#0f172a', fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.2' }}>Interactive<br/>Map</span>
            </a>
            <a 
              href="https://auburn.etaspot.net/" target="_blank" rel="noopener noreferrer"
              style={{ 
                backgroundColor: 'white', padding: '15px 5px', borderRadius: '12px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0',
                textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
              }}
            >
              <span style={{ fontSize: '1.6rem' }}>🚌</span>
              <span style={{ color: '#0f172a', fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.2' }}>Tiger Transit<br/>Tracker</span>
            </a>
          </div>
        </div>

        {/* --- 7. AUBURN ATHLETICS --- */}
        <div style={{ width: '100%', paddingBottom: '20px' }}>
          <div style={{ borderBottom: '2px solid #e2e8f0', marginBottom: '15px', paddingBottom: '5px' }}>
            <p style={{ color: '#03244D', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'left', margin: 0, fontWeight: 'bold' }}>
              Auburn Athletics
            </p>
          </div>

          {nextSportingEvent && (
            <div style={{ 
              backgroundColor: '#03244D', borderRadius: '12px', padding: '18px', 
              textAlign: 'center', border: '2px solid #DD550C', boxShadow: '0 4px 6px rgba(0,0,0,0.08)',
              marginBottom: '15px'
            }}>
              <p style={{ color: '#DD550C', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 8px 0', fontWeight: 'bold' }}>
                Next Up • {nextSportingEvent.sportName}
              </p>
              <h3 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '1.25rem' }}>
                vs. {nextSportingEvent.opponent}
              </h3>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.85rem' }}>
                {nextSportingEvent.date} • {nextSportingEvent.time} • {nextSportingEvent.location}
              </p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {sportsData.map((team) => {
              // --- THIS IS WHERE THE MAGIC HAPPENS! We filter out past games before mapping ---
              const upcomingGames = team.schedule.filter(game => new Date(game.fullDate) >= todayObj);

              return (
                <div key={team.id} style={{ 
                  backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', 
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' 
                }}>
                  <button 
                    onClick={() => toggleSport(team.id)}
                    style={{ 
                      width: '100%', backgroundColor: expandedSport === team.id ? '#03244D' : 'white', 
                      padding: '16px 15px', border: 'none', display: 'flex', justifyContent: 'space-between', 
                      alignItems: 'center', cursor: 'pointer', transition: 'background-color 0.2s'
                    }}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <h2 style={{ color: expandedSport === team.id ? 'white' : '#03244D', margin: 0, fontSize: '1.05rem' }}>{team.sport}</h2>
                      <p style={{ color: expandedSport === team.id ? '#cbd5e1' : '#64748b', margin: '2px 0 0 0', fontSize: '0.8rem' }}>{team.season}</p>
                    </div>
                    <span style={{ color: expandedSport === team.id ? 'white' : '#DD550C', fontSize: '1.4rem', fontWeight: 'bold' }}>
                      {expandedSport === team.id ? '−' : '+'}
                    </span>
                  </button>

                  {expandedSport === team.id && (
                    <div style={{ padding: '0 15px', backgroundColor: '#f8fafc', borderTop: '2px solid #DD550C' }}>
                      <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', margin: '15px 0 5px 0', textTransform: 'uppercase' }}>
                        📍 {team.arena}
                      </p>
                      
                      {upcomingGames.length > 0 ? (
                        upcomingGames.map((game, index) => (
                          <div key={index} style={{ 
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                            padding: '12px 0', borderBottom: index !== upcomingGames.length - 1 ? '1px solid #e2e8f0' : 'none' 
                          }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '0.9rem' }}>vs. {game.opponent}</span>
                              <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{game.date} • {game.time}</span>
                            </div>
                            <span style={{ 
                              backgroundColor: game.location === 'Home' ? '#ffedd5' : '#e2e8f0', 
                              color: game.location === 'Home' ? '#DD550C' : '#475569',
                              padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold'
                            }}>
                              {game.location}
                            </span>
                          </div>
                        ))
                      ) : (
                        // Shows this cleanly if all games are in the past!
                        <div style={{ padding: '15px 0', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                          Season Completed
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;