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

  // THE FIX: Seamlessly append "Auburn" to force the database to prioritize our professors
  const searchQuery = `${professorName} Auburn`;

  console.log(`[SCRAPER] Searching globally for: "${searchQuery}"...`);

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
              teachers(query: {text: $text}, first: 50) {
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
          text: searchQuery // Sending the targeted query
        }
      })
    });

    const data = await response.json();
    
    if (data.errors) {
        console.error("[SCRAPER] GraphQL Error:", data.errors);
        return res.status(500).json({ error: "RMP rejected the query." });
    }

    const teachers = data.data?.newSearch?.teachers?.edges?.map(edge => edge.node) || [];
    
    // Safety check to ensure we only send Auburn staff to the frontend
    const auburnTeachers = teachers.filter(teacher => 
      teacher.school && teacher.school.name.includes('Auburn')
    );
    
    console.log(`[SCRAPER] Found ${auburnTeachers.length} Auburn matches for "${searchQuery}".`);
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