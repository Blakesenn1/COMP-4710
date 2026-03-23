const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/rmp', async (req, res) => {
  const professorName = req.query.name;
  
  if (!professorName) {
    return res.status(400).json({ error: "Please provide a professor name." });
  }

  console.log(`[SCRAPER] Searching specifically inside Auburn (School 44) for: "${professorName}"...`);

  try {
    const response = await fetch('https://www.ratemyprofessors.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic dGVzdDp0ZXN0' 
      },
      body: JSON.stringify({
        query: `
          query ($text: String!) {
            newSearch {
              teachers(query: {text: $text, schoolID: "U2Nob29sLTQ0"}, first: 100) {
                edges {
                  node {
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
          // Send exactly what the user typed, no "Auburn" keyword hacks!
          text: professorName.trim() 
        }
      })
    });

    const data = await response.json();
    
    if (data.errors) {
        console.error("[SCRAPER] GraphQL Error:", data.errors);
        return res.status(500).json({ error: "RMP rejected the query." });
    }

    // Safely extract the array of teachers straight from the database
    const teachers = data.data?.newSearch?.teachers?.edges?.map(edge => edge.node) || [];
    
    console.log(`[SCRAPER] Found ${teachers.length} matches inside Auburn University.`);
    
    // Send them directly to the app! No strict .filter() that might accidentally drop Hugh Kwon.
    res.json(teachers);

  } catch (error) {
    console.error("[SCRAPER] Error:", error);
    res.status(500).json({ error: "Failed to fetch data from Rate My Professor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auburn App Backend running on port ${PORT}`);
});