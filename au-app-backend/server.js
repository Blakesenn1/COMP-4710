const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/rmp', async (req, res) => {
  // The React frontend is now sending just the last word (e.g., "dozier")
  const queryWord = req.query.name;
  
  if (!queryWord) {
    return res.status(400).json({ error: "Please provide a search term." });
  }

  console.log(`[SCRAPER] Received query: "${queryWord}". Searching globally...`);

  try {
    const response = await fetch('https://www.ratemyprofessors.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic dGVzdDp0ZXN0' 
      },
      body: JSON.stringify({
        // NO fake School ID. Just a wide-net global search.
        query: `
          query ($text: String!) {
            newSearch {
              teachers(query: {text: $text}, first: 100) {
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
        variables: { text: queryWord }
      })
    });

    const data = await response.json();
    
    if (data.errors) {
        return res.status(500).json({ error: "RMP rejected the query." });
    }

    const teachers = data.data?.newSearch?.teachers?.edges?.map(edge => edge.node) || [];
    
    // The ONLY backend filter we need: Make sure they actually teach at Auburn
    const auburnTeachers = teachers.filter(teacher => 
      teacher.school && teacher.school.name.includes('Auburn')
    );

    console.log(`[SCRAPER] Returning ${auburnTeachers.length} Auburn matches for "${queryWord}".`);
    res.json(auburnTeachers);

  } catch (error) {
    console.error("[SCRAPER] Error:", error);
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auburn App Backend running on port ${PORT}`);
});