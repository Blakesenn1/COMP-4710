const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// YOU NAILED IT: Auburn University's official RMP ID (School 60)
// In Base64 encoding for the GraphQL API, "School-60" is "U2Nob29sLTYw"
const AUBURN_SCHOOL_ID = "U2Nob29sLTYw";

app.get('/api/rmp', async (req, res) => {
  const rawSearchTerm = req.query.name;
  
  if (!rawSearchTerm) {
    return res.status(400).json({ error: "Please provide a search term." });
  }

  // 1. AVOID RMP'S TWO-WORD BUG
  // We grab the last word (e.g., "kwon" from "hugh kwon") to cast a wide net
  const nameParts = rawSearchTerm.trim().split(/\s+/);
  const safeQuery = nameParts[nameParts.length - 1]; 

  try {
    const response = await fetch('https://www.ratemyprofessors.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic dGVzdDp0ZXN0' 
      },
      body: JSON.stringify({
        query: `
          query ($text: String!, $schoolID: ID!) {
            newSearch {
              teachers(query: {text: $text, schoolID: $schoolID}, first: 100) {
                edges {
                  node {
                    firstName
                    lastName
                    department
                    avgRating
                    avgDifficulty
                    numRatings
                  }
                }
              }
            }
          }
        `,
        variables: { 
          text: safeQuery,
          schoolID: AUBURN_SCHOOL_ID // Locked securely to the REAL Auburn University!
        }
      })
    });

    const data = await response.json();
    if (data.errors) return res.status(500).json({ error: "RMP rejected the query." });

    const rawTeachers = data.data?.newSearch?.teachers?.edges?.map(edge => edge.node) || [];
    
    // 2. THE STRICT MATCH FILTER
    // We strictly filter the exact Auburn results to perfectly match what you typed
    const searchTermsLower = nameParts.map(t => t.toLowerCase());
    
    const exactMatches = rawTeachers.filter(prof => {
        const fName = prof.firstName || "";
        const lName = prof.lastName || "";
        const fullName = `${fName} ${lName}`.toLowerCase();
        
        // Every word you typed must exist in the professor's name
        return searchTermsLower.every(term => fullName.includes(term));
    });

    res.json(exactMatches);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auburn App Backend running on port ${PORT}`);
});