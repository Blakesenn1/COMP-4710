const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Auburn University's official RateMyProfessor GraphQL ID
const AUBURN_SCHOOL_ID = "U2Nob29sLTQ0";

app.get('/api/rmp', async (req, res) => {
  const professorName = req.query.name;
  
  if (!professorName) {
    return res.status(400).json({ error: "Please provide a professor name." });
  }

  console.log(`[SCRAPER] Searching specifically inside Auburn University for: ${professorName}...`);

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
              teachers(query: {text: $text, schoolID: $schoolID}) {
                edges {
                  node {
                    id
                    firstName
                    lastName
                    department
                    avgRating
                    avgDifficulty
                    numRatings
                    school {
                      name
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          text: professorName,
          schoolID: AUBURN_SCHOOL_ID
        }
      })
    });

    const data = await response.json();
    
    if (!data.data || !data.data.newSearch) {
       console.log("[SCRAPER] Unexpected API response format.");
       return res.json([]);
    }

    const auburnTeachers = data.data.newSearch.teachers.edges.map(edge => edge.node);
    
    console.log(`[SCRAPER] Found ${auburnTeachers.length} matches at Auburn.`);
    
    res.json(auburnTeachers);

  } catch (error) {
    console.error("[SCRAPER] Error:", error);
    res.status(500).json({ error: "Failed to fetch data from Rate My Professor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auburn App Backend running on port ${PORT}`);
});