const express = require('express');
const cors = require('cors');
const cheerio = require('cheerio');

const app = express();
app.use(cors());
app.use(express.json());

const AUBURN_SCHOOL_ID = "U2Nob29sLTYw";

// ==========================================
// 1. RATE MY PROFESSOR ROUTE (Intact)
// ==========================================
app.get('/api/rmp', async (req, res) => {
  const rawSearchTerm = req.query.name;
  if (!rawSearchTerm) return res.status(400).json({ error: "Please provide a search term." });

  const nameParts = rawSearchTerm.trim().split(/\s+/);
  const safeQuery = nameParts[nameParts.length - 1]; 

  try {
    const response = await fetch('https://www.ratemyprofessors.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic dGVzdDp0ZXN0' },
      body: JSON.stringify({
        query: `
          query ($text: String!, $schoolID: ID!) {
            newSearch {
              teachers(query: {text: $text, schoolID: $schoolID}, first: 100) {
                edges { node { firstName lastName department avgRating avgDifficulty numRatings } }
              }
            }
          }
        `,
        variables: { text: safeQuery, schoolID: AUBURN_SCHOOL_ID }
      })
    });

    const data = await response.json();
    if (data.errors) return res.status(500).json({ error: "RMP rejected the query." });

    const rawTeachers = data.data?.newSearch?.teachers?.edges?.map(edge => edge.node) || [];
    const searchTermsLower = nameParts.map(t => t.toLowerCase());
    
    const exactMatches = rawTeachers.filter(prof => {
        const fullName = `${prof.firstName || ""} ${prof.lastName || ""}`.toLowerCase();
        return searchTermsLower.every(term => fullName.includes(term));
    });

    res.json(exactMatches);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

// ==========================================
// 2. CANVAS: LIVE COURSES ROUTE
// ==========================================
app.get('/api/canvas/courses', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No Canvas token provided." });

  try {
    const canvasUrl = 'https://auburn.instructure.com/api/v1/courses?enrollment_state=active&include[]=total_scores';
    const response = await fetch(canvasUrl, {
      method: 'GET',
      headers: { 'Authorization': authHeader, 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error("Canvas API rejected the token.");
    const data = await response.json();
    const activeCourses = data.filter(course => course.enrollments && course.enrollments.length > 0 && course.course_code);
    res.json(activeCourses);
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to Canvas." });
  }
});

// ==========================================
// 3. NEW: CANVAS: UPCOMING ASSIGNMENTS ROUTE
// ==========================================
app.get('/api/canvas/courses/:courseId/assignments', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No Canvas token provided." });

  try {
    const { courseId } = req.params;
    // We specifically ask Canvas for "upcoming" assignments, sorted by due date
    const canvasUrl = `https://auburn.instructure.com/api/v1/courses/${courseId}/assignments?bucket=upcoming&order_by=due_at`;
    
    const response = await fetch(canvasUrl, {
      method: 'GET',
      headers: { 'Authorization': authHeader, 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error("Failed to fetch assignments.");
    const assignments = await response.json();
    
    res.json(assignments);
  } catch (error) {
    console.error("[CANVAS] Assignments Error:", error);
    res.status(500).json({ error: "Failed to fetch assignments." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auburn App Backend running on port ${PORT}`);
});

// ==========================================
// 4. NEW: CANVAS: USER PROFILE ROUTE
// ==========================================
app.get('/api/canvas/user', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No Canvas token provided." });

  try {
    const canvasUrl = 'https://auburn.instructure.com/api/v1/users/self';
    const response = await fetch(canvasUrl, {
      method: 'GET',
      headers: { 'Authorization': authHeader, 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error("Failed to fetch user.");
    const user = await response.json();
    
    // Canvas usually provides 'short_name' (e.g., "Blake Senn" instead of "Senn, Adam Blake")
    res.json({ name: user.short_name || user.name }); 
  } catch (error) {
    console.error("[CANVAS] User Error:", error);
    res.status(500).json({ error: "Failed to fetch user profile." });
  }
});
// ==========================================
// 5. NEW: CAREER RADAR URL SCRAPER
// ==========================================
app.post('/api/scrape-job', async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "No URL provided." });

  try {
    // Fetch the raw HTML of the job posting
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) throw new Error("Could not fetch the URL.");

    const html = await response.text();
    const $ = cheerio.load(html);

    // Grab the page title or OpenGraph title
    let pageTitle = $('meta[property="og:title"]').attr('content') || $('title').text() || "Unknown Job";

    // Smart Splitter: Most titles are "Job Title - Company" or "Company | Job Title"
    let jobTitle = pageTitle;
    let company = "Unknown Company";

    if (pageTitle.includes('-')) {
      const parts = pageTitle.split('-');
      jobTitle = parts[0].trim();
      company = parts[parts.length - 1].trim();
    } else if (pageTitle.includes('|')) {
      const parts = pageTitle.split('|');
      jobTitle = parts[0].trim();
      company = parts[parts.length - 1].trim();
    }

    res.json({ title: jobTitle, company: company, originalTitle: pageTitle });

  } catch (error) {
    console.error("[SCRAPER] Error:", error.message);
    // If the site blocks us, we send a generic response so the app doesn't crash
    res.json({ title: "Manual Entry Required", company: "Could not auto-scrape site" });
  }
});