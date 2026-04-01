const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const Parser = require('rss-parser');
const fetch = require('node-fetch'); 
const cheerio = require('cheerio'); // Added for scraping

const app = express();
const parser = new Parser();

app.use(cors());
app.use(express.json());

const AUBURN_SCHOOL_ID = "U2Nob29sLTYw";

// 1. RATE MY PROFESSOR
app.get('/api/rmp', async (req, res) => {
  const rawSearchTerm = req.query.name;
  if (!rawSearchTerm) return res.status(400).json({ error: "No name" });
  const nameParts = rawSearchTerm.trim().split(/\s+/);
  const safeQuery = nameParts[nameParts.length - 1]; 
  try {
    const response = await fetch('https://www.ratemyprofessors.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic dGVzdDp0ZXN0' },
      body: JSON.stringify({
        query: `query ($text: String!, $schoolID: ID!) { newSearch { teachers(query: {text: $text, schoolID: $schoolID}, first: 100) { edges { node { firstName lastName department avgRating avgDifficulty numRatings } } } } }`,
        variables: { text: safeQuery, schoolID: AUBURN_SCHOOL_ID }
      })
    });
    const data = await response.json();
    const rawTeachers = data.data?.newSearch?.teachers?.edges?.map(edge => edge.node) || [];
    const searchTermsLower = nameParts.map(t => t.toLowerCase());
    const exactMatches = rawTeachers.filter(prof => {
        const fullName = `${prof.firstName || ""} ${prof.lastName || ""}`.toLowerCase();
        return searchTermsLower.every(term => fullName.includes(term));
    });
    res.json(exactMatches);
  } catch (error) { res.status(500).json({ error: "RMP error" }); }
});

// 2. CANVAS ROUTES
app.get('/api/canvas/courses', async (req, res) => {
  const authHeader = req.headers.authorization;
  try {
    const response = await fetch('https://auburn.instructure.com/api/v1/courses?enrollment_state=active&include[]=total_scores', { headers: { 'Authorization': authHeader } });
    const data = await response.json();
    res.json(Array.isArray(data) ? data.filter(c => c.course_code) : []);
  } catch (e) { res.status(500).json([]); }
});

app.get('/api/canvas/courses/:courseId/assignments', async (req, res) => {
  const authHeader = req.headers.authorization;
  try {
    const response = await fetch(`https://auburn.instructure.com/api/v1/courses/${req.params.courseId}/assignments?bucket=upcoming&order_by=due_at`, { headers: { 'Authorization': authHeader } });
    res.json(await response.json());
  } catch (e) { res.status(500).json([]); }
});

app.get('/api/canvas/user', async (req, res) => {
  const authHeader = req.headers.authorization;
  try {
    const response = await fetch('https://auburn.instructure.com/api/v1/users/self', { headers: { 'Authorization': authHeader } });
    const data = await response.json();
    res.json({ name: data.short_name || data.name });
  } catch (e) { res.status(500).json({ name: "User" }); }
});

// 3. AUTOMATED ACADEMIC CALENDAR (SCRAPER)
app.get('/api/academic-calendar', async (req, res) => {
  try {
    const response = await fetch('https://www.auburn.edu/about/academic-calendar/');
    const html = await response.text();
    const $ = cheerio.load(html);
    const scrapedEvents = [];

    // Auburn's calendar uses tables. We loop through every row (tr)
    $('table tr').each((i, el) => {
      const cells = $(el).find('td');
      if (cells.length >= 2) {
        const dateRaw = $(cells[0]).text().trim();
        const titleRaw = $(cells[1]).text().trim();

        // Basic validation to ensure we're getting real data
        if (dateRaw && titleRaw && !dateRaw.includes("Date")) {
          scrapedEvents.push({
            event: {
              id: `deadline-${i}`,
              title: titleRaw,
              first_date: dateRaw // Note: Dates like "Jan 7" will be parsed by the frontend
            }
          });
        }
      }
    });

    res.json({ events: scrapedEvents });
  } catch (error) {
    console.error("Scraper Error:", error);
    res.status(500).json({ events: [] });
  }
});

// 4. CAMPUS CALENDAR (PAGINATED)
app.get('/api/campus-calendar', async (req, res) => {
  try {
    const allEvents = [];
    const pagesToFetch = 3;

    for (let page = 1; page <= pagesToFetch; page++) {
      const response = await fetch(`https://calendar.auburn.edu/api/2/events?days=90&pp=100&page=${page}`);
      const data = await response.json();
      
      if (data.events && data.events.length > 0) {
        allEvents.push(...data.events);
      } else {
        break; 
      }
    }

    res.json({ events: allEvents });
  } catch (error) {
    console.error("Campus Proxy Error:", error);
    res.status(500).json({ events: [] });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));