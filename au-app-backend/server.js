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

  // 1. THE WIDE NET: Grab the LAST word the user typed to cast a wide net in the database
  const nameParts = professorName.trim().split(' ');
  const rmpSearchQuery = nameParts[nameParts.length - 1]; 

  console.log(`[SCRAPER] User typed "${professorName}". Asking RMP for "${rmpSearchQuery}"...`);

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
                  }
                }
              }
            }
          }
        `,
        variables: {
          text: rmpSearchQuery 
        }
      })
    });

    const data = await response.json();
    const teachers = data.data?.newSearch?.teachers?.edges?.map(edge => edge.node) || [];
    
    // 2. THE STRICT FILTER: Destroy RMP's "Fallback" garbage.
    // We force the results to actually match the exact letters the user typed.
    const searchTerms = professorName.toLowerCase().trim().split(' ');

    const filteredTeachers = teachers.filter(teacher => {
      const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
      // Ensure EVERY word the user typed exists in the professor's name
      // If they type "dozi", "Elizabeth Devore" will fail this test and get deleted.
      return searchTerms.every(term => fullName.includes(term));
    });

    console.log(`[SCRAPER] RMP returned ${teachers.length} raw results. Strict filter narrowed it down to ${filteredTeachers.length} actual matches.`);
    
    res.json(filteredTeachers);

  } catch (error) {
    console.error("[SCRAPER] Error:", error);
    res.status(500).json({ error: "Failed to fetch data from Rate My Professor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auburn App Backend running on port ${PORT}`);
});